import { describe, it, expect } from "vitest";
import { renderHookWithProviders, waitForCondition } from "../utils/test-utils";
import { useExample } from "../../src/hooks/useExample"; // substitua pelo seu hook real

describe("Hook useExample", () => {
  it("deve retornar dados iniciais corretamente", async () => {
    const { result } = renderHookWithProviders(() => useExample());

    // Espera até que os dados estejam disponíveis
    await waitForCondition(() => result.current.data !== undefined);

    expect(result.current.data).toBeDefined();
    expect(result.current.isLoading).toBe(false);
  });

  it("deve lidar com erro corretamente", async () => {
    const { result } = renderHookWithProviders(() => useExample("fail")); // parâmetro para simular erro

    await waitForCondition(() => result.current.isError === true);

    expect(result.current.data).toBeUndefined();
    expect(result.current.isError).toBe(true);
  });
});
