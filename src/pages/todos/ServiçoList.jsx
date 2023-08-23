// import { useEffect, useState } from "react";
// import { APItodos } from "../Api";
import { useTodosApi } from "../../components/ApiHooks";

export function ServiçoList() {
    const data = useTodosApi("servico");
    if (!data) {
        // Data is still being fetched
        return <div>Loading...</div>;
    }
    const booleanToString = (b) => {
        if (b === true) {
            return "Sim";
        } else {
            return "Não";
        }
    };
    return (
        <table className="todos-table">
            <caption>
                <h4>Serviços Registrados</h4>
            </caption>

            <tbody>
                <tr>
                    <th>Dentista</th>
                    <th>Paciente</th>
                    <th>Produto</th>
                    <th>Entregado</th>
                </tr>
                {/* need to fix the not render of product name */}
                {data.map((d, index) => {
                    return (
                        <tr key={d.dentista.nome + index}>
                            <td>{d.dentista.nome}</td>
                            <td>{d.paciente}</td>
                            <td>
                                {d.produto.map(
                                    (produto) => produto.nome + ", "
                                )}
                            </td>
                            <td>{booleanToString(d.statusEntrega)}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
