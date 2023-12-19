/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";
import App from "./Home";

describe("App component", () => {
    it("renders correct heading", () => {
        render(<App />);
        expect(screen.getByRole("heading").textContent).toMatch(
            /our first test/i
        );
    });
});
