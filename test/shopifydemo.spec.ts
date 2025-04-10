import { test, expect } from "@playwright/test";

test("verify pdf link opens in new tab with correct title", async ({
  page,
  context,
}) => {
  await page.goto("https://pdfdemo.myshopify.com/");
  await page.locator("#password").fill(process.env.password ?? "");
  await page.getByRole("button", { name: "Enter" }).click();
  await page.locator("#HeaderMenu-collection").click();
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

test("Verify Whatsapp share button", async ({ page }) => {
  await page.goto("https://whatsapp-share-button.myshopify.com/");
  await page.locator("#password").fill(process.env.password ?? "");
  await page.getByRole("button", { name: "Enter" }).click();
  await page.locator("#HeaderMenu-catalog").click();
  await page.getByRole("link", { name: "Freak 5 EP" }).click();
  const whatsappLink = page.locator('a[data-action="share/whatsapp/share"]');
  await expect(whatsappLink).toBeVisible();
});
test("Verify Facebook share button", async ({ page }) => {
  await page.goto("https://shipping-per-item.myshopify.com/");
  await page.locator("#password").fill(process.env.password ?? "");
  await page.getByRole("button", { name: "Enter" }).click();
  await page.locator('#shopify-section-sections--23418919026976__header').getByRole('link', { name: 'Catalog' }).click();
  await page.getByRole("link", { name: "The Multi-managed Snowboard" }).click();
  await page.getByRole("button", { name: "Add to cart" }).click();
  await page.locator("#CartDrawer-Checkout").click();
  await page
    .getByRole("textbox", { name: "email" })
    .fill("meetanshi.tester@yopmail.com");
  await page.getByRole("textbox", { name: "firstName" }).fill("meetanshi");
  await page.getByRole("textbox", { name: "lastName" }).fill("tester");
  await page.getByRole("textbox", { name: "address1" }).fill("waghawadi road");
  await page.getByRole("textbox", { name: "city" }).fill("bhavnagar");
  await page.getByRole("textbox", { name: "postalCode" }).fill("364001");
  await page.locator('.i4DWM').click();
  await expect(page.getByText('Flat Rate3 To 4 Business DayFree')).toBeVisible();
});