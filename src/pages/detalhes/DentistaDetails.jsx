import PropTypes from "prop-types";
import { createContext, useState } from "react";
import { useDetailsApi } from "../../components/ApiHooks";
import "../../styles/Details.css";
import { FormDentist } from "../../components/Form/FormDentist";
import { Caption, TableRow, DentistServiceList } from "../../components/Table";
import { formatCpf, formatTelefone } from "../../utils";

const IdentidadeInfo = ({ data, setEdit }) => {
    const { nome, sobrenome, cpf, telefone, local } = data.dentista;

    return (
        <div className="info">
            <p className="nome-sobrenome">
                <strong>Nome:</strong> {nome} {sobrenome}
            </p>
            <p>
                <strong>CPF:</strong> {formatCpf(cpf)}
            </p>
            <p>
                <strong>Telefone:</strong> {formatTelefone(telefone)}
            </p>
            <p className="endereço">
                <strong>Franquia:</strong> {local.nome}
            </p>
            <p className="endereço">
                <strong>Endereço:</strong> {local.endereço}
            </p>
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
                    {/* need to fix the not render of product name */}
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
});

export function DentistaDetails() {
    const dbId = localStorage.getItem("dentistaID");
    const data = useDetailsApi("dentista", dbId);
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
            <EditContext.Provider value={{ setEdit }}>
                {edit ? (
                    <IdentidadeInfo data={data} setEdit={setEdit} />
                ) : (
                    <FormDentist initialState={initialState()} />
                )}
                <TableDentistService data={data} />
            </EditContext.Provider>
        </>
    );
}
