import { users } from "../fixtures/testData.js";

export class LoginPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
    this.errorButton = page.locator(".error-button");
  }

  /**
   * Navigate to the login page
   */
  async goto() {
    await this.page.goto("/");
  }

  /**
   * Perform login with credentials
   */
  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Get error message text
   */
  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }

  /**
   * Check if error message is visible
   */
  async isErrorVisible() {
    return await this.errorMessage.isVisible();
  }

  /**
   * Clear the error message by clicking X button
   */
  async clearError() {
    await this.errorButton.click();
  }

  /**
   * Quick login helper for standard user
   */
  async loginAsStandardUser() {
    await this.login(users.standard.username, users.standard.password);
  }
}
