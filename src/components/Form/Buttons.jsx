import { useContext } from "react";
import PropTypes from "prop-types";
import { EditContext } from "../GenerateDetails";

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
