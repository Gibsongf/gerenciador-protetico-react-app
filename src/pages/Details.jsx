import { ExcelLink } from "../Api";
import { useDetailsApi } from "../components/ApiHooks";
import { Details } from "../components/GenerateDetails";
import { fullName } from "../utils";

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

export function ServiceDetails() {
    const dbId = localStorage.getItem("servicoID");
    const { data, setUpdate } = useDetailsApi("servico", dbId);

    const exportExcel = async () => {
        // turn this to post http send data and receive excel file
        const blob = await ExcelLink(dbId);
        const date = data.serviço.data_registro.split("T")[0];
        const { nome, sobrenome } = data.serviço.dentista;
        const fileName = `${nome}-${sobrenome}-${date}`;
        console.log(fileName);
        const downloadLink = document.createElement("a");
        // downloadLink.download = "yey";
        downloadLink.href = URL.createObjectURL(blob);
        // downloadLink.click();
        URL.revokeObjectURL(downloadLink.href);
    };
    if (!data) {
        return <div className="loading">Carregando...</div>;
    }

    return (
        <>
            <button onClick={exportExcel} type="button" className="export">
                Export
            </button>
            <Details type={"servico"} data={data} setUpdate={setUpdate} />
        </>
    );
}
