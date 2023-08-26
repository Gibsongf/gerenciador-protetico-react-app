import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { booleanToString } from "../utils";

export function Caption({ txt }) {
    Caption.propTypes = {
        txt: PropTypes.string,
    };
    return (
        <caption>
            <h4>{txt}</h4>
        </caption>
    );
}
export function TableRow({ rowNames }) {
    TableRow.propTypes = {
        rowNames: PropTypes.array,
    };
    return (
        <tr>
            {rowNames.map((name, index) => {
                return <th key={index + 10}>{name}</th>;
            })}
        </tr>
    );
}

export function DentistServiceList(props) {
    console.log(props.data);
    const { serviços } = props.data;
    const saveDentistId = (e) => {
        localStorage.setItem("dentistaID", e.target.id);
    };
    const saveServiceId = (e) => {
        localStorage.setItem("serviçoID", e.target.id);
    };
    return serviços.map((d, index) => {
        return (
            <tr key={index}>
                <td>
                    <Link
                        onClick={saveDentistId}
                        to={`/dentista/${props.data.dentista._id}`}
                        id={props.data.dentista._id}
                    >
                        {props.data.dentista.nome}{" "}
                        {props.data.dentista.sobrenome}{" "}
                    </Link>
                </td>
                <td>
                    <Link onClick={saveServiceId} to={`/servico/${d._id}`}>
                        {d.paciente}
                    </Link>
                </td>
                <td>{d.produto.map((produto) => produto.nome + ", ")}</td>
                <td>{booleanToString(d.statusEntrega)}</td>
            </tr>
        );
    });
}

// export function TableDentistService({ data }) {
//     const row = ["Dentista", "Paciente", "Produto", "Entregado"];
//     return (
//         <div className="serviço">
//             <table className="todos-table">
//                 <Caption txt={"Serviços Registrados"} />

//                 <tbody>
//                     <TableRow rowNames={row} />
//                     {/* need to fix the not render of product name */}
//                     {data.serviços ? <DentistServiceList data={data} /> : ""}
//                 </tbody>
//             </table>
//         </div>
//     );
// }
// TableDentistService.propTypes = {
//     data: PropTypes.object,
// };
