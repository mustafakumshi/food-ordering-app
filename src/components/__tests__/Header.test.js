import Header from "../Header";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom"

describe("Header Component Test Cases", () => {
    it("should render Header Component with Login Button", () => {

        render(
            <BrowserRouter>
                <Provider store={appStore}>
                    <Header />
                </Provider>
            </BrowserRouter>);

        const loginBtn = screen.getByRole("button", { name: "Login" });

        expect(loginBtn).toBeInTheDocument();
    });

    it("should render Header Component with Cart", () => {

        render(
            <BrowserRouter>
                <Provider store={appStore}>
                    <Header />
                </Provider>
            </BrowserRouter>);

        const cartLogo = screen.getByText(/Cart/);

        expect(cartLogo).toBeInTheDocument();
    });

    it("should render Header Component with Cart(0)", () => {

        render(
            <BrowserRouter>
                <Provider store={appStore}>
                    <Header />
                </Provider>
            </BrowserRouter>);

        const cartLogo = screen.getByText("Cart(0)")

        expect(cartLogo).toBeInTheDocument();
    });

    it("should change Login Button to Logout On Click", () => {

        render(
            <BrowserRouter>
                <Provider store={appStore}>
                    <Header />
                </Provider>
            </BrowserRouter>);

        const loginBtn = screen.getByRole("button", { name: "Login" });

        fireEvent.click(loginBtn);

        const logoutBtn = screen.getByRole("button", { name: "Logout" });

        expect(logoutBtn).toBeInTheDocument();
        // expect(loginBtn).toBeInTheDocument();  [WORKS BECAUSE SAME DOM NODE ONLY TEXT CHANGED]
    });
})