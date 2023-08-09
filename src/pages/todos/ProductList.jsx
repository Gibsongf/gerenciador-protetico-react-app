import { useTodosApi } from "../../components/todosApiHook";

export function ProductList() {
    const data = useTodosApi("produto");
    if (!data) {
        // Data is still being fetched
        return <div>Loading...</div>;
    }
    //sort normal ascending
    // const sortBy = (key) => {
    //     const ascending = data.sort((a, b) =>
    //         a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0
    //     );
    //     const descending = data.sort((a, b) =>
    //         a[key] < b[key] ? 1 : b[key] < a[key] ? -1 : 0
    //     );
    //     return { ascending, descending };
    // };
    //sort normal descending

    // data.sort(compare);
    return (
        <table className="todos-table">
            <caption>
                <h4>Produtos Registrados</h4>
            </caption>

            <tbody>
                <tr>
                    <th>Nome</th>
                    <th>Valor Normal</th>
                    <th>Valor Reduzido</th>
                </tr>

                {data.map((d) => {
                    return (
                        <tr key={d.nome}>
                            <td>{d.nome}</td>
                            <td>R$ {d.valor_normal}</td>
                            <td>R$ {d.valor_reduzido}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
