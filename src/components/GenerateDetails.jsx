import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";
import { useGetServiceBy } from "./ApiHooks";
import "../styles/Details.css";
import { FormDentist } from "./Form/FormDentist";
import { Caption, TableRow } from "./Table";
import { formatTelefone, stateDetails } from "../utils.js";
import { FormLocal } from "./Form/FormLocal";
import { FormService } from "./Form/FormService";
import { DentistTableBody } from "./TableBody";
import { mdiPencil } from "@mdi/js";
import { TableService } from "../pages/Todos";
import Icon from "@mdi/react";

export const PopUpEditContext = createContext({
    setShowForm: () => {},
    setForm: () => {},
    setUpdateServices: () => {},
});
export const EditContext = createContext({
    setEdit: () => {},
    setUpdate: () => {},
    setExport: () => {},
});

const Info = ({ content }) => {
    const { setEdit } = useContext(EditContext);
    // text-align: end;
    // padding: 5px 0 5px 0px;
    // display: "flex",
    //     justifyContent: "flex-end",
    const divBtnContainer = {
        textAlign: "end",
        padding: "5px 0 5px 0",
    };
    const pStyle = {
        borderBottom: "2px solid black",
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
                    <p style={pStyle} key={index + k}>
                        <strong>{k}: </strong>
                        {content[k]}
                    </p>
                );
            })}
        </div>
    );
};

//Table with  "dentista" that work at detailed page of a "local" place
function LocalDentistWorkers({ data, setUpdateServices }) {
    const row = ["Nome", "Telefone", "Endereço"];
    const serviços = useGetServiceBy(data.local._id, "local");
    if (!data) {
        // Data is still being fetched
        return <div>Loading...</div>;
    }

    data.dentistas.forEach((dentista) => {
        dentista.local = data.local;
    });
    return (
        <>
            {data.dentistas.length > 0 && (
                <div>
                    <table className="todos-table">
                        <Caption txt={"Dentistas"} />

                        <tbody>
                            <TableRow rowNames={row} />
                            <DentistTableBody data={data.dentistas} />
                        </tbody>
                    </table>
                </div>
            )}
            <div>
                {serviços !== undefined && serviços.length > 0 ? (
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

export function Details({ type, data, setUpdate }) {
    const [edit, setEdit] = useState(false);
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
            <EditContext.Provider value={{ setEdit, setUpdate }}>
                <Info content={infoContent} />
                <Table />
                {edit ? <Form /> : ""}
            </EditContext.Provider>
        </>
    );
}

Info.propTypes = {
    content: PropTypes.object,
};
LocalDentistWorkers.propTypes = {
    data: PropTypes.object,
    setUpdateServices: PropTypes.func,
};
Details.propTypes = {
    type: PropTypes.string,
    data: PropTypes.object,
    setUpdate: PropTypes.func,
};
