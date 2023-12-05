import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";
import { useGetServiceBy } from "./ApiHooks";
import "../styles/Details.css";
import { FormDentist } from "./Form/FormDentist";
import { Caption, NavSortTable, TableRow } from "./Table";
import { formatTelefone, stateDetails } from "../utils";
import { FormLocal } from "./Form/FormLocal";
import { FormService } from "./Form/FormService";
import { DentistTableBody } from "./TableBody";
import { mdiPencil } from "@mdi/js";
import { TableService } from "../pages/Todos";
import Icon from "@mdi/react";
import { FormExport } from "./Form/FormExport";
const Info = ({ content }) => {
    const { setEdit } = useContext(EditContext);
    // console.log(content);

    const divBtnContainer = {
        display: "flex",
        justifyContent: "flex-end",
    };
    return (
        <div className="info">
            <div style={divBtnContainer}>
                <Icon
                    onClick={() => setEdit((e) => !e)}
                    path={mdiPencil}
                    title="Pencil-edit"
                    className="pencil-edit"
                />
            </div>
            {Object.keys(content).map((k, index) => {
                if (k === "Telefone") {
                    content[k] = formatTelefone(content[k]);
                }

                return (
                    <p key={index + k}>
                        <strong>{k}: </strong>
                        {content[k]}
                    </p>
                );
            })}
        </div>
    );
};
export const PopUpEditContext = createContext({
    setShowForm: () => {},
    setForm: () => {},
    setUpdateServices: () => {},
});

LocalDentistWorkers.propTypes = {
    data: PropTypes.object,
};
//Table with  "dentista" that work at detailed page of a "local" place
function LocalDentistWorkers({ data, setUpdateServices }) {
    const row = ["Nome", "Telefone", "Endereço"];
    const serviços = useGetServiceBy(data.local._id, "local");
    // const serviceRow = ["Dentista", "Paciente", "Produto", "Finalizado"];
    // const [sortDate, setSortDate] = useState();
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
        <>
            <div>
                <table className="todos-table">
                    <Caption txt={"Dentistas"} />

                    <tbody>
                        <TableRow rowNames={row} />
                        <DentistTableBody data={data.dentistas} />
                    </tbody>
                </table>
            </div>
            <div>
                {serviços ? (
                    <TableService
                        providedData={{ serviços }}
                        setUpdateTable={setUpdateServices}
                    />
                ) : (
                    ""
                )}
            </div>
        </>
    );
}
export const EditContext = createContext({
    setEdit: () => {},
    setUpdate: () => {},
    setExport: () => {},
});
// Link to other Details is getting confused with the previous used Details
// separate then each getting using they own Details and see if works
export function Details({ type, data, setUpdate }) {
    const [edit, setEdit] = useState(false);
    const [exportPop, setExport] = useState(false);
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
            dentista: (
                <TableService
                    providedData={data}
                    setUpdateTable={setUpdate}
                    isDetails={true}
                />
            ),
            local: (
                <LocalDentistWorkers
                    data={data}
                    setUpdateServices={setUpdate}
                />
            ),
            servico: "",
        };
        return obj[type];
    };

    return (
        <>
            <EditContext.Provider value={{ setEdit, setUpdate, setExport }}>
                <Info content={infoContent} />
                <Table />
                {edit ? <Form /> : ""}
                {exportPop ? <FormExport /> : ""}
            </EditContext.Provider>
        </>
    );
}
