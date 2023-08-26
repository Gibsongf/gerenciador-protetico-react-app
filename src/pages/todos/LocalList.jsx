// import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useTodosApi } from "../../components/ApiHooks";

// import { APItodos } from "../Api";

export function LocalList() {
    const data = useTodosApi("local");
    const saveDbId = (e) => {
        localStorage.setItem("localID", e.target.id);
    };
    if (!data) {
        // Data is still being fetched
        return <div>Loading...</div>;
    }

    return (
        <table className="todos-table">
            <caption>
                <h4>Locais Registrados</h4>
            </caption>

            <tbody>
                <tr>
                    <th>Nome</th>
                    <th>Telefone</th>
                    <th>Endereço</th>
                    <th>Tipo de Tabela</th>
                </tr>

                {data.map((d) => {
                    return (
                        <tr key={d._id}>
                            <td>
                                <Link
                                    onClick={saveDbId}
                                    id={d._id}
                                    to={`/local/${d._id}`}
                                >
                                    {d.nome}
                                </Link>
                            </td>
                            <td>{d.telefone}</td>
                            <td>{d.endereço}</td>
                            <td>{d.tipo_tabela}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
