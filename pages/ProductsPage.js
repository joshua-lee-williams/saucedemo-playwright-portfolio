export class ProductsPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.pageTitle = page.locator(".title");
    this.inventoryItems = page.locator(".inventory_item");
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.shoppingCartBadge = page.locator(".shopping_cart_badge");
    this.shoppingCartLink = page.locator(".shopping_cart_link");
    this.burgerMenu = page.locator("#react-burger-menu-btn");
    this.logoutLink = page.locator("#logout_sidebar_link");
  }

  /**
   * Check if we're on the products page
   */
  async isOnProductsPage() {
    await this.pageTitle.waitFor();
    const title = await this.pageTitle.textContent();
    return title === "Products";
  }

  /**
   * Get all product names
   */
  async getProductNames() {
    const products = await this.inventoryItems
      .locator(".inventory_item_name")
      .allTextContents();
    return products;
  }

  /**
   * Get all product prices
   */
  async getProductPrices() {
    const prices = await this.inventoryItems
      .locator(".inventory_item_price")
      .allTextContents();
    return prices.map((price) => parseFloat(price.replace("$", "")));
  }

  /**
   * Add product to cart by name
   */
  async addProductToCart(productName) {
    const product = this.page.locator(".inventory_item", {
      has: this.page.locator(".inventory_item_name", { hasText: productName }),
    });
    await product.locator("button").click();
  }

  /**
   * Add product to cart by index (0-based)
   */
  async addProductToCartByIndex(index) {
    await this.inventoryItems.nth(index).locator("button").click();
  }

  /**
   * Remove product from cart by name
   */
  async removeProductFromCart(productName) {
    const product = this.page.locator(".inventory_item", {
      has: this.page.locator(".inventory_item_name", { hasText: productName }),
    });
    await product.locator("button").click();
  }

  /**
   * Get cart badge count
   */
  async getCartCount() {
    if (await this.shoppingCartBadge.isVisible()) {
      return parseInt(await this.shoppingCartBadge.textContent());
    }
    return 0;
  }

  /**
   * Click on shopping cart
   */
  async goToCart() {
    await this.shoppingCartLink.click();
  }

  /**
   * Sort products
   * Options: 'az' | 'za' | 'lohi' | 'hilo'
   */
  async sortProducts(sortOption) {
    await this.sortDropdown.selectOption(sortOption);
  }

  /**
   * Logout
   */
  async logout() {
    await this.burgerMenu.click();
    await this.logoutLink.click();
  }

  /**
   * Get product details by name
   */
  async getProductDetails(productName) {
    const product = this.page.locator(".inventory_item", {
      has: this.page.locator(".inventory_item_name", { hasText: productName }),
    });

    const name = await product.locator(".inventory_item_name").textContent();
    const description = await product
      .locator(".inventory_item_desc")
      .textContent();
    const price = await product.locator(".inventory_item_price").textContent();

    return { name, description, price };
  }
}
