import { useDetailsApi } from "../components/ApiHooks";
import { Details } from "../components/GenerateDetails";
import { Loading } from "../components/Loading";

export function DentistaDetails() {
    const dbId = localStorage.getItem("dentistaID");
    const { data, setUpdate } = useDetailsApi("dentista", dbId);
    if (!data) {
        return <Loading />;
    }
    return <Details type={"dentista"} data={data} setUpdate={setUpdate} />;
}
export function LocalDetails() {
    const dbId = localStorage.getItem("localID");
    const { data, setUpdate } = useDetailsApi("local", dbId);

    if (!data) {
        return <Loading />;
    }
    return <Details type={"local"} data={data} setUpdate={setUpdate} />;
}
