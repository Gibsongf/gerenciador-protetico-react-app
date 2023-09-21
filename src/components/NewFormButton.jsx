import { createContext, useState } from "react";
import { FormDentist } from "./Form/FormDentist";
import { FormLocal } from "./Form/FormLocal";
import { FormProduct } from "./Form/FormProduct";
import { FormService } from "./Form/FormService";
import { ButtonClose } from "./Form/Buttons";
import PropTypes from "prop-types";

ButtonNewForm.propTypes = {
    type: PropTypes.string,
    tableUpdate: PropTypes.any,
};
export const NewFormContext = createContext({
    setClose: () => {},
    setTableUpdate: () => {},
});
export function ButtonNewForm({ type, tableUpdate }) {
    const [close, setClose] = useState(false);
    const [form, setForm] = useState();

    const selectedForm = () => {
        const obj = {
            dentista: (
                <FormDentist closeBtn={<ButtonClose setClose={setClose} />} />
            ),
            local: <FormLocal closeBtn={<ButtonClose setClose={setClose} />} />,
            serviço: (
                <FormService closeBtn={<ButtonClose setClose={setClose} />} />
            ),
            produto: (
                <FormProduct closeBtn={<ButtonClose setClose={setClose} />} />
            ),
        };
        return obj[type];
    };
    const Form = () => {
        return <>{form}</>;
    };
    const onClick = () => {
        setForm(() => selectedForm());
        setClose((e) => !e);
    };

    return (
        <div className="new-form-container">
            <NewFormContext.Provider
                value={{ setClose, setTableUpdate: tableUpdate }}
            >
                {close ? <Form /> : ""}
            </NewFormContext.Provider>
            <button onClick={onClick} className="new-form">
                Novo
            </button>
        </div>
    );
}
