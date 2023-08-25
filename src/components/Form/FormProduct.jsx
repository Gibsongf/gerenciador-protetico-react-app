import { useContext, useRef, useState } from "react";

import { SimpleInput } from "../Inputs";
import "../../styles/Forms.css";
import { AppContext } from "../../App";
import { useForm } from "./useForm";
import PropTypes from "prop-types";

FormProduct.propTypes = {
    initialState: PropTypes.object,
};
export function FormProduct({ initialState }) {
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
        <div className="form-container">
            <form action="" ref={ref}>
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

                <button onClick={handleSubmit} type="submit">
                    Registrar
                </button>
            </form>{" "}
        </div>
    );
}
