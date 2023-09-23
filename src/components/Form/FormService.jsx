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
import { ButtonEdit, ButtonRegister } from "./Buttons";
import { NewFormContext } from "../NewFormButton";
import { EditContext } from "../GenerateDetails";

FormService.propTypes = {
    initialState: PropTypes.object,
    closeBtn: PropTypes.any,
};
export const RefContext = createContext({
    checkBoxRef: "",
});
export function FormService({ initialState, closeBtn }) {
    const { errorMsg } = useContext(AppContext);
    const ref = useRef();
    const checkBoxRef = useRef();
    const { setClose, setTableUpdate } = useContext(NewFormContext);
    const { setEdit, setUpdate } = useContext(EditContext);
    if (!initialState) {
        initialState = {
            dentista: "",
            local: "",
            paciente: "",
            category: "servico",
            formType: "new",
        };
    }
    const products = useTodosApi("produto");
    const { formData, setFormData, handleChange, handleSubmit } = useForm(
        initialState,
        ref.current
    );

    // use the ref context to filter the selected checkbox and
    //format to array and save to the form data
    const formatFilterProducts = () => {
        let el = Array.from(checkBoxRef.current.children);
        const boxIsChecked = el.filter((ele) => {
            if (ele.children[0].checked) {
                return ele;
            }
        });
        const boxValues = boxIsChecked.map(
            (checkbox) => checkbox.children[0].value
        );
        setFormData((prev) => {
            prev.produto = boxValues;
            return { ...prev };
        });
    };
    //before submit we format the product
    const beforeSendSubmit = async (e) => {
        e.preventDefault();
        if (checkBoxRef.current) {
            formatFilterProducts();
        }

        const success = await handleSubmit(e);
        if (success) {
            if (initialState.formType === "new") {
                setClose((e) => !e);
                setTableUpdate((e) => !e);
            }
            if (initialState.formType === "edit") {
                setTableUpdate((e) => !e);
            }
        }
    };
    return (
        <div className="form-container" id="pop-up">
            <form action="" ref={ref} id="pop-up-content">
                {closeBtn}
                <legend>
                    <h3>Serviço</h3>
                </legend>

                <SimpleInput
                    id={"paciente"}
                    labelTxt={"Nome do Paciente:"}
                    value={formData.paciente}
                    onChange={handleChange}
                    msg={!errorMsg ? "" : errorMsg.paciente}
                />

                <SelectInput
                    initialValue={formData.local}
                    onChange={handleChange}
                    category={"local"}
                    labelTxt={"Local:"}
                    msg={!errorMsg ? "" : errorMsg.local}
                />

                <FilterDentistsByLocation
                    initialValue={formData.dentista}
                    onChange={handleChange}
                    dbId={formData.local}
                    msg={!errorMsg ? "" : errorMsg.dentista}
                />
                <RefContext.Provider value={{ checkBoxRef }}>
                    <SearchProducts
                        products={products}
                        name="produto"
                        onChange={handleChange}
                        preSelectProduct={formData.produtos}
                    />
                </RefContext.Provider>
                <EntregaStatus
                    value={formData.statusEntrega}
                    onChange={handleChange}
                />

                {initialState.formType === "edit" ? (
                    <ButtonEdit handleSubmit={handleSubmit} />
                ) : (
                    ""
                )}
                {initialState.formType === "new" ? (
                    <ButtonRegister handleSubmit={beforeSendSubmit} />
                ) : (
                    ""
                )}
            </form>
        </div>
    );
}
