import { useState } from "react";
import {
    CepInput,
    CpfInput,
    SelectInput,
    SimpleInput,
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

export function FormLocal() {
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
        <form action="">
            <legend>
                <h3>Registrar Novo Local</h3>
            </legend>
            <SimpleInput
                id={nomeTag.id}
                labelTxt={nomeTag.txt}
                value={formData.nome}
                onChange={handleChange}
            />
            <SimpleInput
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
export function FormDentist() {
    const initialState = {
        nome: "",
        sobrenome: "",
        local: "",
        telefone: "",
        cpf: "",
    };

    const { formData, handleChange, handleSubmit } = UseForm(
        "new",
        initialState
    );

    return (
        <form action="">
            <legend>
                <h3>Registrar Novo Dentista</h3>
            </legend>
            <SimpleInput
                id={"nome"}
                labelTxt={"Nome:"}
                value={formData.nome}
                onChange={handleChange}
            />
            <SimpleInput
                id={"sobrenome"}
                labelTxt={"Sobrenome:"}
                value={formData.sobrenome}
                onChange={handleChange}
            />
            <TelefoneInput value={formData.telefone} onChange={handleChange} />
            <CpfInput value={formData.cpf} onChange={handleChange} />

            <SelectInput
                initialValue={formData.local}
                onChange={handleChange}
                category={"local"}
                labelTxt={"Local de Trabalho:"}
            />
            <button type="submit">Registrar</button>
        </form>
    );
}

export function FormProduct() {
    const initialState = {
        nome: "",
        valor_normal: "",
        valor_reduzido: "",
    };

    const { formData, handleChange, handleSubmit } = UseForm(
        "new",
        initialState
    );

    return (
        <form action="">
            <legend>
                <h3>Registrar Novo Produto</h3>
            </legend>
            <SimpleInput
                id={"nome"}
                labelTxt={"Nome:"}
                value={formData.nome}
                onChange={handleChange}
            />
            <SimpleInput
                id={"valor_normal"}
                labelTxt={"Valor Normal:"}
                value={formData.valor_normal}
                onChange={handleChange}
                type={"number"}
            />
            <SimpleInput
                id={"valor_reduzido"}
                labelTxt={"Valor Reduzido:"}
                value={formData.valor_reduzido}
                onChange={handleChange}
                type={"number"}
            />

            <button type="submit">Registrar</button>
        </form>
    );
}

export function FormService() {
    const initialState = {
        dentista: "",
        produto: "",
        paciente_nome: "",
    };

    const { formData, handleChange, handleSubmit } = UseForm(
        "new",
        initialState
    );

    return (
        <form action="">
            <legend>
                <h3>Registrar Novo Serviço</h3>
            </legend>
            <SimpleInput
                id={"paciente_nome"}
                labelTxt={"Nome do Paciente:"}
                value={formData.paciente_nome}
                onChange={handleChange}
            />
            {/* select Local then from this local we 
                show the dentist that work there as
                option for the next select input  
            */}
            <SelectInput
                initialValue={formData.dentista}
                onChange={handleChange}
                category={"local"}
                labelTxt={"Local:"}
            />

            <button type="submit">Registrar</button>
        </form>
    );
}
