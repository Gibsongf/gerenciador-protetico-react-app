import { useContext, useEffect, useState } from "react";
import { APIPostNewData, APIPutData } from "../../Api.js";
import { AppContext } from "../../App";
import {
    removeFormattedCpf,
    replaceUndefined,
    telephoneJustNumber,
    updateDentistServicesLocation,
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
                if (e) {
                    if (result[e.id]) {
                        e.className = "invalid-form";
                        errorMsg[e.id] = result[e.id];
                    } else if (Object.keys(result).length > 0) {
                        e.className = "";
                        errorMsg[e.id] = "";
                    }
                }
            });
        };
        if (formElements) {
            handleFormElementErrors();
        }
        return setResult(() => "");
    }, [result, formElements, errorMsg]);

    const callAPI = (arr) => {
        if (arr.errors) {
            setResult(arr.errors);
            return false;
        } else {
            setResult(arr);
            return true;
        }
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
        } else if (formData.category === "local") {
            data = telephoneJustNumber(formData);
        } else {
            data = formData;
        }

        const response = await whichAPI[type](data, initialState.dbId);

        if (type === "edit" && formData.category === "dentista") {
            // update all the current dentist services with the new location
            updateDentistServicesLocation(response.dentista);
        }
        clearErrorMsg();
        return callAPI(response);
    };
    return { formData, handleChange, handleSubmit, setFormData };
}
