import { useTodosApi } from "../components/ApiHooks";
import { Caption, NavSortTable, TableRow } from "../components/Table";
import {
    DentistTableBody,
    LocalTableBody,
    ProductTableBody,
    ServiceTableBody,
} from "../components/TableBody";
import { ButtonNewForm } from "../components/NewFormButton.jsx";
import { createContext, useState } from "react";
import { ApiMonthExcel } from "../Api.js";
import { downloadExcelAction } from "../utils.js";

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
                <Caption txt={"Dentistas"} />

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
                <Caption txt={"Locais"} />

                <tbody>
                    <TableRow rowNames={row} />
                    <LocalTableBody data={data} />
                </tbody>
            </table>
        </>
    );
}
export const PopUpEditContext = createContext({
    setShowForm: () => {},
    s// useEffect(() => {
    //     console.log(close);
    // }, [close]);etForm: () => {},
    setUpdate: () => {},
});
export function TodosProdutos() {
    const { data, setTableUpdate } = useTodosApi("produto", true);
    const [close, setClose] = useState(false);
    const [form, setForm] = useState();
    
    const row = ["Nome", "Valor Normal", "Valor Reduzido"];
    if (!data) {
        // Data is still being fetched
        return <div>Loading...</div>;
    }

    return (
        <>
            <ButtonNewForm type="produto" tableUpdate={setTableUpdate} />
            <PopUpEditContext.Provider
                value={{
                    setForm,
                    setUpdate: setTableUpdate,
                    setShowForm: setClose,
                }}
            >
                {close ? form : ""}

                <table className="todos-table">
                    <Caption txt={"Produtos"} />

                    <tbody>
                        <TableRow rowNames={row} />
                        <ProductTableBody data={data} />
                    </tbody>
                </table>
            </PopUpEditContext.Provider>
        </>
    );
}

import PropTypes from "prop-types";

TableService.propTypes = {
    providedData: PropTypes.object,
    isDetails: PropTypes.bool,
    setUpdateTable: PropTypes.func,
};

export function TableService({ providedData, setUpdateTable, isDetails }) {
    let { data, setTableUpdate } = useTodosApi("servico", true);
    const row = ["Dentista", "Paciente", "Produto", "Finalizado", "", ""];
    const [sortDate, setSortDate] = useState();
    const [close, setClose] = useState(false);
    const [form, setForm] = useState();
    const onClickExport = async () => {
        if (sortDate) {
            const blob = await ApiMonthExcel(
                providedData.dentista._id,
                sortDate
            );
            const { nome, sobrenome } = providedData.dentista;
            const fileName = `${nome}-${sobrenome}-${sortDate}`;
            downloadExcelAction(blob, fileName);
        }
    };
    if (!data) {
        // Data is still being fetched
        return <div>Loading...</div>;
    }
    const updateFunction =
        setUpdateTable !== undefined ? setUpdateTable : setTableUpdate;
    const definiteData =
        providedData !== undefined ? providedData.serviços : data;
    const newBtnRender = providedData === undefined ? true : false;

    return (
        <>
            {newBtnRender === true && (
                <ButtonNewForm type="serviço" tableUpdate={updateFunction} />
            )}
            <NavSortTable
                setDate={setSortDate}
                isDetails={isDetails}
                exportClick={onClickExport}
            />

            <PopUpEditContext.Provider
                value={{
                    setForm,
                    setUpdate: updateFunction,
                    setShowForm: setClose,
                }}
            >
                {close ? form : ""}

                <table className="todos-table">
                    <Caption txt={"Serviços"} />

                    <tbody>
                        <TableRow rowNames={row} />
                        <ServiceTableBody
                            data={definiteData}
                            sortDate={sortDate}
                        />
                    </tbody>
                </table>
            </PopUpEditContext.Provider>
        </>
    );
}
