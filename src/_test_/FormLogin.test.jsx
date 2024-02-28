/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { HashRouter } from "react-router-dom";
import App from "../App";

//to confirm the form call the login api
let loginCall = false;
vi.mock("../Api", () => {
    return {
        default: { apiLogin: vi.fn() },
        apiLogin: vi.fn(() => {
            loginCall = true;
        }),
    };
});
describe("App component", () => {
    it("renders form correct when no token registered", () => {
        const { container } = render(
            //HashRouter for useNavigate to work
            <HashRouter>
                <App />
            </HashRouter>
        );
        const form = screen.getByRole("login-form");
        expect(container).toMatchSnapshot();
        expect(form).toBeInTheDocument();
    });
    it("Form Login successfully", async () => {
        const user = userEvent.setup();
        render(
            //HashRouter for useNavigate to work
            <HashRouter>
                <App />
            </HashRouter>
        );

        const username = screen.getByRole("textbox", {
            name: "Nome de Usuário:",
        });
        const password = screen.getByLabelText("Senha:");
        const button = screen.getByRole("button", { name: "Entrar" });
        await user.tripleClick(username);
        await user.keyboard("test");
        await user.tripleClick(password);
        await user.keyboard("test");
        await user.click(button);
        expect(username.value).toBe("test");
        expect(password.value).toBe("test");
        //confirm that the API is being called
        expect(loginCall).toBeTruthy();
    });
});
