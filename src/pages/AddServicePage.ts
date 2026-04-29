import BasePage from './BasePage';
import { Page , expect} from '@playwright/test';
import { randomService } from '../utils/randomData';

export default class AddServicePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  newServiceButton = this.page.getByRole('button', { name: 'New service type' });
  nameInput = this.page.locator('#name-field');
  durationInput = this.page.locator('#duration-field');
  descriptionInput = this.page.locator('#description-field');
  saveButton = this.page.getByRole('button', { name: 'Save' });
  appointmentSchedulingLink = this.page.getByText('Appointment Scheduling', { exact: true });
  //this.page.getByRole('link', { name: 'Appointment Scheduling' });
  manageServicesLink = this.page.getByText('Manage Service Types', { exact: true });
  //this.page.getByRole('link', { name: 'Manage Service Types' })

  async openAppointmentScheduling() {
   
    await this.page.waitForLoadState('networkidle');
    await expect(this.appointmentSchedulingLink).toBeVisible();
    await this.click(this.appointmentSchedulingLink);
  }

  async openManageServices() {
    await this.page.waitForLoadState('networkidle');
    await expect(this.manageServicesLink).toBeVisible();
    await this.click(this.manageServicesLink);
  }

  // returns final service name (handles duplicate name flow)
  async addService(name: string, duration: string, description: string): Promise<string> {
    await this.click(this.newServiceButton);
    await this.fill(this.nameInput, name);
    if (duration) await this.fill(this.durationInput, duration);
    if (description) await this.fill(this.descriptionInput, description);
    await this.click(this.saveButton);

    // handle duplicate name message
    const duplicateLocator = this.page.locator("//form[@id='appointmentTypeForm']//span[normalize-space()='Name is duplicated']");
    if (await duplicateLocator.count() > 0) {
      if (await duplicateLocator.isVisible()) {
        const { name: newName } = randomService();
        await this.fill(this.nameInput, newName);
        await this.click(this.saveButton);
        return newName;
      }
    }
    return name;
  }
}
