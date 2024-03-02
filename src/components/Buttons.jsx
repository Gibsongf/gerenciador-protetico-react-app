import { useContext } from "react";
import PropTypes from "prop-types";
import { AppContext } from "../App";
import { ApiOneExcel } from "../Api.js";
import Icon from "@mdi/react";
import { mdiDownloadBoxOutline } from "@mdi/js";
import { downloadExcelAction } from "../utils.js";

ButtonRegister.propTypes = {
    handleSubmit: PropTypes.func,
};
ButtonConfirm.propTypes = {
    handleSubmit: PropTypes.func,
};
ButtonConfirm.propTypes = {
    handleSubmit: PropTypes.func,
};
ButtonClose.propTypes = {
    setClose: PropTypes.func,
};

BtnDownloadToExcel.propTypes = {
    data: PropTypes.object,
};

export function BtnDownloadToExcel({ data }) {
    const exportExcel = async () => {
        // turn this to post http send data and receive excel file
        const blob = await ApiOneExcel(data._id);
        const date = data.dataRegistro.split("T")[0];
        const { nome, sobrenome } = data.dentista;
        const fileName = `${nome}-${sobrenome}-${date}`;
        downloadExcelAction(blob, fileName);
    };

    return (
        <div className="export-container">
            <Icon
                onClick={exportExcel}
                path={mdiDownloadBoxOutline}
                title="export-btn"
                className="export-icon"
            />
        </div>
    );
}

export function ButtonClose({ setClose }) {
    const { errorMsg } = useContext(AppContext);

    const resetError = () => {
        setClose((e) => !e);
        Object.keys(errorMsg).forEach((k) => {
            errorMsg[k] = "";
        });
    };
    return (
        <span className="form-close-btn">
            <button className="close-btn" type="button" onClick={resetError}>
                X
            </button>
        </span>
    );
}

export function ButtonRegister() {
    return (
        <button className="register-form-btn" type="submit">
            Registrar
        </button>
    );
}
export function ButtonConfirm() {
    return (
        <button className="confirm-form-btn" type="submit">
            Confirmar
        </button>
    );
}
