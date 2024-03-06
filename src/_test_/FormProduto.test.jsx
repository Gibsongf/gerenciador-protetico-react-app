/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { APIPostNewData, APIPutData } from "../Api";
import { FormProduct } from "../components/Form/FormProduct";

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
describe("Form Product component", () => {
    afterEach(() => {
        vi.clearAllMocks(); // Reset mocks after each test
    });
    const product = {
        nome: "test",
        valor_normal: "100",
        valor_reduzido: "50",
        category: "produto",
        formType: "edit",
    };

    const expectFormElements = async (el) => {
        expect(el.nome.value).toBe(product.nome);
        expect(el.valorNormal.value).toBe(product.valor_normal);
        expect(el.valorReduzido.value).toBe(product.valor_reduzido);
    };
    //all useful elements of the form
    const getEl = () => {
        const nome = screen.getByLabelText("Nome:");
        const valorNormal = screen.getByLabelText("Valor Normal:");
        const valorReduzido = screen.getByLabelText("Valor Reduzido:");
        const button = screen.getAllByRole("button")[1];
        return { nome, valorNormal, valorReduzido, button };
    };

    const inputText = async (el, text, user) => {
        await user.dblClick(el);
        await user.keyboard(text);
    };
    it("renders correctly", () => {
        const { container } = render(<FormProduct />);
        const form = screen.getByRole("product-form");
        expect(container).toMatchSnapshot();
        expect(form).toBeInTheDocument();
    });
    it("register all input, submit form & call API", async () => {
        const user = userEvent.setup();
        render(<FormProduct />);
        const { nome, valorNormal, valorReduzido, button } = getEl();
        await inputText(nome, product.nome, user);
        await inputText(valorNormal, product.valor_normal, user);
        await inputText(valorReduzido, product.valor_reduzido, user);
        await user.click(button);

        //inputs expected has values correctly
        expectFormElements({ nome, valorNormal, valorReduzido });

        //call the right API to put new data
        expect(APIPostNewData).toBeCalled();
    });
    it("Form edit mode, save data at right inputs", async () => {
        const user = userEvent.setup();

        render(<FormProduct initialState={product} />);
        const { nome, valorNormal, valorReduzido, button } = getEl();
        await user.click(button);

        //inputs expected has values correctly
        expectFormElements({ nome, valorNormal, valorReduzido });
        //call the right API to update data
        expect(APIPutData).toBeCalled();
    });
    it("submit empty form, won't call API", async () => {
        const user = userEvent.setup();
        render(<FormProduct />);
        const { button } = getEl();
        await user.click(button);

        expect(APIPostNewData).toBeCalledTimes(0);
    });
});
