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
    return (
        <button onClick={handleSubmit} type="submit">
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
    return (
        <>
            <button onClick={handleSubmit} type="submit">
                Confirm
            </button>

            <button type="button" onClick={() => setEdit((e) => !e)}>
                Cancel
            </button>
        </>
    );
}
