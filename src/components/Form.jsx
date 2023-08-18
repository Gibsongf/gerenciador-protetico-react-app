import { useContext, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import {
    CepInput,
    CpfInput,
    FilterDentistsByLocation,
    SearchProducts,
    SelectInput,
    SimpleInput,
    TelefoneInput,
    TipoTabelaSelect,
} from "./Inputs";
import "../styles/Forms.css";
import { useTodosApi } from "./todosApiHook";
import { APIPostNewData } from "../Api";
import { FormErrorMsg } from "../App";

const UseForm = (formType, initialState, formElements) => {
    const [formData, setFormData] = useState(initialState);
    const [error, setError] = useState();
    const { errorMsg } = useContext(FormErrorMsg);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // newContentValidator(e);
    };
    useEffect(() => {
        // console.log(error, formElements);
        const handleFormElementErrors = () => {
            const lstMsg = {};
            Array.from(formElements).forEach((e) => {
                // iterate Api error case response and
                //compare with the el id to check if has error
                error.forEach((erro) => {
                    if (e.id === erro.path) {
                        // save msg and element id
                        lstMsg[e.id] = erro.msg;
                    }
                });
                if (Object.keys(lstMsg).includes(e.id)) {
                    e.className = "invalid-form";
                } else {
                    e.className = "";
                }
            });
            return lstMsg;
        };

        if (Array.isArray(error)) {
            // iterate form elements inputs
            const errorObj = handleFormElementErrors();
            errorMsg[formData.category] = errorObj;
        }

        return setError(() => "");
    }, [error, formElements, formData.category, errorMsg]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiResponse = APIPostNewData(formData);
        // if valid is false active a pop-up
        //indicante the location of the error with .msg
        // and highlight the input using .path putting in class or something
        apiResponse.then((e) => {
            if (Object.keys(e).includes("errors")) {
                // console.log(e.errors);
                setError(e.errors);
            }
        });
    };
    return { formData, handleChange, handleSubmit };
};

export function FormLocal() {
    const ref = useRef();
    const { errorMsg } = useContext(FormErrorMsg);

    const nomeTag = { id: "nome", txt: "Nome do Local ou a Franquia" };
    const initState = {
        nome: "",
        endereço: "",
        cep: "",
        telefone: "",
        tabela: "",
        category: "local",
    };
    const { formData, handleChange, handleSubmit } = UseForm(
        "new",
        initState,
        ref.current
    );
    // useEffect(() => {
    //     console.log(msgError);
    // }, [msgError]);
    return (
        <form action="" ref={ref}>
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
                labelTxt={"Endereço"}
                value={formData.endereço}
                onChange={handleChange}
                msg={!errorMsg.local ? "" : errorMsg.local.endereço}
            />
            <CepInput
                value={formData.cep}
                onChange={handleChange}
                msg={!errorMsg.local ? "" : errorMsg.local.cep}
            />
            <TelefoneInput
                value={formData.telefone}
                onChange={handleChange}
                msg={!errorMsg.local ? "" : errorMsg.local.telefone}
            />
            <TipoTabelaSelect value={formData.tabela} onChange={handleChange} />
            <button onClick={handleSubmit} type="submit">
                Registrar
            </button>
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
        category: "dentista",
    };
    const ref = useRef();
    const { formData, handleChange, handleSubmit } = UseForm(
        "new",
        initialState
    );
    useEffect(() => {
        console.log(ref);
    }, [ref]);
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
            />
            <SimpleInput
                id={"sobrenome"}
                labelTxt={"Sobrenome"}
                value={formData.sobrenome}
                onChange={handleChange}
            />
            <TelefoneInput value={formData.telefone} onChange={handleChange} />
            <CpfInput value={formData.cpf} onChange={handleChange} />

            <SelectInput
                initialValue={formData.local}
                onChange={handleChange}
                category={"local"}
                labelTxt={"Local de Trabalho"}
            />
            <button onClick={handleSubmit} type="submit">
                Registrar
            </button>
        </form>
    );
}

export function FormProduct() {
    const initialState = {
        nome: "",
        valor_normal: "",
        valor_reduzido: "",
        category: "produto",
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
                labelTxt={"Nome"}
                value={formData.nome}
                onChange={handleChange}
            />
            <SimpleInput
                id={"valor_normal"}
                labelTxt={"Valor Normal"}
                value={formData.valor_normal}
                onChange={handleChange}
                type={"number"}
            />
            <SimpleInput
                id={"valor_reduzido"}
                labelTxt={"Valor Reduzido"}
                value={formData.valor_reduzido}
                onChange={handleChange}
                type={"number"}
            />

            <button onClick={handleSubmit} type="submit">
                Registrar
            </button>
        </form>
    );
}

export function FormService() {
    const initialState = {
        dentista: "",
        produto: "",
        local: "",
        paciente_nome: "",
        category: "servico",
    };
    const products = useTodosApi("produto");
    const [productInput, setProductInput] = useState([]);
    // console.log(products);
    const { formData, handleChange, handleSubmit } = UseForm(
        "new",
        initialState
    );

    const AdditionalProduct = () => {
        const key = uuidv4();
        setProductInput((previous) => {
            return [
                ...previous,
                <SearchProducts products={products} key={key} />,
            ];
        });
    };
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

            <SelectInput
                initialValue={formData.local}
                onChange={handleChange}
                category={"local"}
                labelTxt={"Local:"}
            />

            <FilterDentistsByLocation
                initialValue={formData.dentista}
                onChange={handleChange}
                dbId={formData.local}
            />
            <SearchProducts products={products} />
            {productInput.map((i) => i)}

            <button onClick={AdditionalProduct} type="button">
                Mais Produto
            </button>
            <button onClick={handleSubmit} type="submit">
                Registrar
            </button>
        </form>
    );
}
