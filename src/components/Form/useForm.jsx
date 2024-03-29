import { useContext, useEffect, useState } from "react";
import { APIGetServiceBy, APIPostNewData, APIPutData } from "../../Api.js";
import { AppContext } from "../../App";
import {
    removeFormattedCpf,
    replaceUndefined,
    telephoneJustNumber,
} from "../../utils.js";

export function useForm(initialState, formElements) {
    replaceUndefined(initialState);
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

    const callAPI = (arr) => {
        if (Object.keys(arr).includes("errors")) {
            setResult(arr.errors);
            return false;
        } else {
            setResult(arr);
            return true;
        }
    };

    // When a change occurs in a dentist's location of work,
    // update all that dentist services with the new location
    const updateDentistServicesLocation = async (dentista) => {
        const data = await APIGetServiceBy(dentista._id, "dentista");
        data.serviço.forEach(async (s) => {
            s.category = "servico";
            if (s.local !== dentista.local) {
                s.local = dentista.local;
                await APIPutData(s, s._id);
            }
        });
    };
    const clearErrorMsg = () => {
        Object.keys(errorMsg).forEach((k) => {
            errorMsg[k] = "";
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const type = initialState.formType;
        const whichAPI = { new: APIPostNewData, edit: APIPutData };
        let data;
        if (formData.category === "dentista") {
            data = removeFormattedCpf(formData);
            const response = await whichAPI[type](data, initialState.dbId);
            if (type === "edit") {
                updateDentistServicesLocation(response.dentista);
            }
            clearErrorMsg();
            return callAPI(response);
        }
        if (formData.category === "local") {
            data = telephoneJustNumber(formData);
            const response = await whichAPI[type](data, initialState.dbId);
            clearErrorMsg();
            return callAPI(response);
        }
        const response = await whichAPI[type](formData, initialState.dbId);
        clearErrorMsg();
        return callAPI(response);
    };
    return { formData, handleChange, handleSubmit, setFormData };
}
