// import { useEffect, useState } from "react";
// import { APItodos } from "../Api";
import { useTodosApi } from "../../components/ApiHooks";
import { Caption, TableRow } from "../../components/Table";
import { ServiceTableBody } from "../../components/TableBody";

export function ServiçoList() {
    const data = useTodosApi("servico");
    const row = ["Dentista", "Paciente", "Produto", "Entregado"];
    if (!data) {
        // Data is still being fetched
        return <div>Loading...</div>;
    }
    return (
        <table className="todos-table">
            <Caption txt="Serviços Registrados" />
            <tbody>
                <TableRow rowNames={row} />
                <ServiceTableBody data={data} />
            </tbody>
        </table>
    );
}
