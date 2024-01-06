import { useContext, useRef } from "react";
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
import { ButtonClose, ButtonEdit, ButtonRegister } from "../Buttons";
import { NewFormContext } from "../NewFormButton";

export function FormLocal({ initialState, setEdit, setUpdate }) {
    const ref = useRef();
    const { errorMsg } = useContext(AppContext);
    const nomeTag = { id: "nome", txt: "Nome do Local:" };
    const { setClose, setTableUpdate } = useContext(NewFormContext);

    let legendTxt = "Editar Detalhes do Local";
    if (!initialState) {
        legendTxt = "Registrar Novo Local";
        initialState = {
            nome: "",
            endereço: "",
            cep: "",
            telefone: "",
            tabela: "Normal",
            category: "local",
            formType: "new",
        };
    }
    const { formData, handleChange, handleSubmit } = useForm(
        initialState,
        ref.current
    );
    const handleSubmitResponse = async (e) => {
        const success = await handleSubmit(e);
        if (success) {
            if (initialState.formType === "new") {
                setClose((e) => !e);
                setTableUpdate((e) => !e);
            }
            if (initialState.formType === "edit") {
                setEdit((e) => !e);
                setUpdate((e) => !e);
            }
        }
    };

    return (
        <div className="form-container" id="pop-up">
            <form
                onSubmit={handleSubmitResponse}
                action=""
                ref={ref}
                id="pop-up-content"
            >
                <ButtonClose
                    setClose={
                        initialState.formType === "new" ? setClose : setEdit
                    }
                />
                <legend>
                    <h3>{legendTxt}</h3>
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
                    labelTxt={"Endereço:"}
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
                {initialState.formType === "edit" && <ButtonEdit />}
                {initialState.formType === "new" && <ButtonRegister />}
            </form>
        </div>
    );
}

FormLocal.propTypes = {
    initialState: PropTypes.object,
    setEdit: PropTypes.any,
    setUpdate: PropTypes.any,
};
