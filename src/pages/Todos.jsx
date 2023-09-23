import { useTodosApi } from "../components/ApiHooks";
import { Caption, NavSortTable, TableRow } from "../components/Table";
import {
    DentistTableBody,
    LocalTableBody,
    ProductTableBody,
    ServiceTableBody,
} from "../components/TableBody";
import { ButtonNewForm } from "../components/NewFormButton.jsx";
import { createContext, useEffect, useState } from "react";

export function TodosDentistas() {
    const { data, setTableUpdate } = useTodosApi("dentista", true);
    const row = ["Nome", "Telefone", "Endereço"];
    if (!data) {
        // Data is still being fetched
        return <div>Loading...</div>;
    }

    return (
        <>
            {" "}
            <ButtonNewForm type="dentista" tableUpdate={setTableUpdate} />
            <table className="todos-table">
                <Caption txt={"Dentistas Registrados"} />

                <tbody>
                    <TableRow rowNames={row} />
                    <DentistTableBody data={data} />
                </tbody>
            </table>
        </>
    );
}

export function TodosLocais() {
    const { data, setTableUpdate } = useTodosApi("local", true);
    const row = ["Nome", "Telefone", "Endereço", "Tipo de Tabela"];
    if (!data) {
        // Data is still being fetched
        return <div>Loading...</div>;
    }

    return (
        <>
            <ButtonNewForm type="local" tableUpdate={setTableUpdate} />
            <table className="todos-table">
                <Caption txt={"Locais Registrados"} />

                <tbody>
                    <TableRow rowNames={row} />
                    <LocalTableBody data={data} />
                </tbody>
            </table>
        </>
    );
}
export const AllProductsContext = createContext({
    data: {},
    setShowForm: () => {},
    close: "",
    setForm: () => {},
    setUpdate: () => {},
});
export function TodosProdutos() {
    const { data, setTableUpdate } = useTodosApi("produto", true);
    const [close, setClose] = useState(false);
    const [form, setForm] = useState();
    useEffect(() => {
        console.log(close);
    }, [close]);
    const row = ["Nome", "Valor Normal", "Valor Reduzido"];
    if (!data) {
        // Data is still being fetched
        return <div>Loading...</div>;
    }

    return (
        <>
            <ButtonNewForm type="produto" tableUpdate={setTableUpdate} />
            <AllProductsContext.Provider
                value={{
                    setForm,
                    setUpdate: setTableUpdate,
                    setShowForm: setClose,
                }}
            >
                {close ? form : ""}

                <table className="todos-table">
                    <Caption txt={"Produtos Registrados"} />

                    <tbody>
                        <TableRow rowNames={row} />
                        <ProductTableBody data={data} />
                    </tbody>
                </table>
            </AllProductsContext.Provider>
        </>
    );
}
// create a button that show a window to the user decide stuffs about
// the export all service of the items in the table page
export function TodosService() {
    // need a nav buttons with selection to choose if all/this month/specific
    //month and to export excel of all marked items ?
    const { data, setTableUpdate } = useTodosApi("servico", true);
    const row = ["Dentista", "Paciente", "Produto", "Finalizado", ""];
    const [sortDate, setSortDate] = useState();
    const [close, setClose] = useState(false);
    const [editForm, setEditForm] = useState();

    if (!data) {
        // Data is still being fetched
        return <div>Loading...</div>;
    }

    return (
        <>
            {" "}
            <ButtonNewForm type="serviço" tableUpdate={setTableUpdate} />
            <NavSortTable setDate={setSortDate} />
            <table className="todos-table">
                <Caption txt="Serviços Registrados" />
                <tbody>
                    <TableRow rowNames={row} />
                    <ServiceTableBody data={data} sortDate={sortDate} />
                </tbody>
            </table>
        </>
    );
}
