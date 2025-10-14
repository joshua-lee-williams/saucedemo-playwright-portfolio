export class CheckoutPage {
  constructor(page) {
    this.page = page;

    // Step 1: Your Information
    this.pageTitle = page.locator(".title");
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.errorMessage = page.locator('[data-test="error"]');

    // Step 2: Overview
    this.cartItems = page.locator(".cart_item");
    this.subtotal = page.locator(".summary_subtotal_label");
    this.tax = page.locator(".summary_tax_label");
    this.total = page.locator(".summary_total_label");
    this.finishButton = page.locator('[data-test="finish"]');
    this.paymentInfo = page.locator(".summary_value_label").first();
    this.shippingInfo = page.locator(".summary_value_label").nth(1);

    // Step 3: Complete
    this.completeHeader = page.locator(".complete-header");
    this.completeText = page.locator(".complete-text");
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  /**
   * Check current page title
   */
  async getPageTitle() {
    return await this.pageTitle.textContent();
  }

  /**
   * Fill checkout information
   */
  async fillCheckoutInformation(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  /**
   * Click continue button
   */
  async clickContinue() {
    await this.continueButton.click();
  }

  /**
   * Click cancel button
   */
  async clickCancel() {
    await this.cancelButton.click();
  }

  /**
   * Complete checkout step 1 (information)
   */
  async completeInformationStep(firstName, lastName, postalCode) {
    await this.fillCheckoutInformation(firstName, lastName, postalCode);
    await this.clickContinue();
  }

  /**
   * Get error message
   */
  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  /**
   * Check if error is visible
   */
  async isErrorVisible() {
    return await this.errorMessage.isVisible();
  }

  /**
   * Get items in checkout overview
   */
  async getOverviewItems() {
    const count = await this.cartItems.count();
    const items = [];

    for (let i = 0; i < count; i++) {
      const item = this.cartItems.nth(i);
      const name = await item.locator(".inventory_item_name").textContent();
      const price = await item.locator(".inventory_item_price").textContent();
      const quantity = await item.locator(".cart_quantity").textContent();

      items.push({
        name,
        price,
        quantity: parseInt(quantity),
      });
    }

    return items;
  }

  /**
   * Get subtotal amount
   */
  async getSubtotal() {
    const text = await this.subtotal.textContent();
    // Extract number from "Item total: $XX.XX"
    const match = text.match(/\$(\d+\.?\d*)/);
    return match ? parseFloat(match[1]) : 0;
  }

  /**
   * Get tax amount
   */
  async getTax() {
    const text = await this.tax.textContent();
    // Extract number from "Tax: $XX.XX"
    const match = text.match(/\$(\d+\.?\d*)/);
    return match ? parseFloat(match[1]) : 0;
  }

  /**
   * Get total amount
   */
  async getTotal() {
    const text = await this.total.textContent();
    // Extract number from "Total: $XX.XX"
    const match = text.match(/\$(\d+\.?\d*)/);
    return match ? parseFloat(match[1]) : 0;
  }

  /**
   * Get payment information
   */
  async getPaymentInfo() {
    return await this.paymentInfo.textContent();
  }

  /**
   * Get shipping information
   */
  async getShippingInfo() {
    return await this.shippingInfo.textContent();
  }

  /**
   * Click finish button
   */
  async clickFinish() {
    await this.finishButton.click();
  }

  /**
   * Verify order completion
   */
  async isOrderComplete() {
    return await this.completeHeader.isVisible();
  }

  /**
   * Get completion header text
   */
  async getCompleteHeader() {
    return await this.completeHeader.textContent();
  }

  /**
   * Get completion message text
   */
  async getCompleteText() {
    return await this.completeText.textContent();
  }

  /**
   * Click back home button
   */
  async clickBackHome() {
    await this.backHomeButton.click();
  }

  /**
   * Complete entire checkout flow
   */
  async completeCheckout(firstName, lastName, postalCode) {
    // Step 1: Information
    await this.completeInformationStep(firstName, lastName, postalCode);

    // Step 2: Overview - click finish
    await this.clickFinish();
  }

  /**
   * Verify checkout calculations
   */
  async verifyCheckoutCalculations() {
    const subtotal = await this.getSubtotal();
    const tax = await this.getTax();
    const total = await this.getTotal();

    // Total should equal subtotal + tax (with small floating point tolerance)
    const calculatedTotal = Math.round((subtotal + tax) * 100) / 100;
    const actualTotal = Math.round(total * 100) / 100;

    return calculatedTotal === actualTotal;
  }
}
