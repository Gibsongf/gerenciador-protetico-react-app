import { useTodosApi } from "../../components/ApiHooks";
import { Caption, TableRow } from "../../components/Table";
import { ProductTableBody } from "../../components/TableBody";

export function ProductList() {
    const data = useTodosApi("produto");
    const row = ["Nome", "Valor Normal", "Valor Reduzido"];
    if (!data) {
        // Data is still being fetched
        return <div>Loading...</div>;
    }

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
