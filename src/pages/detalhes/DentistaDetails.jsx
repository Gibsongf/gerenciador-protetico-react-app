// DentistaDetails={
// 	nome sobrenome
//     cpf-hidden?      telefone
//     local
//     (edit, delete) btn
//     services requested
//       list services
import PropTypes from "prop-types";

import { createContext, useState } from "react";
import { useDetailsApi } from "../../components/ApiHooks";
import "../../styles/Details.css";
import { FormDentist } from "../../components/Form/FormDentist";
// }
// const fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
// const citrus = fruits.slice(1, 3);
const formatCpf = (cpf) => {
    //123.456.789-09.
    //829.862.523-40
    let arr = String(cpf).split("");
    let a = arr.map((n, indx) => {
        if (indx === 2 || indx === 5) {
            return n + ".";
        }
        if (indx === 8) {
            return n + "-";
        }
        return n;
    });
    return a.toString().replaceAll(",", "");
};
const formatTelefone = (tel) => {
    if (tel === undefined) {
        return;
    }
    let arr = String(tel).split("");
    let splitIndex = Math.ceil(arr.length / 2);
    return `${arr.slice(0, splitIndex).toString().replaceAll(",", "")}-${arr
        .slice(splitIndex)
        .toString()
        .replaceAll(",", "")} `;
};
const IdentidadeInfo = ({ data, setEdit }) => {
    const { nome, sobrenome, cpf, telefone, local } = data.dentista;
    const initialState = {
        nome,
        sobrenome: sobrenome,
        cpf: String(cpf),
        telefone: telefone,
        local: local._id,
        category: "dentista",
        formType: "edit",
        dbId: data.dentista._id,
    };
    // {data.dentista.nome,data.dentista.sobrenome},data.dentista.cpf,data.dentista.telefone,data.dentista.local.endereço}
    return (
        <div className="identidade">
            <p className="nome-sobrenome">
                <strong>Nome:</strong> {nome} {sobrenome}
            </p>
            <p>
                <strong>CPF:</strong> {formatCpf(cpf)}
            </p>
            <p>
                <strong>Telefone:</strong> {formatTelefone(telefone)}
            </p>
            <p className="endereço">
                <strong>Franquia:</strong> {local.nome}
            </p>
            <p className="endereço">
                <strong>Endereço:</strong> {local.endereço}
            </p>
            <button className="edit" onClick={() => setEdit((e) => !e)}>
                Editar
            </button>

            {/* <FormDentist initialState={initialState} /> */}
        </div>
    );
};
IdentidadeInfo.propTypes = {
    data: PropTypes.object,
};

export const EditContext = createContext({
    setEdit: () => {},
});

export function DentistaDetails() {
    const dbId = localStorage.getItem("dbID");
    const data = useDetailsApi("dentista", dbId);
    const [edit, setEdit] = useState(true);
    const booleanToString = (b) => {
        if (b === true) {
            return "Sim";
        } else {
            return "Não";
        }
    };
    // call apiDetailsuseDetailsApi
    //    let data = ("local", dbId);
    if (!data) {
        return <div className="loading">Carregando...</div>;
    }
    const initialState = () => {
        const { nome, sobrenome, cpf, telefone, local } = data.dentista;
        return {
            nome,
            sobrenome,
            cpf: formatCpf(cpf),
            telefone,
            local: local._id,
            category: "dentista",
            formType: "edit",
            dbId: data.dentista._id,
        };
    };
    // console.log(data);
    return (
        <>
            {" "}
            <EditContext.Provider value={{ setEdit }}>
                {edit ? (
                    <IdentidadeInfo data={data} setEdit={setEdit} />
                ) : (
                    <FormDentist initialState={initialState()} />
                )}
                <div className="serviço">
                    <table className="todos-table">
                        <caption>
                            <h4>Serviços Registrados</h4>
                        </caption>

                        <tbody>
                            <tr>
                                <th>Paciente</th>
                                <th>Produto</th>
                                <th>Entregado</th>
                            </tr>
                            {/* need to fix the not render of product name */}
                            {data.serviços
                                ? data.serviços.map((d, index) => {
                                      //   console.log(d);
                                      return (
                                          <tr key={index}>
                                              <td>{d.paciente}</td>
                                              <td>
                                                  {d.produto.map(
                                                      (produto) =>
                                                          produto.nome + ", "
                                                  )}
                                              </td>
                                              <td>
                                                  {booleanToString(
                                                      d.statusEntrega
                                                  )}
                                              </td>
                                          </tr>
                                      );
                                  })
                                : ""}
                        </tbody>
                    </table>
                </div>
            </EditContext.Provider>
        </>
    );
}
