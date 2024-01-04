import { Link } from "react-router-dom";
import { booleanToString, formatTelefone } from "../utils.js";
import { ButtonEditForm } from "./NewFormButton";
import { BtnDownloadToExcel } from "./Buttons";

export function DentistDivTodos({ data }) {
    const saveDentistId = (e) => {
        localStorage.setItem("dentistaID", e.target.id);
    };
    const saveLocalId = (e) => {
        localStorage.setItem("localID", e.target.id);
    };
    return data.map((d) => {
        return (
            <div className="dentists-container" key={d._id}>
                <p>
                    <Link
                        className="link"
                        onClick={saveDentistId}
                        to={`/gerenciador-protetico-react-app/dentista/${d._id}`}
                        id={d._id}
                    >
                        {d.nome} {d.sobrenome}{" "}
                    </Link>
                </p>
                <p>
                    <strong>Telefone:</strong> {formatTelefone(d.telefone)}
                </p>
                <p>
                    {" "}
                    <strong>Endereço: </strong>
                    <Link
                        className="link"
                        onClick={saveLocalId}
                        to={`/gerenciador-protetico-react-app/local/${d.local._id}`}
                        id={d.local._id}
                    >
                        {d.local.nome}
                    </Link>
                </p>
            </div>
        );
    });
}

export function LocalTableBody({ data }) {
    const saveDbId = (e) => {
        localStorage.setItem("localID", e.target.id);
    };
    return data.map((d) => {
        return (
            <div className="dentists-container" key={d._id}>
                <p>
                    <strong>Nome: </strong>
                    <Link
                        className="link"
                        onClick={saveDbId}
                        id={d._id}
                        to={`/gerenciador-protetico-react-app/local/${d._id}`}
                    >
                        {d.nome}
                    </Link>
                </p>
                <p>
                    <strong>Telefone: </strong>
                    {formatTelefone(d.telefone)}
                </p>
                <p>
                    <strong>Endereço: </strong>
                    {d.endereço}
                </p>
                <p>
                    <strong>Tabela: </strong>
                    {d.tabela}
                </p>
            </div>
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
            <div className="service-container" key={d.dentista.nome + index}>
                <p className="header-container">
                    <Link
                        className="link"
                        onClick={saveDentistId}
                        to={`/gerenciador-protetico-react-app/dentista/${d.dentista._id}`}
                        id={d.dentista._id}
                    >
                        {d.dentista.nome} {d.dentista.sobrenome}
                    </Link>
                    <ButtonEditForm type="servico" data={d} />
                </p>
                <p>
                    <strong>Paciente: </strong>
                    {d.paciente}
                </p>
                <p>
                    <strong>Produto: </strong>
                    {d.produto.length > 1
                        ? d.produto.map((produto) => produto.nome + ", ")
                        : d.produto[0].nome}
                </p>
                <p>
                    <strong>Finalizado: </strong>
                    {booleanToString(d.statusEntrega)}
                </p>

                {/* <td> */}
                <p className="download-excel">
                    <BtnDownloadToExcel data={d} />
                </p>
            </div>
        );
    });
}
