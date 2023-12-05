import { createContext, useContext, useRef } from "react";

import {
    EntregaStatus,
    FilterDentistsByLocation,
    SearchProducts,
    SelectInput,
    SimpleInput,
} from "../Inputs";
import PropTypes from "prop-types";
import "../../styles/Forms.css";
import { useTodosApi } from "../ApiHooks";
import { AppContext } from "../../App";
import { useForm } from "./useForm";
import { ButtonConfirm, ButtonEdit, ButtonRegister } from "../Buttons";
import { NewFormContext } from "../NewFormButton";
import { EditContext } from "../GenerateDetails";
import { PopUpEditContext } from "../../pages/Todos";

FormExport.propTypes = {
    initialState: PropTypes.any,
    closeBtn: PropTypes.any,
};
export const RefContext = createContext({
    checkBoxRef: "",
});
export function FormExport({ initialState, closeBtn }) {
    const { setExport } = useContext(PopUpEditContext);

    // const products = useTodosApi("produto");
    // const { formData, setFormData, handleChange, handleSubmit } = useForm(
    //     initialState,
    //     ref.current
    // );

    // use the ref context to filter the selected checkbox and
    //format to array and save to the form data

    // console.log(initialState, formData);
    const beforeSendSubmit = async (e) => {
        e.preventDefault();
        //before submit we format the product

        // const success = await handleSubmit(e);
        // if (success) {
        //     if (initialState.formType === "new") {
        //         setClose((e) => !e);
        //         setTableUpdate((e) => !e);
        //     }
        //     if (initialState.formType === "edit") {
        //         setShowForm(() => false);
        //         setUpdate((e) => !e);
        //     }
        // }
    };

    return (
        <div className="form-container" id="pop-up">
            <form action="" id="pop-up-content">
                {closeBtn}
                <legend>
                    <h3>Configurar Exportação</h3>
                </legend>
                <label htmlFor="month">
                    / Mês:{" "}
                    <input
                        style={{ width: "160px" }}
                        // ref={ref}
                        // onChange={onChangeMonth}
                        lang="pt-BR"
                        type="month"
                        name="month"
                        id="month"
                    />
                </label>
                {/* <SimpleInput
                    id={"paciente"}
                    labelTxt={"Nome do Paciente:"}
                    value={formData.paciente}
                    onChange={handleChange}
                    msg={!errorMsg ? "" : errorMsg.paciente}
                /> */}

                {/* <SelectInput
                    initialValue={formData.local}
                    onChange={handleChange}
                    category={"local"}
                    labelTxt={"Local:"}
                    msg={!errorMsg ? "" : errorMsg.local}
                /> */}

                {/* <FilterDentistsByLocation
                    initialValue={formData.dentista}
                    onChange={handleChange}
                    dbId={formData.local}
                    msg={!errorMsg ? "" : errorMsg.dentista}
                /> */}

                <EntregaStatus
                    value={formData.statusEntrega}
                    onChange={handleChange}
                />
            </form>
        </div>
    );
}
