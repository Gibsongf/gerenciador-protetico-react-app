import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";
import { useDetailsApi } from "../components/ApiHooks";
import "../styles/Details.css";
import { FormDentist } from "../components/Form/FormDentist";
import { Caption, TableRow } from "../components/Table";
import { stateDetails } from "../utils";
import { FormLocal } from "../components/Form/FormLocal";
import { FormService } from "../components/Form/FormService";
import {
    DentistTableBody,
    LocalTableBody,
    ServiceTableBody,
} from "../components/TableBody";

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

export function DentistServices({ data }) {
    const row = ["Dentista", "Paciente", "Produto", "Entregado"];
    console.log(data);
    return (
        <div className="serviço">
            <table className="todos-table">
                <Caption txt={"Serviços Deste Dentista"} />

                <tbody>
                    <TableRow rowNames={row} />
                    {data.serviços ? (
                        <ServiceTableBody data={data.serviços} />
                    ) : (
                        ""
                    )}
                </tbody>
            </table>
        </div>
    );
}
DentistServices.propTypes = {
    data: PropTypes.object,
};

//Table with  "dentista" that work at detailed page of a "local" place
function LocalDentistWorkers({ data }) {
    const row = ["Nome", "Telefone", "Endereço"];
    // console.log(data);
    if (!data) {
        // Data is still being fetched
        return <div>Loading...</div>;
    }

    return (
        <table className="todos-table">
            <Caption txt={"Dentistas Neste Local"} />

            <tbody>
                <TableRow rowNames={row} />
                <DentistTableBody data={data.dentistas} />
            </tbody>
        </table>
    );
}

export function Details({ type }) {
    const dbId = localStorage.getItem(type + "ID");
    const { data, setUpdate } = useDetailsApi(type, dbId);
    const [edit, setEdit] = useState(true);
    if (!data) {
        return <div className="loading">Carregando...</div>;
    }

    const { formState, infoContent } = stateDetails(data, type);
    const Form = () => {
        const obj = {
            dentista: <FormDentist initialState={formState} />,
            local: <FormLocal initialState={formState} />,
            servico: <FormService initialState={formState} />,
        };
        return obj[type];
    };
    const Table = () => {
        const obj = {
            dentista: <DentistServices data={data} />,
            local: <LocalDentistWorkers data={data} />,
            servico: <FormService initialState={formState} />,
        };
        return obj[type];
    };
    // console.log(data);

    // Format the data receive in details at the hook api
    //
    return (
        <>
            <EditContext.Provider value={{ setEdit, setUpdate }}>
                {edit ? <Info data={data} content={infoContent} /> : Form()}
                {Table()}
            </EditContext.Provider>
        </>
    );
}
