import { Link } from "react-router-dom";
import { useTodosApi } from "../../components/ApiHooks";
// import { useContext } from "react";
// import { AppContext } from "../../App";
import { Caption, TableRow } from "../../components/Table";
import { DentistTableBody } from "../../components/TableBody";

export function DentistasList() {
    const data = useTodosApi("dentista");
    const row = ["Nome", "Telefone", "Endereço"];

    if (!data) {
        // Data is still being fetched
        return <div>Loading...</div>;
    }

    return (
        <table className="todos-table">
            <Caption txt={"Dentistas Registrados"} />

            <tbody>
                <TableRow rowNames={row} />
                <DentistTableBody data={data} />
            </tbody>
        </table>
    );
}
