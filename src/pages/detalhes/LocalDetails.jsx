import PropTypes from "prop-types";
import { createContext, useState } from "react";
import { useDetailsApi } from "../../components/ApiHooks";
import "../../styles/Details.css";
import { FormDentist } from "../../components/Form/FormDentist";
import { formatTelefone } from "../../utils";
// import { TableService } from "../../components/Tables";

const Info = ({ data, setEdit }) => {
    const { nome, endereço, cep, telefone, tipo_tabela } = data.local;

    return (
        <div className="info">
            <p className="nome-sobrenome">
                <strong>Nome:</strong> {nome}
            </p>
            <p>
                <strong>Telefone:</strong> {formatTelefone(telefone)}
            </p>
            <p className="endereço">
                <strong>Endereço:</strong> {endereço}
            </p>
            <p className="endereço">
                <strong>CEP:</strong> {cep}
            </p>
            <p>
                <strong>Tabela:</strong> {tipo_tabela}
            </p>

            <button className="edit" onClick={() => setEdit((e) => !e)}>
                Editar
            </button>

            {/* <FormDentist initialState={initialState} /> */}
        </div>
    );
};
Info.propTypes = {
    data: PropTypes.object,
    setEdit: PropTypes.func,
};
// TableService.propTypes = {
//     data: PropTypes.object,
// };
export const EditContext = createContext({
    setEdit: () => {},
});

export function LocalDetails() {
    const dbId = localStorage.getItem("localID");
    const data = useDetailsApi("local", dbId);
    const [edit, setEdit] = useState(true);

    if (!data) {
        return <div className="loading">Carregando...</div>;
    }
    console.log(data);
    const initialState = () => {
        // nome, endereço, cep, telefone,
        const { nome, endereço, cep, telefone } = data.local;
        return {
            nome,
            cep,
            endereço,
            telefone,
            category: "local",
            formType: "edit",
            dbId: data.local._id,
        };
    };
    return (
        <>
            <EditContext.Provider value={{ setEdit }}>
                {edit ? (
                    <Info data={data} setEdit={setEdit} />
                ) : (
                    <FormDentist initialState={initialState()} />
                )}
                {/* <TableService data={data} /> */}
            </EditContext.Provider>
        </>
    );
}
