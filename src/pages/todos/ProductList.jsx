import { useTodosApi } from "../../components/ApiHooks";
import { Caption, TableRow } from "../../components/Table";
export function ProductTableBody({ data }) {
    return data.map((d) => {
        return (
            <tr key={d.nome}>
                <td>{d.nome}</td>
                <td>R$ {d.valor_normal}</td>
                <td>R$ {d.valor_reduzido}</td>
            </tr>
        );
    });
}
export function ProductList() {
    const data = useTodosApi("produto");
    const row = ["Nome", "Valor Normal", "Valor Reduzido"];
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
            <Caption txt={"Produtos Registrados"} />

            <tbody>
                <TableRow rowNames={row} />
                <ProductTableBody data={data} />
            </tbody>
        </table>
    );
}
