import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";
import { useGetServiceBy } from "./ApiHooks";
import "../styles/Details.css";
import { FormDentist } from "./Form/FormDentist";
import { Caption, NavSortTable, TableRow } from "./Table";
import { formatTelefone, stateDetails } from "../utils";
import { FormLocal } from "./Form/FormLocal";
import { FormService } from "./Form/FormService";
import { DentistTableBody, ServiceTableBody } from "./TableBody";
import { mdiPencil } from "@mdi/js";
import { TableService } from "../pages/Todos";
import Icon from "@mdi/react";
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
// export function DentistServices({ data }) {
//     const row = ["Dentista", "Paciente", "Produto", "Finalizado"];

//     const [close, setClose] = useState(false);
//     const [form, setForm] = useState();
//     const [sortDate, setSortDate] = useState();

//     // console.log(data);
//     // create export excel of selected month and "entrega" status sim
//     return (
//         <div className="serviço">
//             <NavSortTable setDate={setSortDate} />

//             <table className="todos-table">
//                 <Caption txt={"Serviços"} />

//                 <tbody>
//                     <TableRow rowNames={row} />
//                     {data.serviços ? (
//                         <ServiceTableBody
//                             data={data.serviços}
//                             sortDate={sortDate}
//                         />
//                     ) : (
//                         ""
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     );
// }
// DentistServices.propTypes = {
//     data: PropTypes.object,
// };
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
});
// Link to other Details is getting confused with the previous used Details
// separate then each getting using they own Details and see if works
export function Details({ type, data, setUpdate }) {
    const [edit, setEdit] = useState(true);
    const { formState, infoContent } = stateDetails(data, type);
    // console.log(data);
    const Form = () => {
        const obj = {
            dentista: <FormDentist initialState={formState} />,
            local: <FormLocal initialState={formState} />,
            servico: <FormService initialState={formState} />,
        };
        return obj[type];
    };
    //providedData, setUpdateTable
    const Table = () => {
        const obj = {
            dentista: (
                <TableService providedData={data} setUpdateTable={setUpdate} />
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
