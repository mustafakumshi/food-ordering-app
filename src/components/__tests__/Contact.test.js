import { render, screen } from "@testing-library/react";
import Contact from "../Contact";
import "@testing-library/jest-dom"


describe("Contact Us Page Test Cases", () => {

    // beforeAll(() => {
    //     console.log("Before All")
    // });

    // beforeEach(() => {
    //     console.log("Before Each")
    // });

    // afterEach(() => {
    //     console.log("After Each")
    // });

    // afterAll(() => {
    //     console.log("After All")
    // });

    it("should load Contact Us Component", () => {

        render(<Contact/>);
    
        const heading = screen.getByRole("heading");
    
        expect(heading).toBeInTheDocument();
    });
    
    it("should load Button inside Contact Us Component", () => {
    
        render(<Contact/>);
    
        const button = screen.getByText("Submit");
    
        expect(button).toBeInTheDocument();
    });
    
    it("should load Input name inside Contact Us Component", () => {
    
        render(<Contact/>);
    
        const inputName = screen.getByPlaceholderText("name")
    
        expect(inputName).toBeInTheDocument();
    });
    
    it("should load two Input boxes inside Contact Us Component", () => {
    
        render(<Contact/>);
    
        // Querying
        const inputs = screen.getAllByRole("textbox")
    
        // console.log(inputs[0]);
    
        // Assertion
        expect(inputs.length).toBe(2);
    
    });
    
    it("should not load 3 Input boxes inside Contact Us Component", () => {
    
        render(<Contact/>);
    
        // Querying
        const inputs = screen.getAllByRole("textbox")
    
        // Assertion
        expect(inputs.length).not.toBe(3);
        
    });
})