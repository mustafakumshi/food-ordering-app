import { screen, render, fireEvent } from "@testing-library/react";
import Header from "../Header";
import RestaurantMenu from "../RestaurantMenu";
import Cart from "../Cart";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import { act } from "react";
import MOCK_RESTAURANT_MENU from "../mocks/mockRestaurantMenu.json"
import "@testing-library/jest-dom";

global.fetch = jest.fn(() => {
    return Promise.resolve({
        json: () => {
            return Promise.resolve(MOCK_RESTAURANT_MENU);
        }
    })
})

describe("Cart Functionality Test Cases", () => {

    it("should render restaurant menu component", async () => {
        await act(async () => render(<Provider store={appStore}><RestaurantMenu /></Provider>));
    })

    it("should perform add to cart functionality", async () => {
        await act(async () => render(
            <BrowserRouter>
                <Provider store={appStore}>
                    <Header />
                    <RestaurantMenu />
                    <Cart/>
                </Provider>
            </BrowserRouter>
        ));

        const pizzaManiaAccHeader = screen.getByText("PIZZA MANIA (11)");

        expect(pizzaManiaAccHeader).toBeInTheDocument();

        fireEvent.click(pizzaManiaAccHeader);

        const categoryItems = screen.getAllByTestId("resItem");

        expect(categoryItems.length).toBe(11);

        const addBtns = screen.getAllByRole("button", { name: "ADD +" });

        expect(addBtns.length).toBe(11);

        const cartBtn = screen.getByText("Cart(0)");

        expect(cartBtn).toBeInTheDocument();

        fireEvent.click(addBtns[0]);

        const updatedCartBtn = screen.getByText("Cart(1)");

        expect(updatedCartBtn).toBeInTheDocument();

        fireEvent.click(addBtns[1]);

        const updatedCartBtnNew = screen.getByText("Cart(2)");

        expect(updatedCartBtnNew).toBeInTheDocument();

        const cartItems = screen.getAllByTestId("cartItem");

        expect(cartItems.length).toBe(2);

        const clearCartBtn = screen.getByRole("button", {name: "Clear Cart"});

        fireEvent.click(clearCartBtn);

        const emptyCartText = screen.getByText("Add Items to Cart !!!");

        expect(emptyCartText).toBeInTheDocument();

        const clearedCartItems = screen.queryAllByTestId("cartItem");

        expect(clearedCartItems.length).toBe(0);

        const finalCartBtn = screen.getByText("Cart(0)");

        expect(finalCartBtn).toBeInTheDocument();
    })
})