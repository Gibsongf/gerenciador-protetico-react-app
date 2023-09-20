import { createContext, useState } from "react";
import { FormDentist } from "./Form/FormDentist";
import { FormLocal } from "./Form/FormLocal";
import { FormProduct } from "./Form/FormProduct";
import { FormService } from "./Form/FormService";
import { ButtonClose } from "./Form/Buttons";

export const NewFormContext = createContext({
    setClose: () => {},
    setTableUpdate: () => {},
});
export function ButtonNewForm({ type, tableUpdate }) {
    const [close, setClose] = useState(false);
    const [form, setForm] = useState();

    const obj = {
        dentista: <FormDentist />,
        local: <FormLocal />,
        serviço: <FormService closeBtn={<ButtonClose setClose={setClose} />} />,
        produto: <FormProduct />,
    };
    const Form = () => {
        return <>{form}</>;
    };
    const onClick = () => {
        setForm(obj[type]);
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
