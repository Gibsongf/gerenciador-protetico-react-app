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
    if (tel === undefined) {
        return;
    }
    if (tel.includes("-")) {
        return tel;
    }
    let arr = String(tel).split("");
    let splitIndex = Math.ceil(arr.length / 2);
    return `${arr.slice(0, splitIndex).toString().replaceAll(",", "")}-${arr
        .slice(splitIndex)
        .toString()
        .replaceAll(",", "")} `;
}

export function booleanToString(b) {
    if (b === true) {
        return "Sim";
    } else {
        return "Não";
    }
}
const fullName = (nome, sobrenome) => {
    if (!sobrenome) {
        return nome;
    } else {
        return `${nome} ${sobrenome}`;
    }
};
export function stateDetails(data, type) {
    const local = () => {
        // nome, endereço, cep, telefone,
        const { nome, endereço, cep, telefone } = data.local;
        const infoContent = {
            Nome: nome,
            Endereço: endereço,
            CEP: cep,
            Telefone: telefone,
            "Tipo de Tabela": data.local.tipo_tabela,
        };

        const formState = {
            nome,
            cep,
            endereço,
            telefone,
            category: "local",
            formType: "edit",
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

    const serviço = () => {
        const { statusEntrega } = data.serviço;
        const { nome, sobrenome, _id } = data.dentista;
        const infoContent = {
            Paciente: data.paciente,
            Dentista_nome: fullName(nome, sobrenome),
            produtos: data.produto,
            Entregado: statusEntrega,
        };
        const formState = {
            paciente_nome: data.paciente,
            dentista_nome: _id,
            produtos: data.produto,
            statusEntrega,
            category: "servico",
            formType: "edit",
            dbId: data.serviço._id,
        };
        return { infoContent, formState };
    };
    const obj = {
        serviço,
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

// data.sort(compare);
