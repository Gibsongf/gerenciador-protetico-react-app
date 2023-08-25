import { useContext, useRef, useState } from "react";

import { CpfInput, SelectInput, SimpleInput, TelefoneInput } from "../Inputs";
import "../../styles/Forms.css";
import PropTypes from "prop-types";

import { useForm } from "./useForm";
import { AppContext } from "../../App";

export function FormDentist({ initialState }) {
    const ref = useRef();
    const { errorMsg } = useContext(AppContext);
    if (!initialState) {
        initialState = {
            nome: "",
            sobrenome: "",
            local: "",
            telefone: "",
            cpf: "",
            category: "dentista",
            formType: "new",
        };
    }

    const { formData, handleChange, handleSubmit } = useForm(
        initialState,
        ref.current
    );
    return (
        <form action="" ref={ref}>
            <legend>
                <h3>Registrar Novo Dentista</h3>
            </legend>
            <SimpleInput
                id={"nome"}
                labelTxt={"Nome"}
                value={formData.nome}
                onChange={handleChange}
                msg={!errorMsg ? "" : errorMsg.nome}
            />
            <SimpleInput
                id={"sobrenome"}
                labelTxt={"Sobrenome"}
                value={formData.sobrenome}
                onChange={handleChange}
            />
            <TelefoneInput
                value={formData.telefone}
                onChange={handleChange}
                msg={!errorMsg ? "" : errorMsg.telefone}
            />
            <CpfInput
                value={formData.cpf}
                onChange={handleChange}
                msg={!errorMsg ? "" : errorMsg.cpf}
            />

            <SelectInput
                initialValue={formData.local}
                onChange={handleChange}
                category={"local"}
                labelTxt={"Local de Trabalho"}
                msg={!errorMsg ? "" : errorMsg.local}
            />
            <button onClick={handleSubmit} type="submit">
                Registrar
            </button>
        </form>
    );
}
FormDentist.propTypes = {
    initialState: PropTypes.object,
};
