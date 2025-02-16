import { expect, Locator, Page } from '@playwright/test';

export class InputFormPage {
  readonly page: Page;
  readonly formTitle: Locator;
  readonly copyButton: Locator;
  readonly copiedAlert: Locator;
  readonly consolidatedInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.formTitle = page.locator('[data-testid="form-title"]');
    this.copyButton = page.locator('[data-testid="copy-button"]');
    this.copiedAlert = page.locator('[data-testid="copied-alert"]');
    this.consolidatedInput = page.locator(
      '[data-testid="consolidated-input-text"]'
    );
  }

  // Helper method to target dynamic input fields
  inputField(key: string): Locator {
    return this.page.locator(`[data-testid="input-${key}"]`);
  }

  // Actions
  async fillInputField(key: string, value: string) {
    const inputField = this.inputField(key);
    await inputField.fill(value);
  }

  async clickCopyButton() {
    await this.copyButton.click();
  }

  async getConsolidatedInputText() {
    return await this.consolidatedInput.textContent();
  }

  async isCopiedAlertVisible() {
    return this.copiedAlert.isVisible();
  }

  async getFormTitle() {
    return await this.formTitle.textContent();
  }

  // Get the value of a specific input field
  async getInputFieldValue(key: string) {
    const inputField = this.inputField(key);
    return await inputField.inputValue();
  }
}
