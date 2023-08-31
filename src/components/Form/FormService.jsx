import { useContext, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import {
    FilterDentistsByLocation,
    SearchProducts,
    SelectInput,
    SimpleInput,
} from "../Inputs";
import PropTypes from "prop-types";
import "../../styles/Forms.css";
import { useTodosApi } from "../ApiHooks";
import { AppContext } from "../../App";
import { useForm } from "./useForm";

FormService.propTypes = {
    initialState: PropTypes.object,
};
export function FormService({ initialState }) {
    const { errorMsg } = useContext(AppContext);
    const [produtoKeys, setProdutoKeys] = useState(["produto"]);
    const ref = useRef();
    // console.log(initialState);
    if (!initialState) {
        initialState = {
            dentista: "",
            local: "",
            paciente_nome: "",
            category: "servico",
            formType: "new",
        };
    }
    const products = useTodosApi("produto");
    const [productInput, setProductInput] = useState([]);
    // //console.log(products);
    const { formData, handleChange, handleSubmit } = useForm(
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
        <div className="form-container">
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
                    data={formData.produto}
                />

                {/* {productInput.map((i) => i)}

                <button onClick={AdditionalProduct} type="button">
                    Mais Produto
                </button> */}
                <button onClick={handleSubmit} type="submit">
                    Registrar
                </button>
            </form>
        </div>
    );
}
