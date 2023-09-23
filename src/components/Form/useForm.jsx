import { useContext, useEffect, useState } from "react";
import { APIPostNewData, APIPutData } from "../../Api";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";

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
    const callAPI = (arr) => {
        if (Object.keys(arr).includes("errors")) {
            setResult(arr.errors);
            return false;
        } else {
            setResult(arr);
            return true;
            // nav("/");
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const type = initialState.formType;
        const whichAPI = { new: APIPostNewData, edit: APIPutData };
        let data;
        if (formData.category === "dentista") {
            data = removeFormattedCpf();
            const response = await whichAPI[type](data, initialState.dbId);
            return callAPI(response);
        }
        const response = await whichAPI[type](formData, initialState.dbId);
        return callAPI(response);
    };
    return { formData, handleChange, handleSubmit, setFormData };
}
