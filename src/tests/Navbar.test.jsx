import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

describe("Navbar component", () => {
    
    it("correct bag size", async() => {
        render(
            <MemoryRouter>
              <Navbar />
            </MemoryRouter>
          );
          expect(screen.getByText(/bag/i).textContent).toMatch("Bag (0)");
    });
  });