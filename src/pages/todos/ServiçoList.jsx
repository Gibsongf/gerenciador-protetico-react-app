// import { useEffect, useState } from "react";
// import { APItodos } from "../Api";
import { useTodosApi } from "../../components/ApiHooks";
import { booleanToString } from "../../utils";
import { Caption, TableRow } from "../../components/Table";
import { Link } from "react-router-dom";

export function ServiceTableBody({ data }) {
    const saveDbId = (e) => {
        localStorage.setItem("dentistaID", e.target.id);
    };
    return data.map((d, index) => {
        console.log(d.dentista._id);
        return (
            <tr key={d.dentista.nome + index}>
                <td>
                    <Link
                        onClick={saveDbId}
                        to={`/dentista/${d.dentista._id}`}
                        id={d.dentista._id}
                    >
                        {d.dentista.nome}
                    </Link>
                </td>
                <td>{d.paciente}</td>
                <td>{d.produto.map((produto) => produto.nome + ", ")}</td>
                <td>{booleanToString(d.statusEntrega)}</td>
            </tr>
        );
    });
}
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
