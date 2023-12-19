import { useEffect, useState } from "react";
import { APIDetails, APIGetServiceBy, APItodos } from "../Api.js";

// API GET all available data of provide category and return it
export function useTodosApi(category, forTable) {
    const [data, setData] = useState();
    const [tableUpdate, setTableUpdate] = useState(false);
    useEffect(() => {
        const fetchingData = async () => {
            try {
                const result = await APItodos(category);
                setData(() => result.all);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchingData();
    }, [category, tableUpdate]);
    if (forTable) {
        return { data, setTableUpdate };
    } else {
        return data;
    }
}
// API GET data of provide id, category and return it
export function useDetailsApi(category, id) {
    const [data, setData] = useState();
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        const fetchingData = async () => {
            try {
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

// GET data by =(Local or Dentist) with id
export function useGetServiceBy(id, by) {
    const [data, setData] = useState();
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        const fetchingData = async () => {
            try {
                const result = await APIGetServiceBy(id, by);
                setData(() => result.serviço);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        if (id) {
            fetchingData();
        }
    }, [id, by, update]);
    return { data, setUpdate };
}
