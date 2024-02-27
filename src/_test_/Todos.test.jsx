/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
// import { FormLogin } from "../components/Form/FormLogin";
import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { HashRouter } from "react-router-dom";
import App from "../App";
import { apiLogin } from "../Api";

// vi.mock("../Api", () => ({
//     apiLogin: jest.fn().mockReturnValue(false),
// }));
vi.mock("../Api", () => {
    return {
        default: { apiLogin: vi.fn() },
        apiLogin: vi.fn(),
        // etc...
    };
});
describe("App component", () => {
    it("renders form correct when no token registered", () => {
        const { container } = render(
            //has to use browserRouter for useNavigate to work
            <HashRouter>
                <App />
            </HashRouter>
        );
        const form = screen.getByRole("login-form");
        expect(container).toMatchSnapshot();
        expect(form).toBeInTheDocument();
    });
    it.only("Form Login successfully", async () => {
        const user = userEvent.setup();
        localStorage.setItem("token", "");
        render(
            //has to use browserRouter for useNavigate to work
            <HashRouter>
                <App />
            </HashRouter>
        );

        const username = screen.getByRole("textbox", {
            name: "Nome de Usuário:",
        });
        const password = screen.getByLabelText("Senha:");
        const button = screen.getByRole("button", { name: "Entrar" });
        const form = screen.getByRole("login-form");
        await user.tripleClick(username);
        await user.keyboard("test");
        await user.tripleClick(password);
        await user.keyboard("test");
        await user.tripleClick(button);
        expect(username.value).toBe("test");
        expect(password.value).toBe("test");
    });
});
