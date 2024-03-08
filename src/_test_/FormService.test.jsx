/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { APIPostNewData, APIPutData } from "../Api";
import { FormService } from "../components/Form/FormService";
import { testLocal, testService } from "./utilsTest";

//need to pass api mock to another file from all form tests
const mockApiData = {
    produto: [
        {
            nome: "produto-1",
            _id: "id-produto-1",
        },
        {
            nome: "produto-2",
            _id: "id-produto-2",
        },
    ],
    local: testLocal,
};
vi.mock("../components/ApiHooks", () => {
    return {
        useTodosApi: vi.fn((e) => {
            if (e) {
                return mockApiData[e];
            }
            return testLocal;
        }),
        useDetailsApi: vi.fn((e, id) => {
            if (e) {
                if (e === "local" && id) {
                    const indx = Number(id.split("-")[1]);
                    return { data: mockApiData[e][indx] };
                }
                return mockApiData[e];
            }
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
            };
        }),
        APIGetServiceBy: vi.fn(() => {
            return;
        }),
    };
});

//need to get id of some local and mock useForm return a local?
describe("Form Dentist component", () => {
    //all useful elements of the form
    const expectFormElements = (el) => {
        expect(el.paciente.value).toBe(testService.paciente);
        expect(el.local.value).toBe(testService.local);
        expect(el.dentista.value).toBe(testService.dentista);
        expect(el.checkBoxProduct.value).toBe(mockApiData.produto[0]._id);
    };
    const getEl = () => {
        const paciente = screen.getByLabelText("Nome do Paciente:");
        const local = screen.getByLabelText("Local:");
        const dentista = screen.getByLabelText("Dentistas:");
        const produto = screen.getByLabelText("Produto:");
        const btnConfirmProduct = screen.getByRole("button", {
            name: "Selecionar Produto",
        });
        const submit = screen.getAllByRole("button")[2];
        return {
            paciente,
            local,
            dentista,
            produto,
            btnConfirmProduct,
            submit,
        };
    };

    const inputText = async (el, text, user) => {
        await user.dblClick(el);
        await user.keyboard(text);
    };
    it("renders correctly", () => {
        const { container } = render(<FormService />);
        const form = screen.getByRole("service-form");
        expect(container).toMatchSnapshot();
        expect(form).toBeInTheDocument();
    });
    it("register all input, submit form & call API", async () => {
        const user = userEvent.setup();
        render(<FormService />);

        const { paciente, local, dentista, btnConfirmProduct, submit } =
            getEl();
        const header = screen.getByRole("heading", {
            name: "Registrar Novo Serviço",
        });
        const optionProduct = screen.getAllByRole("combobox")[2];

        await inputText(paciente, testService.paciente, user);
        await user.selectOptions(local, ["local-0"]);
        await user.selectOptions(dentista, ["first-dentist-id"]);
        await user.selectOptions(optionProduct, ["id-produto-1"]);

        //after select product click to add it to that service
        await user.click(btnConfirmProduct);
        await user.click(submit);

        //show just the dentist of the selected Local
        const localDentist = await screen.findByText("first dentist");

        //render a checkbox after click button to add product to the service
        const checkBoxProduct = screen.getByRole("checkbox", {
            name: mockApiData.produto[0].nome,
        });

        //header without initialState
        expect(header.textContent).toBe("Registrar Novo Serviço");

        //inputs has values correctly
        expectFormElements({ paciente, local, dentista, checkBoxProduct });

        //input with value of the dentist that work at selected Local is render
        expect(localDentist).toBeInTheDocument();

        //call the right API to put new data
        expect(APIPostNewData).toBeCalled();
    });
    it("Form edit mode, save data at right inputs", async () => {
        const user = userEvent.setup();

        render(<FormService initialState={testService} />);
        const header = screen.getByRole("heading", {
            name: "Editar Detalhes do Serviço",
        });
        const { paciente, local, dentista, submit } = getEl();

        await user.click(submit);

        //show just the dentist of the selected Local
        const localDentist = await screen.findByText("first dentist");
        //render a checkbox after click button to add product to the service
        const checkBoxProduct = screen.getByRole("checkbox", {
            name: mockApiData.produto[0].nome,
        });
        //header without initialState
        expect(header.textContent).toBe("Editar Detalhes do Serviço");

        //inputs has values correctly
        expectFormElements({ paciente, local, dentista, checkBoxProduct });

        //input with value of the dentist that work at selected Local is render
        expect(localDentist).toBeInTheDocument();

        //call the right API to update data
        expect(APIPutData).toBeCalled();
    });
    it("submit empty form, won't call API", async () => {
        const user = userEvent.setup();
        render(<FormService />);
        const { submit } = getEl();
        await user.click(submit);

        expect(APIPostNewData).not.toBeCalled();
    });
});
