import { DataGrid } from "@mui/x-data-grid";
import { useTodosApi } from "./ApiHooks";
import { FormService } from "./Form/FormService";
import { FormProduct } from "./Form/FormProduct";
import { PopUpEditContext } from "../pages/Todos";
import { useCallback, useContext, useState } from "react";
import { formatToForm } from "../utils";
import { APIPutData } from "../Api";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const columns = [
    {
        field: "nome",
        headerName: "Nome",
        minWidth: 150,
        flex: 1,
        editable: true,
        type: "string",
    },
    {
        field: "valorNormal",
        headerName: "(R$)Normal",
        minWidth: 200,
        flex: 0.5,
        editable: true,
        type: "number",
    },
    {
        field: "valorReduzido",
        headerName: "(R$)Reduzido",
        minWidth: 200,
        flex: 0.5,
        editable: true,
        type: "number",
    },
];
//need to fix the update of the values, maybe changing the name of valor_normal to valorNormal
// at the models for db
export function DataTable() {
    const { data, setTableUpdate } = useTodosApi("produto", true);
    const { setShowForm, setForm } = useContext(PopUpEditContext);
    const [snackbar, setSnackbar] = useState(null);
    const handleCloseSnackbar = () => setSnackbar(null);

    const handleProcessRowUpdateError = useCallback((error) => {
        setSnackbar({ children: error.message, severity: "error" });
    }, []);
    const handleSubmit = async (updatedRow, originalRow) => {
        // console.log(updatedRow);
        const formatData = formatToForm("produto", updatedRow);
        formatData.valor_normal = updatedRow.valorNormal;
        formatData.valor_reduzido = updatedRow.valorReduzido;
        const response = await APIPutData(formatData, formatData.dbId);
        //no error register dbId as id for MUI row cell
        if (!response.errors) {
            response.produto.id = response.produto._id;
            setTableUpdate((e) => !e);
            return response.produto;
        } else {
            //turn the object with error message in a array of field name and error
            const err = Object.keys(response.errors).map((k) => {
                return `${k}: ${response.errors[k]}`;
            });
            //turn the array in a single message string
            throw new Error(err.join(" "));
        }
    };
    if (!data) {
        return;
    } else {
        // console.log(data);
        data.forEach((item) => {
            item.id = item._id;
            item.valorNormal = item.valor_normal;
            item.valorReduzido = item.valor_reduzido;
        });
    }
    return (
        <div
            style={{ width: "100%", backgroundColor: "white" }}
            className="content-container"
            id="produto-table"
        >
            <DataGrid
                rows={data}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { pendereço: 0, pendereçoSize: 5 },
                    },
                }}
                processRowUpdate={handleSubmit}
                onProcessRowUpdateError={handleProcessRowUpdateError}
                // pendereçoSizeOptions={[5, 10]}
                // checkboxSelection
            />
            {!!snackbar && (
                <Snackbar
                    open
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    onClose={handleCloseSnackbar}
                    autoHideDuration={6000}
                >
                    <Alert {...snackbar} onClose={handleCloseSnackbar} />
                </Snackbar>
            )}
        </div>
    );
}
