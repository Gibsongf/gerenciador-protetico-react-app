import { useContext } from "react";
import PropTypes from "prop-types";
import { EditContext } from "../GenerateDetails";
import { AppContext } from "../../App";

ButtonRegister.propTypes = {
    handleSubmit: PropTypes.func,
};
ButtonEdit.propTypes = {
    handleSubmit: PropTypes.func,
};
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
