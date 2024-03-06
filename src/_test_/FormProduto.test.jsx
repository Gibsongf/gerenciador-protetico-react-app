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
    it.only("register all input, submit form & call API", async () => {
        const user = userEvent.setup();
        render(<FormProduct />);
        const { nome, valorNormal, valorReduzido, button } = getEl();
        const header = screen.getByRole("heading");

        await inputText(nome, "produto", user);
        await inputText(valorNormal, "455", user);
        await inputText(valorReduzido, "100", user);
        await user.click(button);
        console.log(header.textContent);
        expect(header).toBeInTheDocument();
        expect(nome.value).toBe("produto");
        expect(valorNormal.value).toBe("455");
        expect(valorReduzido.value).toBe("100");
        expect(APIPostNewData).toBeCalled();
    });
    it("Form edit mode, save data at right inputs", async () => {
        const user = userEvent.setup();
        const setUpdate = vi.fn();
        const setEdit = vi.fn();

        render(
            <FormProduct
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
        //heading changes with initialState
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
        render(<FormProduct />);
        const { button } = getEl();
        await user.click(button);

        //confirm that the API was called once in the previous test
        expect(APIPostNewData).toBeCalledTimes(0);
    });
});
