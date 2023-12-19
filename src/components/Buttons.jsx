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
ButtonEdit.propTypes = {
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
        <Icon
            onClick={exportExcel}
            path={mdiDownloadBoxOutline}
            title="export-btn"
            className="export-btn"
        />
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
export function ButtonEdit() {
    const divStyle = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        padding: "5px",
    };
    const btnStyle = {
        width: "25vw",
        padding: "5px",
        fontSize: "1em",
        fontWeight: "bold",
        borderRadius: "10px",
    };
    return (
        <div className="container-edit-btn" style={divStyle}>
            <button style={btnStyle} type="submit">
                Confirm
            </button>
        </div>
    );
}
export function ButtonRegister() {
    const style = {
        width: "20vw",
        alignSelf: "center",
        padding: "5px",
        fontSize: "1em",
        fontWeight: "bold",
    };
    return (
        <button style={style} type="submit">
            Registrar
        </button>
    );
}
export function ButtonConfirm() {
    const btnStyle = {
        width: "25vw",
        padding: "5px",
        fontSize: "1em",
        fontWeight: "bold",
        borderRadius: "10px",
    };
    return (
        <button style={btnStyle} type="submit">
            Confirm
        </button>
    );
}
