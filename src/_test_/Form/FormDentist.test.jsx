/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { APIPostNewData, APIPutData } from "../../Api";
import { FormDentist } from "../../components/Form/FormDentist";
import { mockServiceData } from "../utilsTest";

describe("Form Dentist component", () => {
    const dentistaInfo = mockServiceData.dentista;
    const expectFormElements = async (el) => {
        expect(el.nome.value).toBe(dentistaInfo.nome);
        expect(el.sobrenome.value).toBe(dentistaInfo.sobrenome);
        expect(el.telefone.value).toBe(dentistaInfo.telefone);
        expect(el.cpf.value).toBe(dentistaInfo.cpf);
    };

    //all useful elements of the form
    const getEl = () => {
        const nome = screen.getByLabelText("Nome");
        const sobrenome = screen.getByLabelText("Sobrenome");
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
        const tabelaSelector = screen.getByLabelText("Local de Trabalho");
        const header = screen.getByRole("heading", {
            name: "Registrar Novo Dentista",
        });
        await inputText(nome, dentistaInfo.nome, user);
        await inputText(sobrenome, dentistaInfo.sobrenome, user);
        await inputText(telefone, dentistaInfo.telefone, user);
        await inputText(cpf, dentistaInfo.cpf, user);
        await user.selectOptions(tabelaSelector, ["local-1"]);
        await user.click(button);

        //header without initialState
        expect(header.textContent).toBe("Registrar Novo Dentista");
        //inputs expected has values correctly
        expectFormElements({ nome, sobrenome, telefone, cpf });
        expect(tabelaSelector.value).toBe("local-1");
        //call the right API to put new data
        expect(APIPostNewData).toBeCalled();
    });
    it("Form edit mode, save data at right inputs", async () => {
        const user = userEvent.setup();
        const setUpdate = vi.fn();
        const setEdit = vi.fn();

        render(
            <FormDentist
                initialState={dentistaInfo}
                setEdit={setEdit}
                setUpdate={setUpdate}
            />
        );
        const header = screen.getByRole("heading", {
            name: "Editar Detalhes do Dentista",
        });
        const { nome, sobrenome, telefone, cpf, button } = getEl();
        const tabelaSelector = screen.getByLabelText("Local de Trabalho");
        await user.click(button);

        //header with initialState
        expect(header.textContent).toBe("Editar Detalhes do Dentista");
        //inputs expected has values correctly
        expectFormElements({ nome, sobrenome, telefone, cpf });
        expect(tabelaSelector.value).toBe("local-0");

        //call the right API to update data
        expect(APIPutData).toBeCalled();
        //success
        //close the form element
        expect(setEdit).toBeCalled();
        //will update current page info
        expect(setUpdate).toBeCalled();
    });
    it("submit empty form, won't call API", async () => {
        const user = userEvent.setup();
        render(<FormDentist />);
        const { button } = getEl();
        await user.click(button);

        expect(APIPostNewData).not.toBeCalled();
    });
});
