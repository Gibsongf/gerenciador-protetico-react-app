import { useRef, useState } from "react";
import { ExcelLink } from "../Api";
import { useDetailsApi } from "../components/ApiHooks";
import { Details } from "../components/GenerateDetails";
import { stateDetails } from "../utils";

export function DentistaDetails() {
    const dbId = localStorage.getItem("dentistaID");
    const { data, setUpdate } = useDetailsApi("dentista", dbId);
    if (!data) {
        return <div className="loading">Carregando...</div>;
    }
    return <Details type={"dentista"} data={data} setUpdate={setUpdate} />;
}
export function LocalDetails() {
    const dbId = localStorage.getItem("localID");
    const { data, setUpdate } = useDetailsApi("local", dbId);
    if (!data) {
        return <div className="loading">Carregando...</div>;
    }
    return <Details type={"local"} data={data} setUpdate={setUpdate} />;
}
const MyComponent = () => {
    const handleExport = () => {
        // Make a GET request to the /export endpoint
        fetch("http://localhost:3000/api/export")
            .then((response) => response.blob())
            .then((blob) => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "exported_data.xlsx";
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            });
    };

    return (
        <div>
            <button onClick={handleExport}>Export to Excel</button>
        </div>
    );
};

export function ServiceDetails() {
    const dbId = localStorage.getItem("servicoID");
    const { data, setUpdate } = useDetailsApi("servico", dbId);
    const ref = useRef();
    const test = async () => {
        const blob = await ExcelLink();
        const downloadLink = document.createElement("a");
        console.log(data);
        downloadLink.download = "yey";
        downloadLink.href = URL.createObjectURL(blob);
        // downloadLink.click();
        URL.revokeObjectURL(downloadLink.href);
    };
    if (!data) {
        return <div className="loading">Carregando...</div>;
    }
    const { formState, infoContent } = stateDetails(data, "servico");

    return (
        <>
            <button onClick={test} type="button" className="export">
                Export
            </button>
            <Details type={"servico"} data={data} setUpdate={setUpdate} />
        </>
    );
}
