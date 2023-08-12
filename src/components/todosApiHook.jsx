import { useEffect, useState } from "react";
import { APIDetails, APItodos } from "../Api";

export function useTodosApi(category) {
    // console.log(category);
    const [data, setData] = useState();
    useEffect(() => {
        const fetchingData = async () => {
            try {
                console.log("fetch data 'todos'");
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
export function useDetailsApi(category, id) {
    const [data, setData] = useState();

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
