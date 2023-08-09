import { useState } from "react";
import {
    CepInput,
    SimpleTextInput,
    TelefoneInput,
    TipoTabelaSelect,
} from "./Inputs";
import "../styles/Forms.css";
const UseForm = (formType, initialState) => {
    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        // console.log(e.target);
        // console.log(formData);
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // newContentValidator(e);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // const validData = newContentValidator(e.target.parentElement);

        // if (validData) {
        //     if (formType === "new") {
        //         // await newPost(formData);
        //         setFormData({ text: "", title: "", published: false });
        //     }
        //     if (formType === "edit") {
        //         setWasUpdated((e) => !e);
        //     }
        // }
    };
    return { formData, handleChange, handleSubmit };
};

export function FormDentist() {
    const nomeTag = { id: "nome", txt: "Nome do Local ou a Franquia:" };
    const initialState = {
        nome: "",
        endereço: "",
        cep: "",
        telefone: "",
        tabela: "",
    };
    const { formData, handleChange, handleSubmit } = UseForm(
        "new",
        initialState
    );

    return (
        <form action="" className="dentist-form">
            <legend>
                <h3>Registrar Novo Dentista</h3>
            </legend>
            <SimpleTextInput
                id={nomeTag.id}
                labelTxt={nomeTag.txt}
                value={formData.nome}
                onChange={handleChange}
            />
            <SimpleTextInput
                id={"endereço"}
                labelTxt={"Endereço:"}
                value={formData.endereço}
                onChange={handleChange}
            />
            <CepInput value={formData.cep} onChange={handleChange} />
            <TelefoneInput value={formData.telefone} onChange={handleChange} />
            <TipoTabelaSelect value={formData.tabela} onChange={handleChange} />
            <button type="submit">Registrar</button>
        </form>
    );
}
