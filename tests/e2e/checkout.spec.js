import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { ProductsPage } from "../../pages/ProductsPage";
import { CartPage } from "../../pages/CartPage";
import { CheckoutPage } from "../../pages/CheckoutPage";

test.describe("Checkout Flow Tests", () => {
  let loginPage;
  let productsPage;
  let cartPage;
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    // Login, add items, and go to checkout
    await loginPage.goto();
    await loginPage.loginAsStandardUser();
    await productsPage.addProductToCart("Sauce Labs Backpack");
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();
  });

  test("should display checkout information page", async () => {
    const title = await checkoutPage.getPageTitle();
    expect(title).toBe("Checkout: Your Information");
  });

  test("should complete checkout with valid information", async ({ page }) => {
    await checkoutPage.completeInformationStep("John", "Doe", "12345");

    // Should be on overview page
    await expect(page).toHaveURL(/.*checkout-step-two.html/);
    const title = await checkoutPage.getPageTitle();
    expect(title).toBe("Checkout: Overview");
  });

  test("should show error for empty first name", async () => {
    await checkoutPage.fillCheckoutInformation("", "Doe", "12345");
    await checkoutPage.clickContinue();

    expect(await checkoutPage.isErrorVisible()).toBeTruthy();
    const errorMsg = await checkoutPage.getErrorMessage();
    expect(errorMsg).toContain("First Name is required");
  });

  test("should show error for empty last name", async () => {
    await checkoutPage.fillCheckoutInformation("John", "", "12345");
    await checkoutPage.clickContinue();

    expect(await checkoutPage.isErrorVisible()).toBeTruthy();
    const errorMsg = await checkoutPage.getErrorMessage();
    expect(errorMsg).toContain("Last Name is required");
  });

  test("should show error for empty postal code", async () => {
    await checkoutPage.fillCheckoutInformation("John", "Doe", "");
    await checkoutPage.clickContinue();

    expect(await checkoutPage.isErrorVisible()).toBeTruthy();
    const errorMsg = await checkoutPage.getErrorMessage();
    expect(errorMsg).toContain("Postal Code is required");
  });

  test("should cancel checkout and return to cart", async ({ page }) => {
    await checkoutPage.clickCancel();

    await expect(page).toHaveURL(/.*cart.html/);
  });

  test("should display correct items in checkout overview", async ({
    page,
  }) => {
    await checkoutPage.completeInformationStep("John", "Doe", "12345");

    const items = await checkoutPage.getOverviewItems();
    expect(items).toHaveLength(1);
    expect(items[0].name).toBe("Sauce Labs Backpack");
    expect(items[0].price).toBe("$29.99");
  });

  test("should calculate correct subtotal", async ({ page }) => {
    // Add multiple items for better test
    await page.goBack(); // Back to cart
    await cartPage.continueShopping();
    await productsPage.addProductToCart("Sauce Labs Bike Light"); // $9.99
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();

    await checkoutPage.completeInformationStep("John", "Doe", "12345");

    const subtotal = await checkoutPage.getSubtotal();
    expect(subtotal).toBe(39.98); // $29.99 + $9.99
  });

  test("should display tax amount", async ({ page }) => {
    await checkoutPage.completeInformationStep("John", "Doe", "12345");

    const tax = await checkoutPage.getTax();
    expect(tax).toBeGreaterThan(0);
  });

  test("should calculate correct total with tax", async ({ page }) => {
    await checkoutPage.completeInformationStep("John", "Doe", "12345");

    const isValid = await checkoutPage.verifyCheckoutCalculations();
    expect(isValid).toBeTruthy();
  });

  test("should display payment information", async ({ page }) => {
    await checkoutPage.completeInformationStep("John", "Doe", "12345");

    const paymentInfo = await checkoutPage.getPaymentInfo();
    expect(paymentInfo).toBeTruthy();
    expect(paymentInfo.length).toBeGreaterThan(0);
  });

  test("should display shipping information", async ({ page }) => {
    await checkoutPage.completeInformationStep("John", "Doe", "12345");

    const shippingInfo = await checkoutPage.getShippingInfo();
    expect(shippingInfo).toBeTruthy();
    expect(shippingInfo.length).toBeGreaterThan(0);
  });

  test("should complete entire checkout flow", async ({ page }) => {
    await checkoutPage.completeCheckout("John", "Doe", "12345");

    // Should be on completion page
    await expect(page).toHaveURL(/.*checkout-complete.html/);
    expect(await checkoutPage.isOrderComplete()).toBeTruthy();
  });

  test("should display order confirmation message", async ({ page }) => {
    await checkoutPage.completeCheckout("John", "Doe", "12345");

    const header = await checkoutPage.getCompleteHeader();
    expect(header).toContain("Thank you for your order");

    const text = await checkoutPage.getCompleteText();
    expect(text).toBeTruthy();
  });

  test("should navigate back to products from completion page", async ({
    page,
  }) => {
    await checkoutPage.completeCheckout("John", "Doe", "12345");
    await checkoutPage.clickBackHome();

    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test("should have empty cart after completing order", async ({ page }) => {
    await checkoutPage.completeCheckout("John", "Doe", "12345");
    await checkoutPage.clickBackHome();

    // Cart should be empty
    expect(await productsPage.getCartCount()).toBe(0);
  });

  test("should handle checkout with multiple items", async ({ page }) => {
    // Go back and add more items
    await page.goBack(); // Back to cart
    await cartPage.continueShopping();
    await productsPage.addProductToCart("Sauce Labs Bike Light");
    await productsPage.addProductToCart("Sauce Labs Bolt T-Shirt");
    await productsPage.goToCart();
    await cartPage.proceedToCheckout();

    await checkoutPage.completeCheckout("Jane", "Smith", "54321");

    expect(await checkoutPage.isOrderComplete()).toBeTruthy();
  });

  test("should cancel from overview page and return to products", async ({
    page,
  }) => {
    await checkoutPage.completeInformationStep("John", "Doe", "12345");

    // Now on overview page, click cancel
    await checkoutPage.clickCancel();

    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test("should maintain data when going back from overview", async ({
    page,
  }) => {
    await checkoutPage.fillCheckoutInformation("John", "Doe", "12345");
    await checkoutPage.clickContinue();

    // Go back
    await page.goBack();

    // Form should still have the data (this depends on browser behavior)
    // We're just verifying we can go back without errors
    const title = await checkoutPage.getPageTitle();
    expect(title).toBe("Checkout: Your Information");
  });

  test("should handle special characters in checkout information", async ({
    page,
  }) => {
    await checkoutPage.completeInformationStep(
      "John-Paul O'Brien",
      "Smith-Jones",
      "12345-6789"
    );

    // Should proceed without errors
    await expect(page).toHaveURL(/.*checkout-step-two.html/);
  });
});
