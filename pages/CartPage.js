export class CartPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.pageTitle = page.locator(".title");
    this.cartItems = page.locator(".cart_item");
    this.cartQuantity = page.locator(".cart_quantity");
    this.continueShoppingButton = page.locator(
      '[data-test="continue-shopping"]'
    );
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.removeButtons = page.locator('button[class*="cart_button"]');
  }

  /**
   * Check if we're on the cart page
   */
  async isOnCartPage() {
    await this.pageTitle.waitFor();
    const title = await this.pageTitle.textContent();
    return title === "Your Cart";
  }

  /**
   * Get all items in cart
   */
  async getCartItems() {
    const count = await this.cartItems.count();
    const items = [];

    for (let i = 0; i < count; i++) {
      const item = this.cartItems.nth(i);
      const name = await item.locator(".inventory_item_name").textContent();
      const description = await item
        .locator(".inventory_item_desc")
        .textContent();
      const price = await item.locator(".inventory_item_price").textContent();
      const quantity = await item.locator(".cart_quantity").textContent();

      items.push({
        name,
        description,
        price,
        quantity: parseInt(quantity),
      });
    }

    return items;
  }

  /**
   * Get cart item count
   */
  async getCartItemCount() {
    return await this.cartItems.count();
  }

  /**
   * Get item names in cart
   */
  async getCartItemNames() {
    return await this.cartItems
      .locator(".inventory_item_name")
      .allTextContents();
  }

  /**
   * Get item prices in cart
   */
  async getCartItemPrices() {
    const prices = await this.cartItems
      .locator(".inventory_item_price")
      .allTextContents();
    return prices.map((price) => parseFloat(price.replace("$", "")));
  }

  /**
   * Remove item from cart by name
   */
  async removeItemByName(productName) {
    const item = this.page.locator(".cart_item", {
      has: this.page.locator(".inventory_item_name", { hasText: productName }),
    });
    await item.locator("button").click();
  }

  /**
   * Remove item from cart by index
   */
  async removeItemByIndex(index) {
    await this.cartItems.nth(index).locator("button").click();
  }

  /**
   * Remove all items from cart
   */
  async removeAllItems() {
    const count = await this.cartItems.count();
    for (let i = 0; i < count; i++) {
      // Always remove the first item since the list updates
      await this.cartItems.first().locator("button").click();
    }
  }

  /**
   * Check if cart is empty
   */
  async isCartEmpty() {
    return (await this.cartItems.count()) === 0;
  }

  /**
   * Continue shopping
   */
  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  /**
   * Proceed to checkout
   */
  async proceedToCheckout() {
    await this.checkoutButton.click();
  }

  /**
   * Verify item exists in cart
   */
  async hasItem(productName) {
    const items = await this.getCartItemNames();
    return items.includes(productName);
  }

  /**
   * Get total of all items (sum of prices)
   */
  async calculateItemsTotal() {
    const prices = await this.getCartItemPrices();
    return prices.reduce((sum, price) => sum + price, 0);
  }
}
