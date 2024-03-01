/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { HashRouter } from "react-router-dom";
import { FormLocal } from "../components/Form/FormLocal";
import { APIPostNewData, APIPutData } from "../Api";

vi.mock("../Api", () => {
    return {
        APIPostNewData: vi.fn((e) => {
            // console.log(e);
            return {
                errors: "",
            };
        }),
        APIPutData: vi.fn((e) => {
            console.log(e);
            return {
                errors: "",
            };
        }),
    };
});
//need to get id of some local and mock useForm return a local?
describe("Form Local component", () => {
    //all useful elements of the form
    const formInfo = {
        nome: "local",
        endereço: "endereço",
        cep: "13344635",
        telefone: "40028922",
        formType: "edit",
        tabela: "Normal",
    };
    const getEl = () => {
        const local = screen.getByLabelText("Nome do Local:");
        const endereço = screen.getByLabelText("Endereço:");
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

        await inputText(local, formInfo.nome, user);
        await inputText(endereço, formInfo["endereço"], user);
        await inputText(cep, formInfo.cep, user);
        await inputText(telefone, formInfo.telefone, user);
        await user.click(button);

        expect(local.value).toBe(formInfo.nome);
        expect(endereço.value).toBe(formInfo["endereço"]);
        expect(cep.value).toBe(formInfo.cep);
        expect(telefone.value).toBe(formInfo.telefone);
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

        expect(local.value).toBe(formInfo.nome);
        expect(endereço.value).toBe(formInfo["endereço"]);
        expect(cep.value).toBe(formInfo.cep);
        expect(telefone.value).toBe(formInfo.telefone);
        expect(header.textContent).toBe("Editar Detalhes do Local");
        //call api update data
        expect(APIPutData).toBeCalled();
        //when success
        //close the form element
        expect(setEdit).toBeCalled();
        //will update current page local info
        expect(setUpdate).toBeCalled();
    });
    it("submit empty form, won't call API", async () => {
        const user = userEvent.setup();
        render(<FormLocal />);
        const { local, button } = getEl();
        await inputText(local, "local", user);
        await user.click(button);

        //confirm that the API was called once in the previous test
        expect(APIPostNewData).toBeCalledTimes(1);
    });
    //legend changes with initialState or without it
    //mock useForm handle submit
    //close button
    //load the right value when there is initialState
    //the error message is showed correct
});
