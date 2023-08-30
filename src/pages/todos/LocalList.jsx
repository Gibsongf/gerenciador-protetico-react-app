// import { useEffect, useState } from "react";

import { useTodosApi } from "../../components/ApiHooks";
import { Caption, TableRow } from "../../components/Table";
import { LocalTableBody } from "../../components/TableBody";

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
