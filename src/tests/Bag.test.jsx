import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Outlet, Routes, Route } from "react-router-dom";
import Bag from "../Bag/Bag";
import userEvent from "@testing-library/user-event";
import { useState } from "react";

describe("Bag", () => {

  it("show heading", () => {
    const mockContext = [[], null];
    
    render(
            <MemoryRouter>
              <Routes>
                <Route path="/" element={<Outlet context={mockContext} />}>
                  <Route index element={<Bag />} />
                </Route>
              </Routes>
            </MemoryRouter>
          );

        expect(screen.getByRole("heading").textContent).toBe("Bag");
    });


    it("show total 0 for empty bag", () => {
        const mockContext = [[], null];
        
        render(
                <MemoryRouter>
                  <Routes>
                    <Route path="/" element={<Outlet context={mockContext} />}>
                      <Route index element={<Bag />} />
                    </Route>
                  </Routes>
                </MemoryRouter>
              );

        expect(screen.getByText(/Total/i).textContent).toBe("Total: €0");
    });


    it("show total for non empty bag", () => {
        const product = {id: 11, name: "aa", img: "aa", price: "€1.50"}
        const mockContext = [[{product: product, quantity: 2}], null];
        
        render(
                <MemoryRouter>
                  <Routes>
                    <Route path="/" element={<Outlet context={mockContext} />}>
                      <Route index element={<Bag />} />
                    </Route>
                  </Routes>
                </MemoryRouter>
              );
        expect(screen.getByText(/Total/i).textContent).toBe("Total: €3");
    });


    it("Displays item title", () => {
        const product = {id: 11, name: "aa", img: "aa", price: "€1.50"}
        const mockContext = [[{product: product, quantity: 2}], null];
        
        render(
                <MemoryRouter>
                  <Routes>
                    <Route path="/" element={<Outlet context={mockContext} />}>
                      <Route index element={<Bag />} />
                    </Route>
                  </Routes>
                </MemoryRouter>
              );
              
        const title = screen.getAllByRole("heading")[1].textContent;
        expect(title).toBe("aa");
    });

    // The one below doesn't work
    // I don't know how to get useState to work since it should be sent from mockContext

    it("Add quantity", () => {
        const product = {id: 11, name: "aa", img: "aa", price: "€1.50"}
        // const mockContext = [[{product: product, quantity: 2}], null];

        const [bag, setBag] = useState([{product: product, quantity: 2}]);

        const user = userEvent.setup();
        
        render(
                <MemoryRouter>
                  <Routes>
                    <Route path="/" element={<Outlet context={[bag, setBag]} />}>
                      <Route index element={<Bag />} />
                    </Route>
                  </Routes>
                </MemoryRouter>
              );
              
        const buttonAdd = screen.getAllByRole("button")[0];
        user.click(buttonAdd);

        const quantity = screen.getAllByRole("heading")[2].textContent;
        expect(quantity).toBe("3");
    });

});