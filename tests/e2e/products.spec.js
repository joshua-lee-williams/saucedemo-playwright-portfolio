import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { ProductsPage } from "../../pages/ProductsPage";

test.describe("Products Page Tests", () => {
  let loginPage;
  let productsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);

    // Login before each test
    await loginPage.goto();
    await loginPage.loginAsStandardUser();

    // Wait for products page to load
    await expect(page).toHaveURL(/.*inventory.html/);
  });

  test("should display all products", async () => {
    const products = await productsPage.getProductNames();

    // Saucedemo has 6 products
    expect(products).toHaveLength(6);
  });

  test("should sort products A to Z", async () => {
    await productsPage.sortProducts("az");

    const products = await productsPage.getProductNames();
    const sortedProducts = [...products].sort();

    expect(products).toEqual(sortedProducts);
  });

  test("should sort products Z to A", async () => {
    await productsPage.sortProducts("za");

    const products = await productsPage.getProductNames();
    const sortedProducts = [...products].sort().reverse();

    expect(products).toEqual(sortedProducts);
  });

  test("should sort products by price low to high", async () => {
    await productsPage.sortProducts("lohi");

    const prices = await productsPage.getProductPrices();
    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sortedPrices);
  });

  test("should sort products by price high to low", async () => {
    await productsPage.sortProducts("hilo");

    const prices = await productsPage.getProductPrices();
    const sortedPrices = [...prices].sort((a, b) => b - a);

    expect(prices).toEqual(sortedPrices);
  });

  test("should add product to cart", async () => {
    // Initial cart should be empty
    expect(await productsPage.getCartCount()).toBe(0);

    // Add a product
    await productsPage.addProductToCart("Sauce Labs Backpack");

    // Cart should show 1 item
    expect(await productsPage.getCartCount()).toBe(1);
  });

  test("should add multiple products to cart", async () => {
    await productsPage.addProductToCart("Sauce Labs Backpack");
    await productsPage.addProductToCart("Sauce Labs Bike Light");
    await productsPage.addProductToCart("Sauce Labs Bolt T-Shirt");

    // Cart should show 3 items
    expect(await productsPage.getCartCount()).toBe(3);
  });

  test("should remove product from cart", async () => {
    // Add then remove a product
    await productsPage.addProductToCart("Sauce Labs Backpack");
    expect(await productsPage.getCartCount()).toBe(1);

    await productsPage.removeProductFromCart("Sauce Labs Backpack");
    expect(await productsPage.getCartCount()).toBe(0);
  });

  test("should get product details", async () => {
    const details = await productsPage.getProductDetails("Sauce Labs Backpack");

    expect(details.name).toBe("Sauce Labs Backpack");
    expect(details.description).toContain("carry.allTheThings()");
    expect(details.price).toContain("$29.99");
  });

  test("should navigate to cart page", async ({ page }) => {
    await productsPage.goToCart();

    await expect(page).toHaveURL(/.*cart.html/);
  });

  test("should logout successfully", async ({ page }) => {
    await productsPage.logout();

    // Should be back on login page
    await expect(page).toHaveURL("/");
  });
});
