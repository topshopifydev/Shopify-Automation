import { test, expect } from "@playwright/test";

test("verify pdf link opens in new tab with correct title", async ({ page, context }) => {
  await page.goto("https://pdfdemo.myshopify.com/");
  await page.locator("#password").fill(process.env.password ?? "");
  await page.getByRole("button", { name: "Enter" }).click();
  await page.locator('#HeaderMenu-collection').click();
  await page.getByRole("link", { name: "Clothing" }).click();

  await expect(page.getByRole("button", { name: "Print Pdf" })).toBeVisible();

  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    page.getByRole("button", { name: "Print Pdf" }).click(),
  ]);

  await newPage.waitForLoadState("domcontentloaded");
  const title = await newPage.title();
  expect(title).toBe("Pdf Preview");
});


test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});
