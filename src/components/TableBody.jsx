import { Link } from "react-router-dom";
import { booleanToString } from "../utils";

export function DentistTableBody({ data }) {
    const saveDentistId = (e) => {
        localStorage.setItem("dentistaID", e.target.id);
    };
    const saveLocalId = (e) => {
        localStorage.setItem("localID", e.target.id);
    };
    console.log(data);
    return data.map((d) => {
        return (
            <tr key={d._id}>
                <td>
                    <Link
                        onClick={saveDentistId}
                        to={`/dentista/${d._id}`}
                        id={d._id}
                    >
                        {d.nome} {d.sobrenome}{" "}
                    </Link>
                </td>
                <td>{d.telefone}</td>

                <td>
                    <Link
                        onClick={saveLocalId}
                        to={`/local/${d.local._id}`}
                        id={d.local._id}
                    >
                        {d.local.nome}
                    </Link>
                </td>
            </tr>
        );
    });
}

export function LocalTableBody({ data }) {
    const saveDbId = (e) => {
        localStorage.setItem("localID", e.target.id);
    };
    return data.map((d) => {
        return (
            <tr key={d._id}>
                <td>
                    <Link onClick={saveDbId} id={d._id} to={`/local/${d._id}`}>
                        {d.nome}
                    </Link>
                </td>
                <td>{d.telefone}</td>
                <td>{d.endereço}</td>
                <td>{d.tipo_tabela}</td>
            </tr>
        );
    });
}

export function ProductTableBody({ data }) {
    return data.map((d) => {
        return (
            <tr key={d.nome}>
                <td>{d.nome}</td>
                <td>R$ {d.valor_normal}</td>
                <td>R$ {d.valor_reduzido}</td>
            </tr>
        );
    });
}

export function ServiceTableBody({ data }) {
    const saveDbId = (e) => {
        localStorage.setItem("dentistaID", e.target.id);
    };
    console.log(data);
    return data.map((d, index) => {
        // console.log(d._id);
        return (
            <tr key={d.dentista.nome + index}>
                <td>
                    <Link
                        onClick={saveDbId}
                        to={`/dentista/${d.dentista._id}`}
                        id={d.dentista._id}
                    >
                        {d.dentista.nome} {d.dentista.sobrenome}
                    </Link>
                </td>
                <td>{d.paciente}</td>
                <td>
                    {d.produto.length > 1
                        ? d.produto.map((produto) => produto.nome + ", ")
                        : d.produto[0].nome}
                </td>
                <td>{booleanToString(d.statusEntrega)}</td>
            </tr>
        );
    });
}
