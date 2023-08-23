import { useContext, useRef, useState } from "react";

import { SimpleInput } from "../Inputs";
import "../../styles/Forms.css";
import { FormErrorMsg } from "../../App";
import { useForm } from "./useForm";

export function FormProduct() {
    const ref = useRef();

    const initialState = {
        nome: "",
        valor_normal: "",
        valor_reduzido: "",
        category: "produto",
    };
    const { errorMsg } = useContext(FormErrorMsg);

    const { formData, handleChange, handleSubmit } = useForm(
        "new",
        initialState,
        ref.current
    );

    return (
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
        </form>
    );
}
