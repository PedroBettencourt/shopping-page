import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route, Outlet } from "react-router-dom";
import Product from "../Product/Product";
import userEvent from "@testing-library/user-event";

describe("Product component", () => {
    it("Is loading", () => {
        const mockContext = [[], null, [], null, true, [{id: 11, name: "aa"}]];
        
        render(
            <MemoryRouter initialEntries={["/shop/11"]}>
              <Routes>
                <Route path="/" element={<Outlet context={mockContext} />}>
                  <Route path="/shop/:product" element={<Product />} />
                </Route>
              </Routes>
            </MemoryRouter>
            );

        expect(screen.getByText(/loading/i).textContent).toBe("Loading...");
    });


    it("Shows headings", () => {
      const mockContext = [[], null, [{id: 11, name: "Bread", price:"€0.90"}], null, false, [{id: 11, name: "Bread"}]];

      render(
        <MemoryRouter initialEntries={["/shop/11"]}>
          <Routes>
            <Route path="/" element={<Outlet context={mockContext} />}>
              <Route path="/shop/:product" element={<Product />} />
            </Route>
          </Routes>
        </MemoryRouter>
        );

        const headings = screen.getAllByRole("heading");
        expect(headings[0].textContent).toBe("Bread");
        expect(headings[1].textContent).toBe("€0.90")
    });


    it("Correctly edits form", async () => {
      const mockContext = [[], null, [{id: 11, name: "Bread", price:"€0.90"}], null, false, [{id: 11, name: "Bread"}]];
      const user = userEvent.setup();

      render(
        <MemoryRouter initialEntries={["/shop/11"]}>
          <Routes>
            <Route path="/" element={<Outlet context={mockContext} />}>
              <Route path="/shop/:product" element={<Product />} />
            </Route>
          </Routes>
        </MemoryRouter>
        );

        const input = screen.getByRole("spinbutton");
        await user.type(input, "1");
        expect(input).toHaveValue(11);
    });
});