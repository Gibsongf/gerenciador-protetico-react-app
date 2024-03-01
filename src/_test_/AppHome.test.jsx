/* eslint-disable no-undef */
import { act, render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import { HashRouter } from "react-router-dom";
import App from "../App";

//mock api post login
vi.mock("../components/ApiHooks", () => {
    return {
        useTodosApi: vi.fn(() => {
            return {
                all: "",
            };
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
    it("renders service when there is a token", async () => {
        //not valid token the content won't load
        //the header load normally
        localStorage.setItem("token", "some-token");
        await act(async () => {
            render(
                //HashRouter for useNavigate to work
                <HashRouter>
                    <App />
                </HashRouter>
            );
        });
        const linkDentista = screen.getByRole("link", { name: "Dentistas" });
        const logo = screen.getByRole("img", { name: "dg-logo" });

        expect(linkDentista).toBeInTheDocument();
        //conditional logo render normally
        expect(logo).toBeInTheDocument();
    });
});
