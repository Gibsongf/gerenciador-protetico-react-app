import { createContext, useContext, useState } from "react";
import { FormDentist } from "./Form/FormDentist";
import { FormLocal } from "./Form/FormLocal";
import { FormProduct } from "./Form/FormProduct";
import { FormService } from "./Form/FormService";
import PropTypes from "prop-types";
import { PopUpEditContext } from "../pages/Todos";
import Icon from "@mdi/react";
import { mdiPencil } from "@mdi/js";
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
            dentista: <FormDentist />,
            local: <FormLocal />,
            serviço: <FormService />,
            produto: <FormProduct />,
        };
        return <>{obj[type]}</>;
    };

    const onClick = () => {
        //boolean that will allow the form  to show
        setShowForm((e) => !e);
    };

    return (
        <div className="new-form-container" style={{ justifySelf: "center" }}>
            <NewFormContext.Provider
                value={{ setClose: setShowForm, setTableUpdate: tableUpdate }}
            >
                {showForm ? <SelectedForm /> : ""}
            </NewFormContext.Provider>
            <button onClick={onClick} className="new-form">
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
            servico: <FormService initialState={initialState} />,
            produto: <FormProduct initialState={initialState} />,
        };
        return obj[type];
    };

    const onClick = () => {
        setForm(() => selectedForm());
        setShowForm((e) => !e);
    };

    return (
        <>
            {type === "servico" ? (
                <Icon
                    className="edit-icon"
                    title="edit-btn"
                    path={mdiPencil}
                    onClick={onClick}
                />
            ) : (
                <td onClick={onClick} id="edit">
                    {data.nome}
                </td>
            )}
        </>
    );
}
