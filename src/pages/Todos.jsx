import { createContext, useState } from "react";
import { useTodosApi } from "../components/ApiHooks";
import { FormDentist } from "../components/Form/FormDentist";
import { FormLocal } from "../components/Form/FormLocal";
import { FormProduct } from "../components/Form/FormProduct";
import { FormService } from "../components/Form/FormService";
import { Caption, TableRow } from "../components/Table";
import {
    DentistTableBody,
    LocalTableBody,
    ProductTableBody,
    ServiceTableBody,
} from "../components/TableBody";
import { ButtonNewForm } from "../components/NewFormButton.jsx";

export function TodosDentistas() {
    const data = useTodosApi("dentista");
    const row = ["Nome", "Telefone", "Endereço"];
    if (!data) {
        // Data is still being fetched
        return <div>Loading...</div>;
    }

    return (
        <>
            <button className="new-form">Novo</button>
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
    const data = useTodosApi("local");
    const row = ["Nome", "Telefone", "Endereço", "Tipo de Tabela"];
    if (!data) {
        // Data is still being fetched
        return <div>Loading...</div>;
    }

    return (
        <>
            <button className="new-form">Novo</button>
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

export function ListProducts() {
    const data = useTodosApi("produto");
    const row = ["Nome", "Valor Normal", "Valor Reduzido"];
    if (!data) {
        // Data is still being fetched
        return <div>Loading...</div>;
    }

    return (
        <>
            <button className="new-form">Novo</button>
            <table className="todos-table">
                <Caption txt={"Produtos Registrados"} />

                <tbody>
                    <TableRow rowNames={row} />
                    <ProductTableBody data={data} />
                </tbody>
            </table>
        </>
    );
}

export function ListService() {
    // need a nav buttons with selection to choose if all/this month/specific
    //month and to export excel of all marked items ?
    const { data, setTableUpdate } = useTodosApi("servico", true);
    const row = ["Dentista", "Paciente", "Produto", "Entregado", ""];
    if (!data) {
        // Data is still being fetched
        return <div>Loading...</div>;
    }

    return (
        <>
            {" "}
            <ButtonNewForm type="serviço" tableUpdate={setTableUpdate} />
            <table className="todos-table">
                <Caption txt="Serviços Registrados" />
                <tbody>
                    <TableRow rowNames={row} />
                    <ServiceTableBody data={data} />
                </tbody>
            </table>
        </>
    );
}
