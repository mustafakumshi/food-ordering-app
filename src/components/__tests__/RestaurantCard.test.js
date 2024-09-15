import { render, screen } from "@testing-library/react";
import RestaurantCard, { RestaurantWithFastDelivery } from "../RestaurantCard";
import MOCK_RESTAURANT from "../mocks/mockRestaurant.json"
import "@testing-library/jest-dom"

describe("Restaurant Card Component Test Cases", () => {
    it("should render according to props data", () => {
       render(<RestaurantCard resData={MOCK_RESTAURANT}/>);

       const restaurantTitle = screen.getByText("Domino's Pizza");

       expect(restaurantTitle).toBeInTheDocument();
    });

    it("should render with fast delivery label", () => {

        const RestaurantCardWithFastDelivery = RestaurantWithFastDelivery(RestaurantCard);

        render(<RestaurantCardWithFastDelivery resData={MOCK_RESTAURANT}/>);
 
        const fastDeliveryLabel = screen.getByText("Fast Delivery");
 
        expect(fastDeliveryLabel).toBeInTheDocument();
     });
})