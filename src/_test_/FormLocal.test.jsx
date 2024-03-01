/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { HashRouter } from "react-router-dom";
import { FormLocal } from "../components/Form/FormLocal";

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
            };
        }),
    };
});
//need to get id of some local and mock useForm return a local?
describe("Form Local component", () => {
    const getEl = () => {
        const local = screen.getByLabelText("Nome do Local:");
        const endereço = screen.getByLabelText("Endereço:");
        const cep = screen.getByLabelText("Cep");
        const telefone = screen.getByLabelText("Telefone");
        const tabela = screen.getByLabelText("Tipo de Tabela");
        const button = screen.getByRole("button", { name: "Registrar" });
        return { local, endereço, cep, telefone, tabela, button };
    };

    const inputText = async (el, text, user) => {
        await user.dblClick(el);
        await user.keyboard(text);
    };
    //render right
    it("renders correctly", () => {
        const { container } = render(<FormLocal />);
        const form = screen.getByRole("local-form");
        expect(container).toMatchSnapshot();
        expect(form).toBeInTheDocument();
    });
    it("register input", async () => {
        const user = userEvent.setup();
        render(<FormLocal />);
        const { local, endereço, cep, telefone, button } = getEl();
        await inputText(local, "local", user);
        await inputText(endereço, "endereço", user);
        await inputText(cep, "13344635", user);
        await inputText(telefone, "40028922", user);
        await user.click(button);
        expect(local.value).toBe("local");
        expect(endereço.value).toBe("endereço");
        expect(cep.value).toBe("13344635");
        expect(telefone.value).toBe("40028922");
    });
    //legend changes with initialState or without it
    //mock useForm handle submit
    //close button
    //load the right value when there is initialState
    //the error message is showed correct
});
