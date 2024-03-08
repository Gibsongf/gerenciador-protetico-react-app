export const testService = {
    paciente: "Meire Macedo",
    dentista: "dentista-1",
    local: "local-1",
    produto: [
        {
            _id: "65dd5ff530d103b5e6f12059",
            nome: "Sem marca Granito Teclado",
            valor_normal: 132,
            valor_reduzido: 66,
            __v: 0,
        },
        {
            _id: "65dd5ff530d103b5e6f12053",
            nome: "Ergonômico Madeira Queijo",
            valor_normal: 200,
            valor_reduzido: 67,
            __v: 0,
        },
    ],
    statusEntrega: false,
    category: "servico",
    formType: "edit",
    dbId: "65dd5ff530d103b5e6f12067",
};
export const testDentist = {
    nome: "first dentist",
    sobrenome: "first sobrenome",
    telefone: "89224002",
    cpf: "10987654321",
    category: "dentista",
    formType: "edit",
    _id: "first-dentist-id",
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
        dentistas: [testDentist2],
        __v: 0,
    },
];
