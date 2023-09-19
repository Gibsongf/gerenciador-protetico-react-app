import { useContext, useRef, useState } from "react";

import {
    CepInput,
    SimpleInput,
    TelefoneInput,
    TipoTabelaSelect,
} from "../Inputs";
import "../../styles/Forms.css";
import { AppContext } from "../../App";
import { useForm } from "./useForm";
import PropTypes from "prop-types";
import { ButtonEdit, ButtonRegister } from "./Buttons";

export function FormLocal({ initialState }) {
    const ref = useRef();
    const { errorMsg } = useContext(AppContext);

    const nomeTag = { id: "nome", txt: "Nome do Local" };
    if (!initialState) {
        initialState = {
            nome: "",
            endereço: "",
            cep: "",
            telefone: "",
            tabela: "",
            category: "local",
            formType: "new",
        };
    }
    const { formData, handleChange, handleSubmit } = useForm(
        initialState,
        ref.current
    );
    // useEffect(() => {
    //     //console.log(msgError);
    // }, [msgError]);
    return (
        <div className="form-container" id="pop-up">
            <form action="" ref={ref} id="pop-up-content">
                <legend>
                    <h3>Registrar Novo Local</h3>
                </legend>

                <SimpleInput
                    id={nomeTag.id}
                    labelTxt={nomeTag.txt}
                    value={formData.nome}
                    onChange={handleChange}
                    msg={!errorMsg ? "" : errorMsg.nome}
                />
                <SimpleInput
                    id={"endereço"}
                    labelTxt={"Endereço"}
                    value={formData.endereço}
                    onChange={handleChange}
                    msg={!errorMsg ? "" : errorMsg.endereço}
                />
                <CepInput
                    value={formData.cep}
                    onChange={handleChange}
                    msg={!errorMsg ? "" : errorMsg.cep}
                />
                <TelefoneInput
                    value={formData.telefone}
                    onChange={handleChange}
                    msg={!errorMsg ? "" : errorMsg.telefone}
                />
                <TipoTabelaSelect
                    value={formData.tabela}
                    onChange={handleChange}
                />
                {!initialState.formType === "edit" ? (
                    <ButtonRegister handleSubmit={handleSubmit} />
                ) : (
                    <ButtonEdit handleSubmit={handleSubmit} />
                )}
            </form>
        </div>
    );
}
FormLocal.propTypes = {
    initialState: PropTypes.object,
};
