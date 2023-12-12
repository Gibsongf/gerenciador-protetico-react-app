import { createContext, useContext, useState } from "react";
import { FormDentist } from "./Form/FormDentist";
import { FormLocal } from "./Form/FormLocal";
import { FormProduct } from "./Form/FormProduct";
import { FormService } from "./Form/FormService";
import { ButtonClose } from "./Buttons";
import PropTypes from "prop-types";
import { PopUpEditContext } from "../pages/Todos";

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
    // const [form, setForm] = useState(false);

    const SelectedForm = () => {
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
        return <>{obj[type]}</>;
    };
    // const Form = () => {
    //     return <>{form}</>;
    // };
    const onClick = () => {
        // call a state that store the form to render
        // setForm((e) => !e);
        //boolean that will allow the form  to show
        setShowForm((e) => !e);
    };
    const btnStyle = {
        fontSize: "1.1em",
        fontWeight: "bold",
        padding: "10px",
        borderRadius: "15px",
    };
    return (
        <div className="new-form-container" style={{ justifySelf: "center" }}>
            <NewFormContext.Provider
                value={{ setClose: setShowForm, setTableUpdate: tableUpdate }}
            >
                {showForm ? <SelectedForm /> : ""}
            </NewFormContext.Provider>
            <button onClick={onClick} style={btnStyle} className="new-form">
                Novo{" "}
                {type.toLowerCase().replace(type[0], type[0].toUpperCase())}
            </button>
        </div>
    );
}
ButtonEditForm.propTypes = {
    type: PropTypes.string,
    data: PropTypes.any,
};

const formatToForm = (type, data) => {
    const produto = () => {
        return {
            nome: data.nome,
            valor_normal: data.valor_normal,
            valor_reduzido: data.valor_reduzido,
            category: "produto",
            formType: "edit",
            dbId: data._id,
        };
    };
    const servico = () => {
        return {
            paciente: data.paciente,
            dentista: data.dentista._id,
            local: data.local,
            produto: data.produto,
            statusEntrega: data.statusEntrega,
            category: "servico",
            formType: "edit",
            dbId: data._id,
        };
    };
    const whichType = {
        servico,
        produto,
    };
    return whichType[type]();
};
export function ButtonEditForm({ type, data }) {
    const { setShowForm, setForm } = useContext(PopUpEditContext);
    const initialState = formatToForm(type, data);
    const selectedForm = () => {
        const obj = {
            servico: (
                <FormService
                    initialState={initialState}
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

    return (
        <td className="edit-td" onClick={onClick}>
            {type === "servico" ? "Editar" : data.nome}
        </td>
    );
}
