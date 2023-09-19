import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import { useDetailsApi } from "./ApiHooks";
import "../styles/Details.css";
import { FormDentist } from "./Form/FormDentist";
import { Caption, TableRow } from "./Table";
import { stateDetails } from "../utils";
import { FormLocal } from "./Form/FormLocal";
import { FormService } from "./Form/FormService";
import {
    DentistTableBody,
    LocalTableBody,
    ServiceTableBody,
} from "./TableBody";

export const EditContext = createContext({
    setEdit: () => {},
    setUpdate: () => {},
});

const Info = ({ content }) => {
    const { setEdit } = useContext(EditContext);
    // console.log(content);
    return (
        <div className="info">
            {Object.keys(content).map((k, index) => {
                return (
                    <p key={index + k}>
                        <strong>{k}: </strong>
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
    // console.log(data);
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
    //
    data.dentistas.forEach((key) => {
        key.local = data.local;
        // console.log(key);
    });

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

// Link to other Details is getting confused with the previous used Details
// separate then each getting using they own Details and see if works
export function Details({ type, data, setUpdate }) {
    const [edit, setEdit] = useState(true);
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
            servico: "",
        };
        return obj[type];
    };

    // console.log(data);

    // Format the data receive in details at the hook api
    //
    return (
        <>
            <EditContext.Provider value={{ setEdit, setUpdate }}>
                <Info content={infoContent} />
                {edit ? "" : <Form />}
                <Table />
            </EditContext.Provider>
        </>
    );
}
