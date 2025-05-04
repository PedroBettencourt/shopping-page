import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Outlet, Routes, Route } from "react-router-dom";
import Shop from "../Shop/Shop";

describe("Shop", () => {

  it("show heading with 0 items", () => {
    const mockContext = [[], null, [], null, true, []];
    
    render(
            <MemoryRouter>
              <Routes>
                <Route path="/" element={<Outlet context={mockContext} />}>
                  <Route index element={<Shop />} />
                </Route>
              </Routes>
            </MemoryRouter>
          );
        expect(screen.getByRole("heading").textContent).toMatch("Items (0)");
    });

  it("show heading with 2 items", () => {
    const mockContext = [[], null, [{id: "5020364010151", name: "€1.30", price: ""}, {id: "5018374285577", name: "", price: "€0.80"}], null, true, []];
    
    render(
            <MemoryRouter>
              <Routes>
                <Route path="/" element={<Outlet context={mockContext} />}>
                  <Route index element={<Shop />} />
                </Route>
              </Routes>
            </MemoryRouter>
          );
        expect(screen.getByRole("heading").textContent).toMatch("Items (2)");
  });


  it("show loading", () => {
    const mockContext = [[], null, [], null, true, []];
    
    render(
            <MemoryRouter>
              <Routes>
                <Route path="/" element={<Outlet context={mockContext} />}>
                  <Route index element={<Shop />} />
                </Route>
              </Routes>
            </MemoryRouter>
          );
        expect(screen.getByText(/loading/i).textContent).toMatch("Loading...");
  });

  it("show food items", () => {
    const mockContext = [[], null, [{id: "5020364010151", name: "aa", price: "€1.30"}, {id: "5018374285577", name: "bb", price: "€0.80"}], null, false, []];
    
    render(
            <MemoryRouter>
              <Routes>
                <Route path="/" element={<Outlet context={mockContext} />}>
                  <Route index element={<Shop />} />
                </Route>
              </Routes>
            </MemoryRouter>
          );

      expect(screen.getAllByRole("img")[0]).toHaveAttribute("alt", "aa");
      expect(screen.getByText("aa"));
      expect(screen.getByText("€1.30"));
    });
})