import { vi, describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Shop from "../Shop/Shop";

describe("Shop", () => {
    it("show title", () => {
        render(
            <MemoryRouter >
              <Shop />
            </MemoryRouter>
          );
        expect(screen.getByRole("heading").textContent).toMatch("Items (0)");
    });

    // Other tests, but i do not know how to mock useOutletContext..
})