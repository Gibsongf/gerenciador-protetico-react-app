// import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useTodosApi } from "../../components/ApiHooks";
import { Caption, TableRow } from "../../components/Table";

export function LocalTableBody({ data }) {
    const saveDbId = (e) => {
        localStorage.setItem("localID", e.target.id);
    };
    return data.map((d) => {
        return (
            <tr key={d._id}>
                <td>
                    <Link onClick={saveDbId} id={d._id} to={`/local/${d._id}`}>
                        {d.nome}
                    </Link>
                </td>
                <td>{d.telefone}</td>
                <td>{d.endereço}</td>
                <td>{d.tipo_tabela}</td>
            </tr>
        );
    });
}
// import { APItodos } from "../Api";
export function LocalList() {
    const data = useTodosApi("local");
    const row = ["Nome", "Telefone", "Endereço", "Tipo de Tabela"];

    if (!data) {
        // Data is still being fetched
        return <div>Loading...</div>;
    }

    return (
        <table className="todos-table">
            <Caption txt={"Locais Registrados"} />

            <tbody>
                <TableRow rowNames={row} />
                <LocalTableBody data={data} />
            </tbody>
        </table>
    );
}
