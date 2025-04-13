import { test, expect } from "@playwright/test";

test.describe.configure({ timeout: 60000 }); // 60 seconds

test.describe("Meetanshi Shopify Apps", () => {
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
    await checkoutButton.waitFor({ state: "visible" }); // Wait for visibility
    await checkoutButton.click(); // Click after ensuring visibility
    // Fill checkout form with correct labels from snapshot
    await page
      .getByRole("textbox", { name: "Email or mobile phone number" })
      .fill("meetanshi.tester@yopmail.com");
    await page
      .getByRole("textbox", { name: "First name (optional)" })
      .fill("meetanshi");
    await page.getByRole("textbox", { name: "Last name" }).fill("tester");
    // Use combobox for Address field
    await page
      .getByRole("combobox", { name: "Address" })
      .pressSequentially("Waghawadi Road Vidhyanagar", { delay: 500 });
    await page.getByRole("textbox", { name: "City" }).fill("Bhavnagar");
    await page.getByRole("textbox", { name: "PIN code" }).fill("364005");
    // Select shipping method (verify .i4DWM selector)
    await page.locator(".i4DWM").click();
    await expect(
      page.locator("//p[contains(text(), '3 To 4 Business Day')]")
    ).toBeVisible();
    // console.log("Shipping per item rate selected successfully");
  });
  test("Meetanshi shipping Flow Rules", async ({ page }) => {
    await page.goto("https://shipflow-rules.myshopify.com/");
    await page.locator("#password").fill("mit");
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
    await page
      .getByRole("combobox", { name: "Address" })
      .pressSequentially("Waghawadi Road Vidhyanagar", { delay: 500 });
    // Or use selectOption if specific options are required
    await page.getByRole("textbox", { name: "City" }).fill("Bhavnagar");
    await page.getByRole("textbox", { name: "PIN code" }).fill("364005");
    await page.locator(".i4DWM").click();
    await expect(
      page.locator("//p[contains(text(), 'Rate Name')]")
    ).toBeVisible();
    console.log("Shipping zipcode Rate visible successfully");
  });
  test("Check visibility of Meetanshi elements", async ({ page }) => {
    await page.goto("https://apps.shopify.com/search?q=meetanshi"); // replace with your actual URL
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
  test.use({
    permissions: ["geolocation"],
    geolocation: { latitude: 12.9716, longitude: 77.5946 }, // Optional if needed
    locale: "en-US",
  });
  test("MIT Quick Order Form COD", async ({ page, context }) => {
    // Grant permission explicitly for this origin
    await context.grantPermissions(["geolocation"], {
      origin: "https://cod-order.myshopify.com",
    });

    await page.goto("https://cod-order.myshopify.com/");
    await page.locator("#password").fill("mit");
    await page.getByRole("button", { name: "Enter" }).click();

    await page.locator("#HeaderMenu-catalog").click();
    await page.getByRole("link", { name: "Freak 5 EP" }).click();
    await page.waitForLoadState("domcontentloaded");
    await expect(page.locator("#inlineformfrontend")).toBeVisible();
  });
  test("Fill MIT Quick Order Form", async ({ page, context }) => {
    // Grant permission explicitly for this origin
    await context.grantPermissions(["geolocation"], {
      origin: "https://cod-order.myshopify.com",
    });

    await page.goto("https://cod-order.myshopify.com/");
    await page.locator("#password").fill("mit");
    await page.getByRole("button", { name: "Enter" }).click();

    await page.locator("#HeaderMenu-catalog").click();
    await page.getByRole("link", { name: "Freak 5 EP" }).click();
    await page.waitForLoadState("domcontentloaded");
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
    expect(page.locator("#cfpmodal")).toBeVisible();
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

    // Intercept the POST request and wait for the response
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
  test("Meetanshi Countdown Timer Bar", async ({ page }) => {
    await page.goto("https://countdown-bar.myshopify.com/");
    await page.locator("#password").fill("mit");
    await page.getByRole("button", { name: "Enter" }).click();
    await expect(page.locator("#textarea_message")).toBeVisible();
    await expect(page.locator("body")).toContainText(/New year sale is live/i);
  });
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
    await expect(links).toHaveCount(50); // Replace 8 with your expected count
  });
  test("MIT WhatsApp chat", async ({ page, context }) => {
    await page.goto("https://apps.shopify.com/search?q=meetanshi");
    await page.waitForLoadState("domcontentloaded");

    await page.getByRole("link", { name: "Meetanshi WhatsApp Chat" }).click();

    // Wait for the new tab to open after clicking "View demo store"
    const [newPage] = await Promise.all([
      context.waitForEvent("page"), // wait for popup
      page.getByRole("link", { name: "View demo store" }).click(),
    ]);
   // Assert the WhatsApp icon is visible
    await expect(newPage.locator(".fa.fa-whatsapp")).toBeVisible();
  });
});
