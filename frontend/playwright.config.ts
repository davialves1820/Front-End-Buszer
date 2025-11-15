import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 60000, // tempo máximo de cada teste
  expect: { timeout: 10000 }, // timeout para asserts
  retries: 1, // retry no CI
  use: {
    headless: true, // false se quiser ver o navegador
    viewport: { width: 1280, height: 720 },
    baseURL: "http://localhost:5173",
  },
  projects: [
    // Desktop
    { name: "Chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "Firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "WebKit", use: { ...devices["Desktop Safari"] } },
    { name: "Edge", use: { channel: "msedge", ...devices["Desktop Edge"] } },
    
    // Mobile
    { name: "iPhone 14", use: { ...devices["iPhone 14"] } },
    { name: "Pixel 6", use: { ...devices["Pixel 6"] } },
],
  webServer: {
    command: "npm run dev",
    port: 5173,
    reuseExistingServer: true,
    timeout: 60000,
  },
});
