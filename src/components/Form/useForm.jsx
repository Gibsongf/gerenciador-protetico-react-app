import { useContext, useEffect, useState } from "react";
import { APIPostNewData } from "../../Api";
import { FormErrorMsg } from "../../App";

export function useForm(formType, initialState, formElements, produtoKeys) {
    const [formData, setFormData] = useState(initialState);
    const [result, setResult] = useState({});
    const { errorMsg } = useContext(FormErrorMsg);
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

    const formatProduct = () => {
        const product = produtoKeys.map((k) => formData[k]);
        const obj = { ...formData };
        produtoKeys.forEach((k) => delete obj[k]);
        obj.produto = product;
        return obj;
    };
    const callAPI = (data) => {
        APIPostNewData(data).then((e) => {
            //console.log(e);
            if (Object.keys(e).includes("errors")) {
                setResult(e.errors);
            } else {
                setResult(e);
            }
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        let data;
        if (formData.category === "servico") {
            data = formatProduct();
            callAPI(data);
        } else {
            callAPI(formData);
        }
    };
    return { formData, handleChange, handleSubmit };
}
