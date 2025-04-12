import { test, expect, Page } from "@playwright/test";

test.describe.configure({ timeout: 60000 }); // 60 seconds per describe block

// 🔐 Helper to handle password-protected pages
async function enterStorePassword(page: Page, password: string) {
  await page.locator("#password").fill(process.env.password ?? "");
  await page.getByRole("button", { name: "Enter" }).click();
}

test.describe("Meetanshi PDF Catalog", () => {
  test("opens PDF preview", async ({ page, context }) => {
    await page.goto("https://pdfdemo.myshopify.com/");
    await enterStorePassword(page, process.env.password ?? "");

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

    console.log("✅ PDF preview page opened successfully");
  });
});

test.describe("Meetanshi WhatsApp Share", () => {
  test("displays share button", async ({ page }) => {
    await page.goto("https://whatsapp-share-button.myshopify.com/");
    await enterStorePassword(page, process.env.password ?? "");

    await page.locator("#HeaderMenu-catalog").click();
    await page.getByRole("link", { name: "Freak 5 EP" }).click();

    const whatsappLink = page.locator('a[data-action="share/whatsapp/share"]');
    await expect(whatsappLink).toBeVisible();

    console.log("✅ WhatsApp share button is visible");
  });
});

test.describe("Meetanshi Shipping Per Item", () => {
  test("selects shipping method and fills form", async ({ page }) => {
    await page.goto("https://shipping-per-item.myshopify.com/");
    await enterStorePassword(page, process.env.password ?? "");

    await page
      .locator("#shopify-section-sections--23418919026976__header")
      .getByRole("link", { name: "Catalog" })
      .click();

    await page
      .getByRole("link", { name: "The Multi-managed Snowboard" })
      .click();
    await page.getByRole("button", { name: "Add to cart" }).click();

    const checkoutButton = page.locator("#CartDrawer-Checkout");
    await expect(checkoutButton).toBeVisible({ timeout: 10000 });
    await checkoutButton.click();

    await page
      .getByRole("textbox", { name: "Email or mobile phone number" })
      .fill("meetanshi.tester@yopmail.com");
    await page
      .getByRole("textbox", { name: "First name (optional)" })
      .fill("meetanshi");
    await page.getByRole("textbox", { name: "Last name" }).fill("tester");
    await page
      .getByRole("combobox", { name: "Address" })
      .fill("waghawadi road");
    await page.getByRole("textbox", { name: "City" }).fill("bhavnagar");
    await page.getByRole("textbox", { name: "PIN code" }).fill("364001");

    await page.locator(".i4DWM").click();
    await expect(
      page.locator("//p[contains(text(), '3 To 4 Business Day')]")
    ).toBeVisible();

    console.log("✅ Shipping per item rate selected successfully");
  });
});

test.describe("Meetanshi Shipping Flow Rules", () => {
  test("shows flow-based shipping rate", async ({ page }) => {
    await page.goto("https://shipflow-rules.myshopify.com/");
    await enterStorePassword(page, process.env.password ?? "");

    await page.getByRole("link", { name: "Catalog" }).click();
    await page.getByRole("link", { name: "Freak 5 EP" }).click();
    await page.getByRole("button", { name: "Add to cart" }).click();
    await page.locator(".cart-count-bubble").click();
    await page.locator("#checkout").click();

    await page
      .getByRole("textbox", { name: "Email or mobile phone number" })
      .fill("meetanshi.tester@yopmail.com");
    await page
      .getByRole("textbox", { name: "First name (optional)" })
      .fill("meetanshi");
    await page.getByRole("textbox", { name: "Last name" }).fill("tester");
    await page
      .getByRole("combobox", { name: "Address" })
      .fill("waghawadi road");
    await page.getByRole("textbox", { name: "City" }).fill("bhavnagar");

    const pinCodeInput = page.getByRole("textbox", { name: "PIN code" });
    await expect(pinCodeInput).toBeVisible({ timeout: 2000 });
    await pinCodeInput.fill("364005");

    await page.locator(".i4DWM").click();
    const rateNameLocator = page.locator("//p[text()='Rate Name']");
    await expect(rateNameLocator).toBeVisible();

    console.log("✅ Shipping zip code rate displayed successfully");
  });
});
