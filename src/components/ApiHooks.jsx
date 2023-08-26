import { useEffect, useState } from "react";
import { APIDetails, APItodos } from "../Api";

export function useTodosApi(category) {
    const [data, setData] = useState();
    useEffect(() => {
        const fetchingData = async () => {
            try {
                console.log("fetch data 'todos' category:" + category);
                const result = await APItodos(category);
                // console.log(result);
                setData(() => result.all);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchingData();
    }, [category]);
    return data;
}
const formatCpf = (cpf) => {
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
const detailsDentistaObj = (data) => {
    const { nome, sobrenome, cpf, telefone, local } = data.dentista;
    return {
        nome,
        sobrenome,
        cpf: formatCpf(cpf),
        telefone,
        local: local._id,
        category: "dentista",
        formType: "edit",
        dbId: data.dentista._id,
    };
};
export function useDetailsApi(category, id) {
    const [data, setData] = useState();
    // const whichObj = () => {};
    // console.log(category, id);
    useEffect(() => {
        const fetchingData = async () => {
            try {
                console.log("fetch data details");
                const result = await APIDetails(category, id);
                // console.log(result);
                setData(() => result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        if (id) {
            // console.log(id);
            fetchingData();
        }
    }, [category, id]);
    return data;
}
