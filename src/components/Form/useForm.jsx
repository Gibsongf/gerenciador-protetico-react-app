import { useContext, useEffect, useState } from "react";
import { APIPostNewData, APIPutData } from "../../Api";
import { AppContext } from "../../App";
const formatCpf = (cpf) => {
    //123.456.789-09.
    //829.862.523-40
    let arr = String(cpf).split("");
    let a = arr.map((n, indx) => {
        if (indx === 2 || indx === 5) {
            return n + ".";
        }
        if (indx === 8) {
            return n + "-";
        }
        return n;
    });
    return a.toString().replaceAll(",", "");
};
const removeFormattedCpf = (cpf) => {
    return cpf.toString().replaceAll(".", "").replace("-", "");
};
const replaceUndefined = (obj) => {
    Object.keys(obj).forEach((k) => {
        if (obj[k] === undefined) {
            obj[k] = "";
        }
    });
};
export function useForm(initialState, formElements, produtoKeys) {
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
    const formatProduct = () => {
        const product = produtoKeys.map((k) => formData[k]);
        const obj = { ...formData };
        produtoKeys.forEach((k) => delete obj[k]);
        obj.produto = product;
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
            return;
        }
        if (formData.category === "dentista") {
            console.log("yoy");
            setFormData((prev) => {
                return { ...prev, [prev.cpf]: removeFormattedCpf(prev.cpf) };
            });
        }
        callAPI(formData);
    };
    return { formData, handleChange, handleSubmit };
}
