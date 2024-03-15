export const testProduct = {
    _id: "id-produto-1",
    nome: "produto-1",
    valor_normal: "100",
    valor_reduzido: "50",
    category: "produto",
    formType: "edit",
};
export const testService = {
    dentista: "first-dentist-id",
    local: "local-0",
    paciente: "Meire Macedo",
    category: "servico",
    formType: "edit",
    produto: [testProduct],
};
export const testDentist = {
    nome: "first dentist",
    sobrenome: "first sobrenome",
    telefone: "89224002",
    cpf: "10987654321",
    category: "dentista",
    formType: "edit",
    _id: "first-dentist-id",
    local: "local-0",
    serviço: [],
};
export const testDentist2 = {
    nome: "second dentist",
    sobrenome: "second sobrenome",
    telefone: "40028922",
    cpf: "12345678910",
    category: "dentista",
    formType: "edit",
    _id: "second-dentist-id",
    local: "local-1",
    serviço: [],
};
export const testLocal = [
    {
        _id: "local-0",
        nome: "Franco EIRELI",
        endereço: "333 Felícia Marginal",
        cep: "23147-272",
        telefone: "1174-0086",
        tabela: "Reduzido",
        formType: "edit",
        dentistas: [testDentist],
        __v: 0,
    },
    {
        _id: "local-1",
        nome: "Moraes LTDA",
        endereço: "1047 Luiza Alameda",
        cep: "63006-953",
        telefone: "5541-7666",
        tabela: "Normal",
        formType: "edit",
        dentistas: [testDentist2],
        __v: 0,
    },
];
export const mockServiceData = {
    produto: [
        {
            _id: "id-produto-1",
            nome: "produto-1",
            valor_normal: "100",
            valor_reduzido: "50",
            category: "produto",
            formType: "edit",
        },
        {
            nome: "produto-2",
            _id: "id-produto-2",
            valor_normal: "100",
            valor_reduzido: "50",
            category: "produto",
            formType: "edit",
        },
    ],
    local: testLocal,
    servico: {
        _id: "65dd5ff530d103b5e6f12067",
        dentista: {
            _id: "65dd5ff530d103b5e6f1205d",
            nome: "Benício",
            sobrenome: "Oliveira",
            local: "65dd5ff530d103b5e6f1205b",
            telefone: "5910-3548",
            cpf: 57246203537,
        },
        local: "65dd5ff530d103b5e6f1205b",
        paciente: "Meire Macedo",
        produto: [testProduct],
        statusEntrega: false,
    },
    dentista: testDentist,
};
// export const mockServiceData = {
//     'serviço':{
//         _id: "65dd5ff530d103b5e6f12067",
//         dentista: {
//             _id: "65dd5ff530d103b5e6f1205d",
//             nome: "Benício",
//             sobrenome: "Oliveira",
//             local: "65dd5ff530d103b5e6f1205b",
//             telefone: "5910-3548",
//             cpf: 57246203537,
//         },
//         local: "65dd5ff530d103b5e6f1205b",
//         paciente: "Meire Macedo",
//         produto: [
//             testProduct
//         ],
//         statusEntrega: false,
//     },
//     local:testLocal[0],
// }
