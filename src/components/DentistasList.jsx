import { useTodosApi } from "./todosApiHook";

export function DentistasList() {
    const data = useTodosApi("dentista");
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
                        <tr key={d.nome}>
                            <td>
                                {d.nome} {d.sobrenome}{" "}
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
