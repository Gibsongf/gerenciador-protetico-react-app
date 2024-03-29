import PropTypes from "prop-types";
import { createContext } from "react";
import { useGetServiceBy } from "./ApiHooks";
import "../styles/Details.css";
import { Caption, TableRow } from "./Table";
import { formatTelefone } from "../utils.js";
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

export const Info = ({ content, setEdit }) => {
    const divBtnContainer = {
        textAlign: "end",
        padding: "5px 0 5px 0",
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
                    <p
                        className="info-content"
                        key={index + k}
                        id={k.toLocaleLowerCase()}
                    >
                        <strong>{k}: </strong>
                        {content[k]}
                    </p>
                );
            })}
        </div>
    );
};

//Table with  "dentista" that work at detailed page of a "local" place
export function LocalDentistWorkers({ data }) {
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
                <div className="content-container">
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

Info.propTypes = {
    content: PropTypes.object,
    setEdit: PropTypes.func,
};
LocalDentistWorkers.propTypes = {
    data: PropTypes.object,
};
