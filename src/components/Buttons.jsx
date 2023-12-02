import { useContext } from "react";
import PropTypes from "prop-types";
import { EditContext } from "./GenerateDetails";
import { AppContext } from "../App";
import { ExcelLink } from "../Api";
import Icon from "@mdi/react";
import { mdiDownloadBoxOutline } from "@mdi/js";

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
    // const dbId = localStorage.getItem("servicoID");
    // const { data, setUpdate } = useDetailsApi("servico", dbId);

    const exportExcel = async () => {
        // turn this to post http send data and receive excel file
        const blob = await ExcelLink(data._id);
        const date = data.dataRegistro.split("T")[0];
        const { nome, sobrenome } = data.dentista;
        const fileName = `${nome}-${sobrenome}-${date}`;
        // console.log(fileName);
        const downloadLink = document.createElement("a");
        downloadLink.download = fileName;
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.click();
        URL.revokeObjectURL(downloadLink.href);
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
export function ButtonRegister({ handleSubmit }) {
    const style = {
        width: "20vw",
        alignSelf: "center",
        padding: "5px",
        fontSize: "1em",
        fontWeight: "bold",
    };
    return (
        <button style={style} onClick={handleSubmit} type="submit">
            Registrar
        </button>
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
export function ButtonEdit({ handleSubmit }) {
    const { setEdit } = useContext(EditContext);
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
            <button style={btnStyle} onClick={handleSubmit} type="submit">
                Confirm
            </button>

            <button
                style={btnStyle}
                type="button"
                onClick={() => setEdit((e) => !e)}
            >
                Cancel
            </button>
        </div>
    );
}

export function ButtonConfirm({ handleSubmit }) {
    const btnStyle = {
        width: "25vw",
        padding: "5px",
        fontSize: "1em",
        fontWeight: "bold",
        borderRadius: "10px",
    };
    return (
        // <div className="container-edit-btn" style={divStyle}>
        <button style={btnStyle} onClick={handleSubmit} type="submit">
            Confirm
        </button>

        /* </div> */
    );
}