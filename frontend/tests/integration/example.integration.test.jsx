import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TestQueryProvider } from "../utils/test-utils";
import ExampleComponent from "../../src/components/ExampleComponent"; // seu componente real

describe("Componente ExampleComponent", () => {
  it("deve renderizar com React Query", async () => {
    render(
      <TestQueryProvider>
        <ExampleComponent />
      </TestQueryProvider>
    );

    // Verifica se um texto específico do componente aparece
    expect(screen.getByText(/Example/i)).toBeInTheDocument();

    // Se o componente renderiza itens dinâmicos, pode buscar por data-testid
    const items = await screen.findAllByTestId("example-item");
    expect(items.length).toBeGreaterThan(0);
  });
});
