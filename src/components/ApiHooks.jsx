import { useEffect, useState } from "react";
import { APIDetails, APIGetServiceBy, APItodos } from "../Api.js";

export function useTodosApi(category, forTable) {
    const [data, setData] = useState();
    const [tableUpdate, setTableUpdate] = useState(false);
    useEffect(() => {
        const fetchingData = async () => {
            try {
                // console.log("yey");
                const result = await APItodos(category);
                setData(() => result.all);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchingData();
        // console.log(tableUpdate);
    }, [category, tableUpdate]);
    if (forTable) {
        return { data, setTableUpdate };
    } else {
        return data;
    }
}

export function useDetailsApi(category, id) {
    const [data, setData] = useState();
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        const fetchingData = async () => {
            try {
                // console.log("fetch data details");
                const result = await APIDetails(category, id);
                setData(() => result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        if (id) {
            fetchingData();
        }
    }, [category, id, update]);
    return { data, setUpdate };
}

export function useGetServiceBy(id, by) {
    const [data, setData] = useState();
    // const [update, setUpdate] = useState(false);
    useEffect(() => {
        const fetchingData = async () => {
            try {
                // console.log("fetch data details");
                const result = await APIGetServiceBy(id, by);
                // console.log(result);
                setData(() => result.serviço);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        if (id) {
            fetchingData();
        }
    }, [id, by]);
    return data;
}
