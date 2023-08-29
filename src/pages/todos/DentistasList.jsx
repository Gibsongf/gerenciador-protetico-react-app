import { Link } from "react-router-dom";
import { useTodosApi } from "../../components/ApiHooks";
// import { useContext } from "react";
// import { AppContext } from "../../App";
import { Caption, TableRow } from "../../components/Table";
export function DentistTableBody({ data }) {
    const saveDbId = (e) => {
        localStorage.setItem("dentistaID", e.target.id);
    };
    return data.map((d) => {
        return (
            <tr key={d._id}>
                <td>
                    <Link
                        onClick={saveDbId}
                        to={`/dentista/${d._id}`}
                        id={d._id}
                    >
                        {d.nome} {d.sobrenome}{" "}
                    </Link>
                </td>
                <td>{d.telefone}</td>

                <td>{d.local.nome}</td>
            </tr>
        );
    });
}
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
