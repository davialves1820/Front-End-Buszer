import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("renders header correctly in different browsers", async ({ page }) => {
    await page.goto("/"); // baseURL já aponta para localhost:5173
    const header = page.locator("header");
    await expect(header).toBeVisible();
    await expect(header).toHaveText(/buszer/i); // ajusta regex se o texto for diferente
  });

  test("renders main content area", async ({ page }) => {
    await page.goto("/");
    const main = page.locator("main");
    await expect(main).toBeVisible();
  });
});
