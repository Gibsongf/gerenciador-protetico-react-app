import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";
import { useGetServiceBy } from "./ApiHooks";
import "../styles/Details.css";
import { FormDentist } from "./Form/FormDentist";
import { Caption, TableRow } from "./Table";
import { formatTelefone, stateDetails } from "../utils.js";
import { FormLocal } from "./Form/FormLocal";
// import { FormService } from "./Form/FormService";
import { DentistTableBody } from "./TableBody";
import { mdiPencil } from "@mdi/js";
import { TableService } from "../pages/Todos";
import Icon from "@mdi/react";
import { Loading } from "./Loading.jsx";

export const PopUpEditContext = createContext({
    setShowForm: () => {},
    setForm: () => {},
    setUpdateServices: () => {},
});
export const EditContext = createContext({
    setEdit: () => {},
    setUpdate: () => {},
});

const Info = ({ content, setEdit }) => {
    // const { setEdit } = useContext(EditContext);
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
function LocalDentistWorkers({ data }) {
    const row = ["Nome", "Telefone", "Endereço"];
    const { data: serviços, setUpdate } = useGetServiceBy(
        data.local._id,
        "local"
    );
    if (!data) {
        // Data is still being fetched
        return <Loading />;
    }

    data.dentistas.forEach((dentista) => {
        dentista.local = data.local;
    });
    return (
        <>
            {data.dentistas.length > 0 && (
                <div className="table-container">
                    <table className="todos-table">
                        <Caption txt={"Dentistas"} />

                        <tbody>
                            <TableRow rowNames={row} />
                            <DentistTableBody data={data.dentistas} />
                        </tbody>
                    </table>
                </div>
            )}

            {serviços !== undefined && serviços.length > 0 ? (
                <TableService
                    providedData={{ serviços }}
                    setUpdateTable={setUpdate}
                />
            ) : (
                ""
            )}
        </>
    );
}

export function Details({ type, data, setUpdate }) {
    const [edit, setEdit] = useState(false);
    const { formState, infoContent } = stateDetails(data, type);
    const Form = () => {
        const obj = {
            dentista: (
                <FormDentist
                    initialState={formState}
                    setUpdate={setUpdate}
                    setEdit={setEdit}
                />
            ),
            local: (
                <FormLocal
                    initialState={formState}
                    setUpdate={setUpdate}
                    setEdit={setEdit}
                />
            ),
        };
        return obj[type];
    };

    return (
        <>
            <EditContext.Provider value={{ setEdit, setUpdate }}>
                <Info content={infoContent} setEdit={setEdit} />
                {type === "dentista" ? (
                    <TableService
                        providedData={data}
                        setUpdateTable={setUpdate}
                        isDetails={true}
                    />
                ) : (
                    <LocalDentistWorkers data={data} />
                )}
            </EditContext.Provider>
            {edit ? <Form /> : ""}
        </>
    );
}

Info.propTypes = {
    content: PropTypes.object,
    setEdit: PropTypes.func,
};
LocalDentistWorkers.propTypes = {
    data: PropTypes.object,
    // setUpdateServices: PropTypes.func,
};
Details.propTypes = {
    type: PropTypes.string,
    data: PropTypes.object,
    setUpdate: PropTypes.func,
};
