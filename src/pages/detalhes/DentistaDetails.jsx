import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";
import { useDetailsApi } from "../../components/ApiHooks";
import "../../styles/Details.css";
import { FormDentist } from "../../components/Form/FormDentist";
import { Caption, TableRow, DentistServiceList } from "../../components/Table";
import { formatCpf, formatTelefone } from "../../utils";

const Info = ({ data }) => {
    const { setEdit } = useContext(EditContext);

    const { nome, sobrenome, cpf, telefone, local } = data.dentista;
    const key = {
        Nome: nome,
        CPF: formatCpf(cpf),
        Telefone: formatTelefone(telefone),
        Franquia: local.nome,
        Endereço: local.endereço,
    };

    return (
        <div className="info">
            {Object.keys(key).map((k, index) => {
                return (
                    <p key={index + k}>
                        <strong>{k}:</strong>
                        {key[k]}
                    </p>
                );
            })}

            <button className="edit" onClick={() => setEdit((e) => !e)}>
                Editar
            </button>

            {/* <FormDentist initialState={initialState} /> */}
        </div>
    );
};

export function TableDentistService({ data }) {
    const row = ["Dentista", "Paciente", "Produto", "Entregado"];
    return (
        <div className="serviço">
            <table className="todos-table">
                <Caption txt={"Serviços Registrados"} />

                <tbody>
                    <TableRow rowNames={row} />
                    {data.serviços ? <DentistServiceList data={data} /> : ""}
                </tbody>
            </table>
        </div>
    );
}
TableDentistService.propTypes = {
    data: PropTypes.object,
};

export const EditContext = createContext({
    setEdit: () => {},
    setUpdate: () => {},
});

export function DentistaDetails() {
    const dbId = localStorage.getItem("dentistaID");
    const { data, setUpdate } = useDetailsApi("dentista", dbId);
    const [edit, setEdit] = useState(true);

    if (!data) {
        return <div className="loading">Carregando...</div>;
    }
    // console.log(data);
    const initialState = () => {
        const { nome, sobrenome, cpf, telefone, local } = data.dentista;
        return {
            nome,
            sobrenome,
            cpf: formatCpf(cpf),
            telefone,
            local: local._id,
            category: "dentista",
            formType: "edit",
            dbId: data.dentista._id,
        };
    };
    // Format the data receive in details at the hook api
    //
    return (
        <>
            <EditContext.Provider value={{ setEdit, setUpdate }}>
                {edit ? (
                    <Info data={data} />
                ) : (
                    <FormDentist initialState={initialState()} />
                )}
                <TableDentistService data={data} />
            </EditContext.Provider>
        </>
    );
}
