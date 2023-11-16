import { useContext, useEffect, useState } from "react";
import { APIGetServiceBy, APIPostNewData, APIPutData } from "../../Api";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useGetServiceBy } from "../ApiHooks";

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
            // if (e.target.name === "produto") {
            //     prev[e.target.name].push(e.target.value);
            //     return { ...prev };
            // }
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
        // console.log(arr);
        if (Object.keys(arr).includes("errors")) {
            setResult(arr.errors);
            return false;
        } else {
            setResult(arr);
            return true;
            // nav("/");
        }
    };

    // update the local for all provided dentist services
    const dentistLocalChange = async (dentista) => {
        const data = await APIGetServiceBy(dentista._id, "dentista");
        data.serviço.forEach(async (s) => {
            s.category = "servico";
            if (s.local !== dentista.local) {
                s.local = dentista.local;
                await APIPutData(s, s._id);
            }
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const type = initialState.formType;
        const whichAPI = { new: APIPostNewData, edit: APIPutData };
        let data;
        if (formData.category === "dentista") {
            data = removeFormattedCpf();
            const response = await whichAPI[type](data, initialState.dbId);
            if (type === "edit") {
                dentistLocalChange(response.dentista);
            }
            return callAPI(response);
        }
        const response = await whichAPI[type](formData, initialState.dbId);
        return callAPI(response);
    };
    return { formData, handleChange, handleSubmit, setFormData };
}
