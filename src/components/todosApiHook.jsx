import { useEffect, useState } from "react";
import { APItodos } from "../Api";

export function useTodosApi(category) {
    const [data, setData] = useState();
    useEffect(() => {
        const fetchingData = async () => {
            try {
                console.log("fetch data");
                const result = await APItodos(category);
                console.log(result);
                setData(result.all);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchingData();
    }, [category]);
    return data;
}
