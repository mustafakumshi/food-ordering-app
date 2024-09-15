import Body from "../Body";
import MOCK_RESTAURANTS_LIST from "../mocks/mockRestaurantsList.json";
import { BrowserRouter } from "react-router-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react";
import "@testing-library/jest-dom";

global.fetch = jest.fn(() => {
    return Promise.resolve({
        json: () => {
            return Promise.resolve(MOCK_RESTAURANTS_LIST);
        }
    })
})

describe("Search Functionality Testing - Integration Testing", () => {

    it("should render body component with search input", async () => {

        await act(async () => render(<BrowserRouter><Body /></BrowserRouter>))

        const searchBtn = screen.getByRole("button", {name: "Search"});

        const searchInput = screen.getByTestId("searchInput");

        expect(searchBtn).toBeInTheDocument();
        expect(searchInput).toBeInTheDocument();

    });

    it("should render 20 Restaurant Cards", async () => {

        await act(async () => render(<BrowserRouter><Body /></BrowserRouter>))

        const restaurantCards = screen.getAllByTestId("resCard");

        expect(restaurantCards.length).toBe(20);

    });

    it("should render 3 Restaurant Cards on searching 'burger' ", async () => {

        await act(async () => render(<BrowserRouter><Body /></BrowserRouter>));

        const searchBtn = screen.getByRole("button", {name: "Search"});

        const searchInput = screen.getByTestId("searchInput");

        fireEvent.change(searchInput, {target : {value: "burger"}});

        fireEvent.click(searchBtn);

        const restaurantCards = screen.getAllByTestId("resCard");

        expect(restaurantCards.length).toBe(3);

    });

    it("should filter top rated restaurants", async () => {

        await act(async () => render(<BrowserRouter><Body /></BrowserRouter>));

        const topRatedBtn = screen.getByRole("button", {name: "Top Rated Restaurants"});

        fireEvent.click(topRatedBtn);

        const restaurantCards = screen.getAllByTestId("resCard");

        expect(restaurantCards.length).toBe(16);

    });
})