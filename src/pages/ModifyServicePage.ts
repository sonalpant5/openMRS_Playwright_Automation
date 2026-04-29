import BasePage from './BasePage';
import { Page, expect } from '@playwright/test';
import { pageNumberForEditService } from '../utils/serviceTable';
import { randomService } from '../utils/randomData';

export default class ModifyServicePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  serviceNameInput = this.page.locator('#name-field');
  durationInput = this.page.locator('#duration-field');
  descriptionInput = this.page.locator('#description-field');
  saveButton = this.page.locator('#save-button');

  editButtonFor = (name: string) =>
    `//tr[.//td[normalize-space(.) = '${name}']]//i[contains(@id,'edit')]`;

  async editServiceDetails(serviceName: string): Promise<string | null> {

    const pageNum = await pageNumberForEditService(this.page, serviceName);

    if (pageNum === 0) {
      console.log(`Service not found: ${serviceName}`);
      return null;
    }

    const editBtn = this.page.locator(this.editButtonFor(serviceName));
    await expect(editBtn).toBeVisible();
    await editBtn.click();

    const newServiceName = randomService().name;

    await this.serviceNameInput.fill(newServiceName);
    await this.durationInput.fill('30');
    await this.descriptionInput.fill(randomService().description);

    await this.saveButton.click();

    const toast = this.page.locator(
      "div[class*='toast'], div[class*='notification']"
    );

    if (await toast.first().isVisible().catch(() => false)) {
      await expect(toast).toBeHidden({ timeout: 10000 });
    }

    console.log("Service edited successfully:", newServiceName);

    return newServiceName;
  }
}
