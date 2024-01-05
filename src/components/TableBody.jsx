import { Link } from "react-router-dom";
import { booleanToString, formatTelefone } from "../utils.js";
import { ButtonEditForm } from "./NewFormButton";
import { BtnDownloadToExcel } from "./Buttons";

export function DentistTableBody({ data }) {
    const saveDentistId = (e) => {
        localStorage.setItem("dentistaID", e.target.id);
    };
    const saveLocalId = (e) => {
        localStorage.setItem("localID", e.target.id);
    };
    return data.map((d) => {
        return (
            <tr key={d._id}>
                <td>
                    <Link
                        className="link"
                        onClick={saveDentistId}
                        to={`/gerenciador-protetico-react-app/dentista/${d._id}`}
                        id={d._id}
                    >
                        {d.nome} {d.sobrenome}{" "}
                    </Link>
                </td>
                <td>{formatTelefone(d.telefone)}</td>

                <td>
                    <Link
                        className="link"
                        onClick={saveLocalId}
                        to={`/gerenciador-protetico-react-app/local/${d.local._id}`}
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
                    <Link
                        className="link"
                        onClick={saveDbId}
                        id={d._id}
                        to={`/gerenciador-protetico-react-app/local/${d._id}`}
                    >
                        {d.nome}
                    </Link>
                </td>
                <td>{formatTelefone(d.telefone)}</td>
                <td>{d.endereço}</td>
                <td>{d.tabela}</td>
            </tr>
        );
    });
}

export function ProductTableBody({ data }) {
    return data.map((d, i) => {
        return (
            <tr key={d.nome + i}>
                <ButtonEditForm type="produto" data={d} />
                <td>R$ {d.valor_normal}</td>
                <td>R$ {d.valor_reduzido}</td>
            </tr>
        );
    });
}

export function ServiceTableBody({ data, sortDate }) {
    const saveDentistId = (e) => {
        localStorage.setItem("dentistaID", e.target.id);
    };

    return data.map((d, index) => {
        if (
            sortDate &&
            d.dataRegistro.split("-")[1] !== sortDate.split("-")[1]
        ) {
            return;
        }
        return (
            <tr key={d.dentista.nome + index}>
                <td>
                    <Link
                        className="link"
                        onClick={saveDentistId}
                        to={`/gerenciador-protetico-react-app/dentista/${d.dentista._id}`}
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
                {/* <td>{booleanToString(d.statusEntrega)}</td> */}
                <ButtonEditForm type="servico" data={d} />
                <td>
                    <BtnDownloadToExcel data={d} />
                </td>
            </tr>
        );
    });
}
