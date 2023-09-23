import { createContext, useContext, useState } from "react";
import { FormDentist } from "./Form/FormDentist";
import { FormLocal } from "./Form/FormLocal";
import { FormProduct } from "./Form/FormProduct";
import { FormService } from "./Form/FormService";
import { ButtonClose } from "./Form/Buttons";
import PropTypes from "prop-types";
import { AllProductsContext } from "../pages/Todos";

ButtonNewForm.propTypes = {
    type: PropTypes.string,
    tableUpdate: PropTypes.any,
};
export const NewFormContext = createContext({
    setClose: () => {},
    setTableUpdate: () => {},
});
export function ButtonNewForm({ type, tableUpdate }) {
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState();

    const selectedForm = () => {
        const obj = {
            dentista: (
                <FormDentist
                    closeBtn={<ButtonClose setClose={setShowForm} />}
                />
            ),
            local: (
                <FormLocal closeBtn={<ButtonClose setClose={setShowForm} />} />
            ),
            serviço: (
                <FormService
                    closeBtn={<ButtonClose setClose={setShowForm} />}
                />
            ),
            produto: (
                <FormProduct
                    closeBtn={<ButtonClose setClose={setShowForm} />}
                />
            ),
        };
        return obj[type];
    };
    const Form = () => {
        return <>{form}</>;
    };
    const onClick = () => {
        // call a state that store the form to render
        setForm(() => selectedForm());
        //boolean that will allow the form  to show
        setShowForm((e) => !e);
    };

    return (
        <div className="new-form-container">
            <NewFormContext.Provider
                value={{ setClose: setShowForm, setTableUpdate: tableUpdate }}
            >
                {showForm ? <Form /> : ""}
            </NewFormContext.Provider>
            <button onClick={onClick} className="new-form">
                Novo
            </button>
        </div>
    );
}
export function ButtonEditForm({ type, data }) {
    // console.log(data);
    const initialState = {
        nome: data.nome,
        valor_normal: data.valor_normal,
        valor_reduzido: data.valor_reduzido,
        category: "produto",
        formType: "edit",
        dbId: data._id,
    };
    const { setShowForm, setForm } = useContext(AllProductsContext);
    const selectedForm = () => {
        const obj = {
            serviço: (
                <FormService
                    initialState={data}
                    closeBtn={<ButtonClose setClose={setShowForm} />}
                />
            ),
            produto: (
                <FormProduct
                    initialState={initialState}
                    closeBtn={<ButtonClose setClose={setShowForm} />}
                />
            ),
        };
        return obj[type];
    };

    const onClick = () => {
        setForm(() => selectedForm());
        setShowForm((e) => !e);
    };

    return <td onClick={onClick}>{data.nome}</td>;
}
