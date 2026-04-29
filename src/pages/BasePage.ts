import { Page, Locator, expect } from '@playwright/test';

export default class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected locator(selector: string): Locator {
    return this.page.locator(selector);
  }

  async click(locator: Locator) {
    await locator.click();
  }

async fill(locator: Locator, value: string) {
  await locator.fill(value);
}

  async getText(selector: string) {
    return await this.locator(selector).innerText();
  }

  async waitForVisible(selector: string, timeout = 5000) {
    await expect(this.locator(selector)).toBeVisible({ timeout });
  }
}
