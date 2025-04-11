import { test, expect } from "@playwright/test";
import { log } from "node:console";

test("Meetanshi PDF Catalg", async ({
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
  console.log("PDF preview page opened successfully");
  
});

test("Meetanshi Whatsapp share", async ({ page }) => {
  await page.goto("https://whatsapp-share-button.myshopify.com/");
  await page.locator("#password").fill(process.env.password ?? "");
  await page.getByRole("button", { name: "Enter" }).click();
  await page.locator("#HeaderMenu-catalog").click();
  await page.getByRole("link", { name: "Freak 5 EP" }).click();
  const whatsappLink = page.locator('a[data-action="share/whatsapp/share"]');
  await expect(whatsappLink).toBeVisible();
  console.log("Whatsapp share button is visible");
  
});
test("Meetanshi shipping per item", async ({
  page,
}) => {
  await page.goto("https://shipping-per-item.myshopify.com/");
  await page.locator("#password").fill(process.env.password ?? "");
  await page.getByRole("button", { name: "Enter" }).click();
  await page
    .locator("#shopify-section-sections--23418919026976__header")
    .getByRole("link", { name: "Catalog" })
    .click();
  await page.getByRole("link", { name: "The Multi-managed Snowboard" }).click();
  await page.getByRole("button", { name: "Add to cart" }).click();
  await page.locator("#CartDrawer-Checkout").click();

  // Fill checkout form with correct labels from snapshot
  await page
    .getByRole("textbox", { name: "Email or mobile phone number" })
    .fill("meetanshi.tester@yopmail.com");
  await page
    .getByRole("textbox", { name: "First name (optional)" })
    .fill("meetanshi");
  await page.getByRole("textbox", { name: "Last name" }).fill("tester");
  // Use combobox for Address field
  await page.getByRole("combobox", { name: "Address" }).fill("waghawadi road"); // Or use selectOption if specific options are required
  await page.getByRole("textbox", { name: "City" }).fill("bhavnagar");
  await page.getByRole("textbox", { name: "PIN code" }).fill("364001");

  // Select shipping method (verify .i4DWM selector)
  await page.locator(".i4DWM").click();
  await expect(page.locator("#shipping_methods")).toContainText(
    "3 To 4 Business Day"
  );
  console.log("Shipping method selected successfully");
  
});
test("Meetanshi shipping Flow Rules", async ({
  page,
}) => {
  await page.goto("https://shipflow-rules.myshopify.com/");
  await page.locator("#password").fill(process.env.password ?? "");
  await page.getByRole("button", { name: "Enter" }).click();
  await page.getByRole("link", { name: "Catalog" }).click();
  await page.getByRole("link", { name: "Freak 5 EP" }).click();
  await page.getByRole("button", { name: "Add to cart" }).click();
  await page.locator(".cart-count-bubble").click();
  await page.locator("#checkout").click();
  // Fill checkout form with correct labels from snapshot
  await page
    .getByRole("textbox", { name: "Email or mobile phone number" })
    .fill("meetanshi.tester@yopmail.com");
  await page
    .getByRole("textbox", { name: "First name (optional)" })
    .fill("meetanshi");
  await page.getByRole("textbox", { name: "Last name" }).fill("tester");
  // Use combobox for Address field
  await page.getByRole("combobox", { name: "Address" }).fill("waghawadi road"); // Or use selectOption if specific options are required
  await page.getByRole("textbox", { name: "City" }).fill("bhavnagar");
  await page.getByRole("textbox", { name: "PIN code" }).fill("364007");

  // Select shipping method (verify .i4DWM selector)
  await page.locator(".i4DWM").click();
  await expect(page.getByText("Rate Name")).toBeVisible();
  console.log("Shipping zipcode method visible successfully");
  
});