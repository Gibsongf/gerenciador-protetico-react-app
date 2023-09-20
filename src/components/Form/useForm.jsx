import { useContext, useEffect, useState } from "react";
import { APIPostNewData, APIPutData } from "../../Api";
import { AppContext } from "../../App";
import { EditContext } from "../GenerateDetails";
import { useNavigate } from "react-router-dom";
import { NewFormContext } from "../NewFormButton";

const replaceUndefined = (obj) => {
    Object.keys(obj).forEach((k) => {
        if (obj[k] === undefined) {
            obj[k] = "";
        }
    });
};

export function useForm(initialState, formElements) {
    replaceUndefined(initialState);
    const nav = useNavigate();
    const [formData, setFormData] = useState(initialState);
    const [result, setResult] = useState({});
    const { errorMsg } = useContext(AppContext);
    const { setEdit, setUpdate } = useContext(EditContext);
    const { setClose, setTableUpdate } = useContext(NewFormContext);
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

    const removeFormattedCpf = () => {
        const obj = { ...formData };
        obj.cpf = obj.cpf.toString().replaceAll(".", "").replace("-", "");
        return obj;
    };
    const callAPI = (data) => {
        const type = initialState.formType;
        const whichAPI = { new: APIPostNewData, edit: APIPutData };

        whichAPI[type](data, initialState.dbId).then((e) => {
            //console.log(e);
            if (Object.keys(e).includes("errors")) {
                setResult(e.errors);
            } else {
                if (initialState.dbId) {
                    console.log("update");
                    setUpdate((e) => !e);
                    setEdit((e) => !e);
                }
                setResult(e);
                setTableUpdate((e) => !e);
                setClose((e) => !e);

                // nav("/");
            }
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        let data;
        if (formData.category === "servico") {
            callAPI(formData);
            return;
        }

        if (formData.category === "dentista") {
            console.log("yoy");
            data = removeFormattedCpf();
            callAPI(data);
            return;
        }
    };
    return { formData, handleChange, handleSubmit, setFormData };
}
