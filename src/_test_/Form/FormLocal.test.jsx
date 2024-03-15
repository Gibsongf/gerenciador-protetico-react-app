/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { FormLocal } from "../../components/Form/FormLocal";
import { APIPostNewData, APIPutData } from "../../Api";
import { mockServiceData } from "../utilsTest";

//need to get id of some local and mock useForm return a local?
describe("Form Local component", () => {
    //all useful elements of the form
    const formInfo = mockServiceData.local[0];
    const expectFormElements = (el) => {
        expect(el.local.value).toBe(formInfo.nome);
        expect(el.endereço.value).toBe(formInfo["endereço"]);
        expect(el.cep.value).toBe(formInfo.cep);
        expect(el.telefone.value).toBe(formInfo.telefone);
    };
    const getEl = () => {
        const local = screen.getByLabelText("Nome do Local");
        const endereço = screen.getByLabelText("Endereço");
        const cep = screen.getByLabelText("Cep");
        const telefone = screen.getByLabelText("Telefone");
        const tabela = screen.getByLabelText("Tipo de Tabela");
        const button = screen.getAllByRole("button")[1];
        return { local, endereço, cep, telefone, tabela, button };
    };

    const inputText = async (el, text, user) => {
        await user.dblClick(el);
        await user.keyboard(text);
    };
    it("renders correctly", () => {
        const { container } = render(<FormLocal />);
        const form = screen.getByRole("local-form");
        expect(container).toMatchSnapshot();
        expect(form).toBeInTheDocument();
    });
    it("register all input, submit form & call API", async () => {
        const user = userEvent.setup();
        render(<FormLocal />);
        const { local, endereço, cep, telefone, button } = getEl();
        const header = screen.getByRole("heading");
        const tabelaSelector = screen.getByLabelText("Tipo de Tabela");

        await inputText(local, formInfo.nome, user);
        await inputText(endereço, formInfo["endereço"], user);
        await inputText(cep, formInfo.cep, user);
        await inputText(telefone, formInfo.telefone, user);
        await user.selectOptions(tabelaSelector, ["Reduzido"]);
        await user.click(button);

        //header without initialState
        expect(header.textContent).toBe("Registrar Novo Local");
        //input with expected values
        expectFormElements({ local, endereço, cep, telefone });
        expect(tabelaSelector.value).toBe("Reduzido");
        expect(APIPostNewData).toBeCalled();
    });
    it("Form edit mode, save data at right inputs", async () => {
        const user = userEvent.setup();
        const setUpdate = vi.fn();
        const setEdit = vi.fn();

        render(
            <FormLocal
                initialState={formInfo}
                setEdit={setEdit}
                setUpdate={setUpdate}
            />
        );
        const { local, endereço, cep, telefone, button } = getEl();
        const header = screen.getByRole("heading");
        await user.click(button);

        //input with expected values
        expectFormElements({ local, endereço, cep, telefone });
        //heading with initialState
        expect(header.textContent).toBe("Editar Detalhes do Local");
        //call api update data
        expect(APIPutData).toBeCalled();
        //when success
        //close the form element
        expect(setEdit).toBeCalled();
        //will update current page info
        expect(setUpdate).toBeCalled();
    });
    it("submit empty form, won't call API", async () => {
        const user = userEvent.setup();
        render(<FormLocal />);
        const { button } = getEl();
        await user.click(button);

        expect(APIPostNewData).not.toBeCalled();
    });
});
