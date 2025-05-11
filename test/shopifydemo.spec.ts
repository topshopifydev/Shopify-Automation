import { test, expect } from "@playwright/test";
import axios from "axios";

const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

// Discord webhook after each test
test.afterEach(async ({ browserName }, testInfo) => {
  if (!WEBHOOK_URL) return;

  const status = testInfo.status;
  const emoji = status === "passed" ? "✅" : "❌";
  const color = status === "passed" ? 3066993 : 15158332;
  const title = `${emoji} ${testInfo.title}`;
  const duration = (testInfo.duration / 1000).toFixed(2);

  await axios.post(WEBHOOK_URL, {
    embeds: [
      {
        title,
        description: `**Result**: ${status?.toUpperCase()}\n**Browser**: ${browserName}\n**Duration**: ${duration}s`,
        color,
        timestamp: new Date().toISOString(),
      },
    ],
  });
});

// Set global timeout for each describe block
test.describe.configure({ timeout: 60000 });

//
// ------------- Test Suites ---------------
//

test.describe("PDF Catalog App Tests", () => {
  test("Meetanshi PDF Catalog", async ({ page, context }) => {
    await page.goto("https://pdfdemo.myshopify.com/");
    await page.locator("#password").fill("mit");
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
});

test.describe("WhatsApp Share Button Tests", () => {
  test("Meetanshi Whatsapp share", async ({ page }) => {
    await page.goto("https://whatsapp-share-button.myshopify.com/");
    await page.locator("#password").fill("mit");
    await page.getByRole("button", { name: "Enter" }).click();
    await page.locator("#HeaderMenu-catalog").click();
    await page.getByRole("link", { name: "Freak 5 EP" }).click();
    const whatsappLink = page.locator('a[data-action="share/whatsapp/share"]');
    await expect(whatsappLink).toBeVisible();
    console.log("Whatsapp share button is visible");
  });
});

test.describe("Shipping Per Item App Tests", () => {
  test("Meetanshi shipping per item", async ({ page }) => {
    await page.goto("https://shipping-per-item.myshopify.com/");
    await page.locator("#password").fill("mit");
    await page.getByRole("button", { name: "Enter" }).click();
    await page
      .locator("#shopify-section-sections--23418919026976__header")
      .getByRole("link", { name: "Catalog" })
      .click();
    await page
      .getByRole("link", { name: "The Multi-managed Snowboard" })
      .click();
    await page.getByRole("button", { name: "Add to cart" }).click();

    const checkoutButton = page.locator("#CartDrawer-Checkout");
    await checkoutButton.waitFor({ state: "visible" });
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
      .pressSequentially("Waghawadi Road Vidhyanagar", { delay: 500 });
    await page.getByRole("textbox", { name: "City" }).fill("Bhavnagar");
    await page.getByRole("textbox", { name: "PIN code" }).fill("364005");
    await page.locator(".i4DWM").click();

    await expect(
      page.locator("//p[contains(text(), '3 To 4 Business Day')]")
    ).toBeVisible();
  });
});

test.describe("Shipping Flow Rules App Tests", () => {
  test("Meetanshi shipping Flow Rules", async ({ page }) => {
    await page.goto("https://shipflow-rules.myshopify.com/");
    await page.locator("#password").fill("mit");
    await page.getByRole("button", { name: "Enter" }).click();
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
      .pressSequentially("Waghawadi Road Vidhyanagar", { delay: 500 });
    await page.getByRole("textbox", { name: "City" }).fill("Bhavnagar");
    await page.getByRole("textbox", { name: "PIN code" }).fill("364005");
    await page.locator(".i4DWM").click();

    await expect(async () => {
      const rateText = page.locator("//p[contains(text(), 'Rate Name')]");
      await expect(rateText).toBeVisible();
    }).toPass({ timeout: 5000 });
  });
});

test.describe("Meetanshi App Store Visibility Tests", () => {
  test("Check visibility of Meetanshi APPS", async ({ page }) => {
    await page.goto("https://apps.shopify.com/search?q=meetanshi");
    await page.waitForLoadState("domcontentloaded");

    const links = [
      "Meetanshi WhatsApp Chat",
      "Meetanshi PDF Product Catalog",
      "Meetanshi WhatsApp Share",
      "Meetanshi AI Content Generator",
      "Meetanshi Shipping Per Item",
      "Meetanshi Recent Sales Popup",
      "Meet Collections Import",
      "MIT Request Quote & Hide Price",
      "Meetanshi Countdown Timer Bar",
      "MIT Festival Effects & Decor",
      "MIT Quick Order Form COD",
      "ShipFlow: Shipping Rules",
    ];

    for (const name of links) {
      await expect(page.getByRole("button", { name })).toBeVisible();
    }
    console.log("All Meetanshi elements are visible");
  });
});

test.describe("Quick Order Form COD App Tests", () => {
  test.use({
    permissions: ["geolocation"],
    geolocation: { latitude: 12.9716, longitude: 77.5946 },
    locale: "en-US",
  });

  test("MIT Quick Order Form COD", async ({ page, context }) => {
    await context.grantPermissions(["geolocation"], {
      origin: "https://cod-order.myshopify.com",
    });
    await page.goto("https://cod-order.myshopify.com/");
    await page.locator("#password").fill("mit");
    await page.getByRole("button", { name: "Enter" }).click();
    await page.locator("#HeaderMenu-catalog").click();
    await page.getByRole("link", { name: "Freak 5 EP" }).click();
    await page.waitForLoadState("networkidle");

    const form = page.locator("#inlineformfrontend");
    await form.waitFor({ state: "visible", timeout: 15000 });
    await form.scrollIntoViewIfNeeded();
    await expect(form).toBeVisible();
  });

  test("Fill MIT Quick Order Form", async ({ page, context }) => {
    await context.grantPermissions(["geolocation"], {
      origin: "https://cod-order.myshopify.com",
    });
    await page.goto("https://cod-order.myshopify.com/");
    await page.locator("#password").fill("mit");
    await page.getByRole("button", { name: "Enter" }).click();
    await page.locator("#HeaderMenu-catalog").click();
    await page.getByRole("link", { name: "Freak 5 EP" }).click();
    await page.waitForLoadState("networkidle");
    await expect(page.locator("#inlineformfrontend")).toBeVisible();

    await page.getByRole("textbox", { name: "First Name" }).fill("meetanshi");
    await page.getByRole("textbox", { name: "Last Name" }).fill("tester");
    await page
      .locator('input[name="Email"]')
      .fill("meetanshi.tester@yopmail.com");
    await page.locator("#Country").selectOption("India");
    await page.locator("#State").selectOption("Gujarat");
    await page.locator("#City").selectOption("Bhavnagar");
    await page.getByRole("textbox", { name: "Address" }).fill("Waghawadi Road");
    await page.getByRole("button", { name: "Place COD Order" }).click();
    await expect(page.locator("#ql-editor")).toBeVisible();
    await expect(
      page.getByText("Keep the order number for your reference :)")
    ).toBeVisible();
  });
});
test.describe("Request Quote & Hide Price Tests", () => {
  test("MIT Request Quote & Hide Price", async ({ page }) => {
    await page.goto("https://callforpricelaravel.myshopify.com/");
    await page.locator("#password").fill("mit");
    await page.getByRole("button", { name: "Enter" }).click();

    const buttons = page.getByRole("button", { name: "Request for Quote" });
    await expect(buttons).toHaveCount(8);
  });

  test("MIT Request Quote & Hide Price in collection page", async ({
    page,
  }) => {
    await page.goto("https://callforpricelaravel.myshopify.com/");
    await page.locator("#password").fill("mit");
    await page.getByRole("button", { name: "Enter" }).click();
    await page.getByRole("link", { name: "Catalog" }).click();
    await expect(page).toHaveURL(/\/collections\/all/);

    const buttons = page.getByRole("button", { name: "Request for Quote" });
    await expect(buttons.nth(0)).toBeVisible();
    await expect(buttons.nth(15)).toBeVisible();
  });

  test("Check MIT Request Quote Modal Popup", async ({ page }) => {
    await page.goto("https://callforpricelaravel.myshopify.com/");
    await page.locator("#password").fill("mit");
    await page.getByRole("button", { name: "Enter" }).click();
    await page.getByRole("link", { name: "Catalog" }).click();
    await expect(page).toHaveURL(/\/collections\/all/);

    await page
      .getByRole("button", { name: "Request for Quote" })
      .nth(0)
      .click();
    await expect(page.locator("#cfpmodal")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Quote Inquiry Form" })
    ).toBeVisible();
  });

  test("Fill form of MIT Request Quote and assert response", async ({
    page,
  }) => {
    await page.goto("https://callforpricelaravel.myshopify.com/");
    await page.locator("#password").fill("mit");
    await page.getByRole("button", { name: "Enter" }).click();
    await page.getByRole("link", { name: "Catalog" }).click();
    await expect(page).toHaveURL(/\/collections\/all/);

    await page
      .getByRole("button", { name: "Request for Quote" })
      .nth(0)
      .click();
    await expect(page.locator("#cfpmodal")).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Quote Inquiry Form" })
    ).toBeVisible();

    await page.locator("#cname").fill("meetanshi");
    await page.locator("#email_address").fill("meetanshi.tester@yopmail.com");
    await page.locator("#country").selectOption("India");
    await page.locator("#phone_number").fill("1234567890");
    await page
      .locator("#comment")
      .fill("Hi, I want to know about this product.");

    const [response] = await Promise.all([
      page.waitForResponse(
        (resp) =>
          resp.url().includes("/api/inquiry") &&
          resp.request().method() === "POST"
      ),
      page.getByRole("button", { name: "Submit" }).click(),
    ]);

    const json = await response.json();
    expect(json).toEqual({
      message: "Inquiry has been sent successfully.",
      status: "true",
    });
  });
});

test.describe("Countdown Timer Bar Tests", () => {
  test("Meetanshi Countdown Timer Bar", async ({ page }) => {
    await page.goto("https://countdown-bar.myshopify.com/");
    await page.locator("#password").fill("mit");
    await page.getByRole("button", { name: "Enter" }).click();

    await expect(page.locator("#textarea_message")).toBeVisible();
    await expect(page.locator("body")).toContainText(/New year sale is live/i);
  });
});

test.describe("Recent Sales popup app Tests", () => {
  test("Verify Meetanshi Recent sales popup visibility", async ({ page }) => {
    await page.goto("https://salespopup-demo.myshopify.com/");
    await page.locator("#password").fill("mit");
    await page.getByRole("button", { name: "Enter" }).click();
    // Wait for the element to be in the DOM
    //await page.locator("#card5").waitFor({ state: "visible" });

    // Check visibility
    const card = page.locator("#card5");
    await expect(card).toBeVisible();

    // Optional: Scroll into view
    //await page.locator("#card5").scrollIntoViewIfNeeded();
  });
});
test.describe("Festival Effects & Decor Tests", () => {
  test("MIT Festival Effects & Decor", async ({ page }) => {
    await page.goto("https://festival-effects.myshopify.com/");
    await page.locator("#password").fill("mit");
    await page.getByRole("button", { name: "Enter" }).click();

    await expect(
      page.getByRole("heading", { name: "Festival Effects & Decor" })
    ).toBeVisible();
  });

  test("MIT Festival Effects & Decor in collection page", async ({ page }) => {
    await page.goto("https://festival-effects.myshopify.com/");
    await page.locator("#password").fill("mit");
    await page.getByRole("button", { name: "Enter" }).click();

    const links = page.locator("a.button.button--secondary");
    await expect(links).toHaveCount(50); // Adjust count if necessary
  });
});

test.describe("WhatsApp Chat Widget Tests", () => {
  test("MIT WhatsApp chat", async ({ page, context }) => {
    await page.goto("https://apps.shopify.com/search?q=meetanshi");
    await page.waitForLoadState("domcontentloaded");

    await page.getByRole("link", { name: "Meetanshi WhatsApp Chat" }).click();

    const [newPage] = await Promise.all([
      context.waitForEvent("page"),
      page.getByRole("link", { name: "View demo store" }).click(),
    ]);

    await expect(newPage.locator(".fa.fa-whatsapp")).toBeVisible();
  });
});
