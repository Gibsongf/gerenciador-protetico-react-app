import { createContext, useContext, useRef, useState } from "react";
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
export const RefContext = createContext({
    checkBoxRef: "",
});
export function FormService({ initialState }) {
    const { errorMsg } = useContext(AppContext);
    const [produtoKeys, setProdutoKeys] = useState(["produto"]);
    const ref = useRef();
    const checkBoxRef = useRef();
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
    const { formData, setFormData, handleChange, handleSubmit } = useForm(
        initialState,
        ref.current,
        produtoKeys
    );

    // use the ref context to filter the selected checkbox and
    //format to array and save to the form data
    const formatFilterProducts = () => {
        let el = Array.from(checkBoxRef.current.children);
        const boxIsChecked = el.filter((ele) => {
            if (ele.children[0].checked) {
                return ele;
            }
        });
        const boxValues = boxIsChecked.map(
            (checkbox) => checkbox.children[0].value
        );
        setFormData((prev) => {
            prev.produto = boxValues;
            return { ...prev };
        });
    };
    //before submit we format the product
    const handleProductSubmit = (e) => {
        e.preventDefault();
        if (checkBoxRef.current) {
            formatFilterProducts();
        }

        handleSubmit(e);
    };

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
                <RefContext.Provider value={{ checkBoxRef }}>
                    <SearchProducts
                        products={products}
                        name="produto"
                        onChange={handleChange}
                    />
                </RefContext.Provider>

                {/* {productInput.map((i) => i)}

                <button onClick={AdditionalProduct} type="button">
                    Mais Produto
                </button> */}
                <button onClick={handleProductSubmit} type="submit">
                    Registrar
                </button>
            </form>
        </div>
    );
}
