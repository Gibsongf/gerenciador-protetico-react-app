/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { HashRouter } from "react-router-dom";
import App from "../App";
import { apiLogin } from "../Api";

//mock api post login
vi.mock("../Api");

describe("Form Login component", () => {
    afterEach(() => {
        vi.clearAllMocks(); // Reset mocks after each test
    });
    //all useful elements of the form
    const getEl = () => {
        const username = screen.getByRole("textbox", {
            name: "Nome de Usuário:",
        });
        const password = screen.getByLabelText("Senha:");
        const button = screen.getByRole("button", { name: "Entrar" });
        return { username, password, button };
    };
    //event user keyboard input
    const inputText = async (el, text, user) => {
        await user.dblClick(el);
        await user.keyboard(text);
    };

    it("call APIlogin successfully & register input correctly", async () => {
        const user = userEvent.setup();
        render(
            //HashRouter for useNavigate to work
            <HashRouter>
                <App />
            </HashRouter>
        );
        let { username, password, button } = getEl();
        await inputText(username, "test", user);
        await inputText(password, "test", user);
        await user.click(button);

        //input register correctly
        expect(username.value).toBe("test");
        expect(password.value).toBe("test");
        //confirm that the API is being called
        expect(apiLogin).toBeCalledTimes(1);
        expect(apiLogin).toBeCalledWith({ username: "test", password: "test" });
    });
    it("Don't call ApiLogin with empty required element", async () => {
        const user = userEvent.setup();
        render(
            //HashRouter for useNavigate to work
            <HashRouter>
                <App />
            </HashRouter>
        );
        let { username, button } = getEl();
        await inputText(username, "test", user);
        await user.click(button);

        expect(apiLogin).not.toBeCalled();
    });
});
