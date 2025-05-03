import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Product from "../Product/Product";

describe("Product component", () => {
    it("renders", () => {
        vi.mock("react-router", () => ({
            ...vi.requireActual("react-router"),
            useParams: vi.fn()
        }))

        // no idea..
    
        render(
            <MemoryRouter>
            <Product />
            </MemoryRouter>
        );
        expect(screen.getByRole());
    });


  });