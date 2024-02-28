/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { HashRouter } from "react-router-dom";
import App from "../App";
import { apiLogin } from "../Api";

//mock api post login
vi.mock("../Api");

describe("App component", () => {
    //all useful elements of the form
    const getInput = () => {
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

    it("call APIlogin successfully & register input correctly", async () => {
        const user = userEvent.setup();
        render(
            //HashRouter for useNavigate to work
            <HashRouter>
                <App />
            </HashRouter>
        );
        let { username, password, button } = getInput();
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
    it("Dont call ApiLogin with empty required element", async () => {
        const user = userEvent.setup();
        render(
            //HashRouter for useNavigate to work
            <HashRouter>
                <App />
            </HashRouter>
        );
        let { username, button } = getInput();
        await inputText(username, "test", user);
        await user.click(button);

        //confirm that the API was called once in the previous test
        expect(apiLogin).toBeCalledTimes(1);
    });
});
