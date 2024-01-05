import { Link } from "react-router-dom";
import { BtnDownloadToExcel } from "./Buttons";
import { ButtonEditForm } from "./NewFormButton";
import { booleanToString } from "../utils";

export function ServiceTodosDiv({ data, sortDate }) {
    const saveDentistId = (e) => {
        localStorage.setItem("dentistaID", e.target.id);
    };

    return data.map((d, index) => {
        if (sortDate && d.dataRegistro.split("-")[1] !== sortDate) {
            return;
        }

        return (
            <div className="service-container" key={d.dentista.nome + index}>
                <div className="header-container">
                    <p>
                        <strong>Dentista: </strong>
                        <Link
                            className="link"
                            onClick={saveDentistId}
                            to={`/gerenciador-protetico-react-app/dentista/${d.dentista._id}`}
                            id={d.dentista._id}
                        >
                            {d.dentista.nome} {d.dentista.sobrenome}
                        </Link>
                    </p>
                    <ButtonEditForm type="servico" data={d} />
                </div>
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
                {/* <p className="download-excel"> */}
                <BtnDownloadToExcel data={d} />
                {/* </p> */}
            </div>
        );
    });
}
