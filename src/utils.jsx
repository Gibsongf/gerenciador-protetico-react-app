import { ExcelLink } from "./Api";

const exportExcel = async () => {
    // turn this to post http send data and receive excel file
    const blob = await ExcelLink(dbId);
    const downloadLink = document.createElement("a");
    // console.log(data);
    // downloadLink.download = "yey";
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.click();
    URL.revokeObjectURL(downloadLink.href);
};

export function formatCpf(cpf) {
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
}
export function formatTelefone(tel) {
    let separator = 4;
    if (tel === undefined) {
        return;
    }
    if (tel.includes("-")) {
        return tel;
    }
    if (tel.length > 8) {
        separator = 5;
    }
    return `${tel.substring(0, separator)}-${tel.substring(separator)} `;
}

export function booleanToString(b) {
    if (b === true) {
        return "Sim";
    } else {
        return "Não";
    }
}
export function fullName(nome, sobrenome) {
    if (!sobrenome) {
        return nome;
    } else {
        return `${nome} ${sobrenome}`;
    }
}
export function stateDetails(data, type) {
    const local = () => {
        const { nome, endereço, cep, telefone } = data.local;
        const infoContent = {
            Nome: nome,
            Endereço: endereço,
            CEP: cep,
            Telefone: telefone,
            Tabela: data.local.tabela,
        };

        const formState = {
            nome,
            cep,
            endereço,
            telefone,
            category: "local",
            formType: "edit",
            tabela: data.local.tabela,
            dbId: data.local._id,
        };
        return { infoContent, formState };
    };
    const dentista = () => {
        const { nome, sobrenome, cpf, telefone, local } = data.dentista;
        const infoContent = {
            Nome: fullName(nome, sobrenome),
            CPF: formatCpf(cpf),
            Telefone: formatTelefone(telefone),
            Franquia: local.nome,
            Endereço: local.endereço,
        };
        const formState = {
            nome,
            sobrenome,
            cpf: formatCpf(cpf),
            telefone,
            local: local._id,
            category: "dentista",
            formType: "edit",
            dbId: data.dentista._id,
        };
        return { infoContent, formState };
    };

    const servico = () => {
        const { statusEntrega, paciente } = data.serviço;
        const { nome, sobrenome, _id, local } = data.serviço.dentista;
        const produtoNomes = data.serviço.produto
            .map((p, indx) => {
                if (indx === 0) {
                    return p.nome;
                } else return " " + p.nome;
            })
            .toString();

        const infoContent = {
            Paciente: paciente,
            Dentista: fullName(nome, sobrenome),
            Produtos: produtoNomes,
            Finalizado: booleanToString(statusEntrega),
        };
        const formState = {
            paciente: paciente,
            dentista: _id, //just id to be pre-selected at select input
            local,
            produto: data.serviço.produto,
            statusEntrega,
            category: "servico",
            formType: "edit",
            dbId: data.serviço._id,
        };
        // console.log(data, formState);
        return { infoContent, formState };
    };
    const obj = {
        servico,
        local,
        dentista,
    };
    return obj[type]();
}

// sort normal ascending
export function sortBy(key, data) {
    const ascending = data.sort((a, b) =>
        a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0
    );
    const descending = data.sort((a, b) =>
        a[key] < b[key] ? 1 : b[key] < a[key] ? -1 : 0
    );
    return { ascending, descending };
}
