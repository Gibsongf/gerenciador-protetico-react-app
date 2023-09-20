import { useContext, useRef, useState } from "react";

import { SimpleInput } from "../Inputs";
import "../../styles/Forms.css";
import { AppContext } from "../../App";
import { useForm } from "./useForm";
import PropTypes from "prop-types";
import { ButtonEdit, ButtonRegister } from "./Buttons";

FormProduct.propTypes = {
    initialState: PropTypes.object,
    closeBtn: PropTypes.any,
};
export function FormProduct({ initialState, closeBtn }) {
    const ref = useRef();
    if (!initialState) {
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

    return (
        <div className="form-container" id="pop-up">
            <form action="" ref={ref} id="pop-up-content">
                {closeBtn}
                <legend>
                    <h3>Registrar Novo Produto</h3>
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

                {initialState.formType === "edit" ? (
                    <ButtonEdit handleSubmit={handleSubmit} />
                ) : (
                    ""
                )}
                {initialState.formType === "new" ? (
                    <ButtonRegister handleSubmit={handleSubmit} />
                ) : (
                    ""
                )}
            </form>{" "}
        </div>
    );
}
