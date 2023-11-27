import { useContext, useRef, useState } from "react";

import { SimpleInput } from "../Inputs";
import "../../styles/Forms.css";
import { AppContext } from "../../App";
import { useForm } from "./useForm";
import PropTypes from "prop-types";
import { ButtonConfirm, ButtonRegister } from "./Buttons";
import { NewFormContext } from "../NewFormButton";
// import { EditContext } from "../GenerateDetails";
import { PopUpEditContext } from "../../pages/Todos";

FormProduct.propTypes = {
    initialState: PropTypes.object,
    closeBtn: PropTypes.any,
};
export function FormProduct({ initialState, closeBtn }) {
    const ref = useRef();
    const { setClose, setTableUpdate } = useContext(NewFormContext);
    const { setShowForm, setUpdate } = useContext(PopUpEditContext);
    let legendTxt = "Editar Produto";
    if (!initialState) {
        legendTxt = "Registrar Novo Produto";
        initialState = {
            nome: "",
            valor_normal: "",
            valor_reduzido: "",
            category: "produto",
            formType: "new",
        };
    }
    const { errorMsg } = useContext(AppContext);
    const { formData, handleChange, handleSubmit } = useForm(
        initialState,
        ref.current
    );
    const beforeSendSubmit = async (e) => {
        e.preventDefault();

        const success = await handleSubmit(e);
        if (success) {
            if (initialState.formType === "new") {
                //success set close to false to closed the form
                setClose((e) => !e);
                // update the table data
                setTableUpdate((e) => !e);
            }
            if (initialState.formType === "edit") {
                //success set close to false to closed the form
                // setClose((e) => !e);
                setShowForm((e) => !e);
                // update the table data
                setUpdate((e) => !e);
            }
        }
    };
    return (
        <div className="form-container" id="pop-up">
            <form action="" ref={ref} id="pop-up-content">
                {closeBtn}
                <legend>
                    <h3> {legendTxt} </h3>
                </legend>
                <SimpleInput
                    id={"nome"}
                    labelTxt={"Nome"}
                    value={formData.nome}
                    onChange={handleChange}
                    msg={!errorMsg ? "" : errorMsg.nome}
                />
                <SimpleInput
                    id={"valor_normal"}
                    labelTxt={"Valor Normal"}
                    value={formData.valor_normal}
                    onChange={handleChange}
                    type={"number"}
                    msg={!errorMsg ? "" : errorMsg.valor_normal}
                />
                <SimpleInput
                    id={"valor_reduzido"}
                    labelTxt={"Valor Reduzido"}
                    value={formData.valor_reduzido}
                    onChange={handleChange}
                    type={"number"}
                    msg={!errorMsg ? "" : errorMsg.valor_reduzido}
                />

                {initialState.formType === "edit" && (
                    <ButtonConfirm handleSubmit={beforeSendSubmit} />
                )}
                {initialState.formType === "new" && (
                    <ButtonRegister handleSubmit={beforeSendSubmit} />
                )}
            </form>
        </div>
    );
}
