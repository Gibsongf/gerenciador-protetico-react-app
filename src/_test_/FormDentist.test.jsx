/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { APIPostNewData, APIPutData } from "../Api";
import { FormDentist } from "../components/Form/FormDentist";

const fakeLocal = [
    {
        _id: "local-1",
        nome: "Franco EIRELI",
        endereço: "333 Felícia Marginal",
        cep: "23147-272",
        telefone: "1174-0086",
        tabela: "Reduzido",
        __v: 0,
    },
    {
        _id: "local-2",
        nome: "Moraes LTDA",
        endereço: "1047 Luiza Alameda",
        cep: "63006-953",
        telefone: "5541-7666",
        tabela: "Normal",
        __v: 0,
    },
];
const dentist = {
    nome: "nome",
    sobrenome: "sobrenome",
    local: fakeLocal[0]._id,
    telefone: "40028922",
    cpf: "12345678910",
    category: "dentista",
    formType: "edit",
    _id: "some id",
    serviço: [],
};
vi.mock("../components/ApiHooks", () => {
    return {
        useTodosApi: vi.fn(() => {
            return fakeLocal;
        }),
    };
});
vi.mock("../Api", () => {
    return {
        APIPostNewData: vi.fn(() => {
            return {
                errors: "",
            };
        }),
        APIPutData: vi.fn(() => {
            return {
                errors: "",
                dentista: dentist,
            };
        }),
        APIGetServiceBy: vi.fn(() => {
            return dentist;
        }),
    };
});
//need to get id of some local and mock useForm return a local?
describe("Form Dentist component", () => {
    const expectFormElements = async (el) => {
        expect(el.nome.value).toBe(dentist.nome);
        expect(el.sobrenome.value).toBe(dentist.sobrenome);
        expect(el.telefone.value).toBe(dentist.telefone);
        expect(el.cpf.value).toBe(dentist.cpf);
    };

    //all useful elements of the form
    const getEl = () => {
        const nome = screen.getByLabelText("Nome:");
        const sobrenome = screen.getByLabelText("Sobrenome:");
        const telefone = screen.getByLabelText("Telefone");
        const cpf = screen.getByLabelText("CPF");
        const button = screen.getAllByRole("button")[1];
        return { nome, sobrenome, telefone, cpf, button };
    };

    const inputText = async (el, text, user) => {
        await user.dblClick(el);
        await user.keyboard(text);
    };
    it("renders correctly", () => {
        const { container } = render(<FormDentist />);
        const form = screen.getByRole("dentist-form");
        expect(container).toMatchSnapshot();
        expect(form).toBeInTheDocument();
    });
    it("register all input, submit form & call API", async () => {
        const user = userEvent.setup();
        render(<FormDentist />);

        const { nome, sobrenome, telefone, cpf, button } = getEl();
        const tabelaSelector = screen.getByLabelText("Local de Trabalho:");
        const header = screen.getByRole("heading", {
            name: "Registrar Novo Dentista",
        });
        await inputText(nome, dentist.nome, user);
        await inputText(sobrenome, dentist.sobrenome, user);
        await inputText(telefone, dentist.telefone, user);
        await inputText(cpf, dentist.cpf, user);
        await user.selectOptions(tabelaSelector, ["local-2"]);
        await user.click(button);

        //header without initialState
        expect(header.textContent).toBe("Registrar Novo Dentista");
        //inputs expected has values correctly
        expectFormElements({ nome, sobrenome, telefone, cpf });
        expect(tabelaSelector.value).toBe("local-2");
        //call the right API to put new data
        expect(APIPostNewData).toBeCalled();
    });
    it("Form edit mode, save data at right inputs", async () => {
        const user = userEvent.setup();
        const setUpdate = vi.fn();
        const setEdit = vi.fn();

        render(
            <FormDentist
                initialState={dentist}
                setEdit={setEdit}
                setUpdate={setUpdate}
            />
        );
        const header = screen.getByRole("heading", {
            name: "Editar Detalhes do Dentista",
        });
        const { nome, sobrenome, telefone, cpf, button } = getEl();
        const tabelaSelector = screen.getByLabelText("Local de Trabalho:");
        await user.click(button);

        //header with initialState
        expect(header.textContent).toBe("Editar Detalhes do Dentista");
        //inputs expected has values correctly
        expectFormElements({ nome, sobrenome, telefone, cpf });
        expect(tabelaSelector.value).toBe("local-1");

        //call the right API to update data
        expect(APIPutData).toBeCalled();
    });
    it("submit empty form, won't call API", async () => {
        const user = userEvent.setup();
        render(<FormDentist />);
        const { button } = getEl();
        await user.click(button);

        expect(APIPostNewData).not.toBeCalled();
    });
});
