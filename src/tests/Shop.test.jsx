import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RenderRouteWithOutletContext } from "react-router-dom";
import Shop from "../Shop/Shop";

describe("Shop", () => {
    it("show title", () => {
        const data = [{id: 248924}, null, false];
        render(
            <RenderRouteWithOutletContext context={data}>
              <Shop />
            </RenderRouteWithOutletContext>
          );
        expect(screen.getByRole("heading").textContent).toMatch("a");
    })
})