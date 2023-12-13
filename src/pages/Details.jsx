import { useState } from "react";
import { useDetailsApi } from "../components/ApiHooks";
import { FormLocal } from "../components/Form/FormLocal";
import { Info, LocalDentistWorkers } from "../components/GenerateDetails";
import { Loading } from "../components/Loading";
import { stateDetails } from "../utils";
import { TableService } from "./Todos";
import { FormDentist } from "../components/Form/FormDentist";

export function DentistaDetails() {
    const [edit, setEdit] = useState(false);
    const dbId = localStorage.getItem("dentistaID");
    const { data, setUpdate } = useDetailsApi("dentista", dbId);
    if (!data) {
        return <Loading />;
    }
    const { formState, infoContent } = stateDetails(data, "dentista");
    return (
        <>
            {" "}
            <Info content={infoContent} setEdit={setEdit} />
            <TableService
                providedData={data}
                setUpdateTable={setUpdate}
                isDetails={true}
            />
            {edit && (
                <FormDentist
                    initialState={formState}
                    setUpdate={setUpdate}
                    setEdit={setEdit}
                />
            )}
        </>
    );
}
export function LocalDetails() {
    const dbId = localStorage.getItem("localID");
    const { data, setUpdate } = useDetailsApi("local", dbId);
    const [edit, setEdit] = useState(false);
    if (!data) {
        return <Loading />;
    }
    const { formState, infoContent } = stateDetails(data, "local");

    return (
        <>
            {" "}
            <Info content={infoContent} setEdit={setEdit} />
            <LocalDentistWorkers data={data} />
            {edit && (
                <FormLocal
                    initialState={formState}
                    setUpdate={setUpdate}
                    setEdit={setEdit}
                />
            )}
        </>
    );
}
