import { useContext, useRef } from "react";
import { CpfInput, SelectInput, SimpleInput, TelefoneInput } from "../Inputs";
import "../../styles/Forms.css";
import PropTypes from "prop-types";
import { useForm } from "./useForm";
import { AppContext } from "../../App";
import { ButtonClose, ButtonEdit, ButtonRegister } from "../Buttons";
import { NewFormContext } from "../NewFormButton";

export function FormDentist({ initialState, setEdit, setUpdate }) {
    const ref = useRef();
    const { errorMsg } = useContext(AppContext);
    const { setClose, setTableUpdate } = useContext(NewFormContext);
    let legendTxt = "Editar Detalhes do Dentista";
    if (!initialState) {
        legendTxt = "Registrar Novo Dentista";
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
                    id={"nome"}
                    labelTxt={"Nome:"}
                    value={formData.nome}
                    onChange={handleChange}
                    msg={!errorMsg ? "" : errorMsg.nome}
                />
                <SimpleInput
                    id={"sobrenome"}
                    labelTxt={"Sobrenome:"}
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
                    labelTxt={"Local de Trabalho:"}
                    msg={!errorMsg ? "" : errorMsg.local}
                />
                {initialState.formType === "edit" && <ButtonEdit />}
                {initialState.formType === "new" && <ButtonRegister />}
            </form>
        </div>
    );
}

FormDentist.propTypes = {
    initialState: PropTypes.object,
    setEdit: PropTypes.any,
    setUpdate: PropTypes.any,
};
