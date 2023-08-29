import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";
import { useDetailsApi } from "../../components/ApiHooks";
import "../../styles/Details.css";
import { FormDentist } from "../../components/Form/FormDentist";
import { Caption, TableRow, DentistServiceList } from "../../components/Table";
import { formatCpf, formatTelefone } from "../../utils";
import { FormLocal } from "../../components/Form/FormLocal";
import { FormService } from "../../components/Form/FormService";

export const EditContext = createContext({
    setEdit: () => {},
    setUpdate: () => {},
});
const Info = ({ data, content }) => {
    const { setEdit } = useContext(EditContext);

    return (
        <div className="info">
            {Object.keys(content).map((k, index) => {
                return (
                    <p key={index + k}>
                        <strong>{k}:</strong>
                        {content[k]}
                    </p>
                );
            })}

            <button className="edit" onClick={() => setEdit((e) => !e)}>
                Editar
            </button>
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
const fullName = (nome, sobrenome) => {
    if (!sobrenome) {
        return nome;
    } else {
        return `${nome} ${sobrenome}`;
    }
};
const stateDetails = (data, type) => {
    const local = () => {
        // nome, endereço, cep, telefone,
        const { nome, endereço, cep, telefone } = data.local;
        const infoContent = {
            Nome: nome,
            Endereço: endereço,
            CEP: cep,
            Telefone: telefone,
            "Tipo de Tabela": data.local.tipo_tabela,
        };

        const formState = {
            nome,
            cep,
            endereço,
            telefone,
            category: "local",
            formType: "edit",
            dbId: data.local._id,
        };
        return { infoContent, formState };
    };
    const dentista = () => {
        const { nome, sobrenome, cpf, telefone, local } = data.dentista;
        const infoContent = {
            Nome: fullName(nome, sobrenome),
            CPF: formatCpf(cpf),
            Telefone: formatTelefone(telefone),
            Franquia: local.nome,
            Endereço: local.endereço,
        };
        const formState = {
            nome,
            sobrenome,
            cpf: formatCpf(cpf),
            telefone,
            local: local._id,
            category: "dentista",
            formType: "edit",
            dbId: data.dentista._id,
        };
        return { infoContent, formState };
    };

    const serviço = () => {
        const { statusEntrega } = data.serviço;
        const { nome, sobrenome, _id } = data.dentista;
        const infoContent = {
            Paciente: data.paciente,
            Dentista_nome: fullName(nome, sobrenome),
            produtos: data.produto,
            Entregado: statusEntrega,
        };
        const formState = {
            paciente_nome: data.paciente,
            dentista_nome: _id,
            produtos: data.produto,
            statusEntrega,
            category: "servico",
            formType: "edit",
            dbId: data.serviço._id,
        };
        return { infoContent, formState };
    };
    const obj = {
        serviço,
        local,
        dentista,
    };
    return obj[type]();
};
export function Details({ type }) {
    const dbId = localStorage.getItem(type + "ID");
    const { data, setUpdate } = useDetailsApi(type, dbId);
    const [edit, setEdit] = useState(true);
    if (!data) {
        return <div className="loading">Carregando...</div>;
    }

    const { formState, infoContent } = stateDetails(data, type);
    const Form = () => {
        if (type === "dentista") {
            return <FormDentist initialState={formState} />;
        }
        if (type === "local") {
            return <FormLocal initialState={formState} />;
        }
        if (type === "servico") {
            return <FormService initialState={formState} />;
        }
    };
    // console.log(data);

    // Format the data receive in details at the hook api
    //
    return (
        <>
            <EditContext.Provider value={{ setEdit, setUpdate }}>
                {edit ? <Info data={data} content={infoContent} /> : Form()}
                {/* <TableDentistService data={data} /> */}
            </EditContext.Provider>
        </>
    );
}
