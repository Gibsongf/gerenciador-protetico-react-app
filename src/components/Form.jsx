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

const useForm = (formType, initialState, formElements, produtoKeys) => {
    const [formData, setFormData] = useState(initialState);
    const [result, setResult] = useState({});
    const { errorMsg } = useContext(FormErrorMsg);
    const handleChange = (e) => {
        setFormData((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
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

    const formatProduct = () => {
        const product = produtoKeys.map((k) => formData[k]);
        const obj = { ...formData };
        produtoKeys.forEach((k) => delete obj[k]);
        obj.produto = product;
        return obj;
    };
    const callAPI = (data) => {
        APIPostNewData(data).then((e) => {
            //console.log(e);
            if (Object.keys(e).includes("errors")) {
                setResult(e.errors);
            } else {
                setResult(e);
            }
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        let data;
        if (formData.category === "servico") {
            data = formatProduct();
            callAPI(data);
        } else {
            callAPI(formData);
        }
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
    const { formData, handleChange, handleSubmit } = useForm(
        "new",
        initState,
        ref.current
    );
    // useEffect(() => {
    //     //console.log(msgError);
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
    const { formData, handleChange, handleSubmit } = useForm(
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

export function FormService() {
    const { errorMsg } = useContext(FormErrorMsg);
    const [produtoKeys, setProdutoKeys] = useState(["produto"]);
    const ref = useRef();

    const initialState = {
        dentista: "",
        local: "",
        paciente_nome: "",
        category: "servico",
    };
    const products = useTodosApi("produto");
    const [productInput, setProductInput] = useState([]);
    // //console.log(products);
    const { formData, handleChange, handleSubmit } = useForm(
        "new",
        initialState,
        ref.current,
        produtoKeys
    );

    const AdditionalProduct = () => {
        const key = uuidv4();
        setProductInput((previous) => {
            const name = "produto" + String(previous.length + 1);
            setProdutoKeys((prev) => [...prev, name]);
            return [
                ...previous,
                <SearchProducts
                    products={products}
                    onChange={handleChange}
                    key={key}
                    name={name}
                />,
            ];
        });
    };
    // //console.log(errorMsg);
    return (
        <form action="" ref={ref}>
            <legend>
                <h3>Registrar Novo Serviço</h3>
            </legend>
            <SimpleInput
                id={"paciente_nome"}
                labelTxt={"Nome do Paciente:"}
                value={formData.paciente_nome}
                onChange={handleChange}
                msg={!errorMsg ? "" : errorMsg.paciente_nome}
            />

            <SelectInput
                initialValue={formData.local}
                onChange={handleChange}
                category={"local"}
                labelTxt={"Local:"}
                msg={!errorMsg ? "" : errorMsg.local}
            />

            <FilterDentistsByLocation
                initialValue={formData.dentista}
                onChange={handleChange}
                dbId={formData.local}
                msg={!errorMsg ? "" : errorMsg.dentista}
            />
            <SearchProducts
                products={products}
                name="produto"
                onChange={handleChange}
            />
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
