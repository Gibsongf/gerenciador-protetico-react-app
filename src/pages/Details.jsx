import { useDetailsApi } from "../components/ApiHooks";
import { Details } from "../components/GenerateDetails";

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
    if (!data) {
        return <div className="loading">Carregando...</div>;
    }
    return <Details type={"servico"} data={data} setUpdate={setUpdate} />;
}
