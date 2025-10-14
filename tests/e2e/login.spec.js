import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { ProductsPage } from "../../pages/ProductsPage";
import { users } from "../../fixtures/testData.js";

test.describe("Login Tests", () => {
  let loginPage;
  let productsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    await loginPage.goto();
  });

  test("should login successfully with valid credentials", async ({ page }) => {
    await loginPage.login(users.standard.username, users.standard.password);

    // Verify we're on the products page
    await expect(page).toHaveURL(/.*inventory.html/);
    expect(await productsPage.isOnProductsPage()).toBeTruthy();
  });

  test("should show error for invalid username", async () => {
    await loginPage.login(users.invalid.username, users.invalid.password);

    // Verify error message appears
    expect(await loginPage.isErrorVisible()).toBeTruthy();
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain("Username and password do not match");
  });

  test("should show error for invalid password", async () => {
    await loginPage.login(users.standard.username, users.invalid.password);

    // Verify error message appears
    expect(await loginPage.isErrorVisible()).toBeTruthy();
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain("Username and password do not match");
  });

  test("should show error for empty username", async () => {
    await loginPage.login("", "secret_sauce");

    // Verify error message appears
    expect(await loginPage.isErrorVisible()).toBeTruthy();
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain("Username is required");
  });

  test("should show error for empty password", async () => {
    await loginPage.login("standard_user", "");

    // Verify error message appears
    expect(await loginPage.isErrorVisible()).toBeTruthy();
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain("Password is required");
  });

  test("should show error for locked out user", async () => {
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);

    // Verify error message appears
    expect(await loginPage.isErrorVisible()).toBeTruthy();
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain("Sorry, this user has been locked out");
  });

  test("should clear error message when clicking X button", async () => {
    await loginPage.login(users.invalid.username, users.invalid.password);

    // Verify error appears
    expect(await loginPage.isErrorVisible()).toBeTruthy();

    // Clear error
    await loginPage.clearError();

    // Verify error is gone
    expect(await loginPage.isErrorVisible()).toBeFalsy();
  });

  test("should allow multiple login attempts", async ({ page }) => {
    // First failed attempt
    await loginPage.login("wrong_user", "wrong_pass");
    expect(await loginPage.isErrorVisible()).toBeTruthy();

    // Clear and try again with correct credentials
    await loginPage.clearError();
    await loginPage.login(users.standard.username, users.standard.password);

    // Should succeed
    await expect(page).toHaveURL(/.*inventory.html/);
  });
});
