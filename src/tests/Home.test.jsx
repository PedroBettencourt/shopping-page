import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../Home/Home";

describe("Home component", () => {
    it("renders heading", () => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
      expect(screen.getByRole("heading", {level: 1}).textContent).toMatch(/folhado bakery/i);
    });
  });