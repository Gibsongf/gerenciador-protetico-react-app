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
    const [result, setResult] = useState({});
    const { errorMsg } = useContext(FormErrorMsg);
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    useEffect(() => {
        const handleFormElementErrors = () => {
            Array.from(formElements).forEach((e) => {
                // iterate Api error case response and
                //compare with the el id to check if has error
                if (Object.keys(result).includes(e.id)) {
                    e.className = "invalid-form";
                    errorMsg[e.id] = result[e.id];
                } else if (Object.keys(result).length > 0) {
                    e.className = "";
                    errorMsg[e.id] = "";
                }
            });
        };
        if (formElements) {
            handleFormElementErrors();
        }
        return setResult(() => "");
    }, [result, formElements, errorMsg]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        APIPostNewData(formData).then((e) => {
            if (Object.keys(e).includes("errors")) {
                setResult(e.errors);
            } else {
                setResult(e);
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
            <TipoTabelaSelect value={formData.tabela} onChange={handleChange} />
            <button onClick={handleSubmit} type="submit">
                Registrar
            </button>
        </form>
    );
}
export function FormDentist() {
    const ref = useRef();
    const { errorMsg } = useContext(FormErrorMsg);

    const initialState = {
        nome: "",
        sobrenome: "",
        local: "",
        telefone: "",
        cpf: "",
        category: "dentista",
    };
    const { formData, handleChange, handleSubmit } = UseForm(
        "new",
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
