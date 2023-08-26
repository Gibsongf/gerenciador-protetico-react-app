import { Link, NavLink } from "react-router-dom";
import { useTodosApi } from "../../components/ApiHooks";
import { useContext } from "react";
import { AppContext } from "../../App";

export function DentistasList() {
    const data = useTodosApi("dentista");
    const saveDbId = (e) => {
        localStorage.setItem("dentistaID", e.target.id);
    };
    if (!data) {
        // Data is still being fetched
        return <div>Loading...</div>;
    }

    return (
        <table className="todos-table">
            <caption>
                <h4>Dentistas Registrados</h4>
            </caption>

            <tbody>
                <tr>
                    <th>Nome</th>
                    <th>Telefone</th>
                    <th>Endereço</th>
                </tr>

                {data.map((d) => {
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
                })}
            </tbody>
        </table>
    );
}
