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
import PropTypes from "prop-types";
import { Loading } from "../components/Loading.jsx";
import { ServiceTodosDiv } from "../components/DivTodos.jsx";
export function TodosDentistas() {
    const { data, setTableUpdate } = useTodosApi("dentista", true);
    const row = ["Nome", "Telefone", "Endereço"];
    if (!data) {
        // Data is still being fetched

        return <Loading />;
    }

    return (
        <>
            {" "}
            <ButtonNewForm type="dentista" tableUpdate={setTableUpdate} />
            <div className="table-container" id="dentista-table">
                <table className="todos-table">
                    <Caption txt={"Dentistas"} />

                    <tbody>
                        <TableRow rowNames={row} />
                        <DentistTableBody data={data} />
                    </tbody>
                </table>
            </div>
        </>
    );
}

export function TodosLocais() {
    const { data, setTableUpdate } = useTodosApi("local", true);
    const row = ["Nome", "Telefone", "Endereço", "Tipo de Tabela"];
    if (!data) {
        // Data is still being fetched
        return <Loading />;
    }

    return (
        <>
            <ButtonNewForm type="local" tableUpdate={setTableUpdate} />
            <div className="table-container" id="local-table">
                <table className="todos-table">
                    <Caption txt={"Locais"} />

                    <tbody>
                        <TableRow rowNames={row} />
                        <LocalTableBody data={data} />
                    </tbody>
                </table>
            </div>
        </>
    );
}
export const PopUpEditContext = createContext({
    setShowForm: () => {},
    setForm: () => {},
    setUpdate: () => {},
});
export function TodosProdutos() {
    const { data, setTableUpdate } = useTodosApi("produto", true);
    const [close, setClose] = useState(false);
    const [form, setForm] = useState();

    const row = ["Nome", "Valor Normal", "Valor Reduzido"];
    if (!data) {
        // Data is still being fetched
        return <Loading />;
    }

    return (
        // <div className="content" >
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
                <div className="table-container" id="produto-table">
                    <table className="todos-table">
                        <Caption txt={"Produtos"} />

                        <tbody>
                            <TableRow rowNames={row} />
                            <ProductTableBody data={data} />
                        </tbody>
                    </table>
                </div>
            </PopUpEditContext.Provider>
        </>
        // </div>
    );
}

TableService.propTypes = {
    providedData: PropTypes.object,
    isDetails: PropTypes.bool,
    setUpdateTable: PropTypes.func,
};

export function TableService({ providedData, setUpdateTable, isDetails }) {
    let { data, setTableUpdate } = useTodosApi("servico", true);
    const row = ["Dentista", "Paciente", "Produto", "", ""];
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
        return <Loading />;
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
            {/* <div className="content" > */}
            <div className="table-container" id="serviço-table">
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
                    <ServiceTodosDiv data={definiteData} sortDate={sortDate} />
                    {/* <table className="todos-table">
                        <Caption txt={"Serviços"} />

                        <tbody>
                            <TableRow rowNames={row} />
                            <ServiceTableBody
                                data={definiteData}
                                sortDate={sortDate}
                            />
                        </tbody>
                    </table> */}
                </PopUpEditContext.Provider>
            </div>
            {/* </div> */}
        </>
    );
}
