import { useEffect, useState } from "react";
import { APIDetails, APItodos } from "../Api";

export function useTodosApi(category) {
    const [data, setData] = useState();
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
    }, [category]);
    return data;
}

export function useDetailsApi(category, id) {
    const [data, setData] = useState();
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        const fetchingData = async () => {
            try {
                console.log("fetch data details");
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
