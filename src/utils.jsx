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
