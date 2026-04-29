import BasePage from './BasePage';
import { Page, expect } from '@playwright/test';
import { pageNumberForEditService } from '../utils/serviceTable';

export default class DeleteServicePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  deleteButtonFor = (name: string) =>
    this.page.locator(`//tr[.//td[contains(normalize-space(.), '${name}')]]//i[@title='Delete']`);

  modalLocator = this.page.locator("//div[contains(@class,'simplemodal-wrap')]");
  confirmButton = "button.confirm";

  async deleteService(serviceName: string): Promise<string> {
    // 1. Check pagination / existence
    const pageNum = await pageNumberForEditService(this.page, serviceName);

    if (pageNum === 0) {
      return `Service '${serviceName}' not found in table`;
    }

    // 2. Click delete
    const deleteBtn = this.deleteButtonFor(serviceName);
    await expect(deleteBtn).toBeVisible();
    await deleteBtn.click();

    // 3. Handle modal
    const modal = this.modalLocator;

    await expect(modal).toBeVisible();

    const confirmBtn = modal.locator(this.confirmButton);
    await expect(confirmBtn).toBeVisible();

    await confirmBtn.click();

    await expect(modal).toBeHidden();

    // 4. Handle toast (optional but safe)
    const toast = this.page.locator(
      "div[class*='toast'], div[class*='notification']"
    );

    if (await toast.first().isVisible().catch(() => false)) {
      console.log("Toast:", await toast.textContent());
      await expect(toast).toBeHidden({ timeout: 10000 });
    }

    return `Service '${serviceName}' deleted successfully`;
  }
}
