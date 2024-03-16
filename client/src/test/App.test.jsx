import { render, screen} from "@testing-library/react";
import React from "react";
import App from "../App";

describe("App.jsx tests", () => {
    it("should contain the heading", () => {
        render(<App />);
        const heading = screen.getByText(/Hello, world!/);
        expect(heading).toBeInTheDocument();
    });
});