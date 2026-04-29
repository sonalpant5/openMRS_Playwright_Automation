import BasePage from './BasePage';
import { Page, expect } from '@playwright/test';

export default class RegisterPatientPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Navigation
  registerPatientLink = this.page.getByRole('link', { name: 'Register a patient' })

  // Step 1: Basic Information - Form fields within the registration form
  givenNameInput = this.page.getByRole('textbox', { name: 'Given (required)' });
  middleNameInput = this.page.getByRole('textbox', { name: 'Middle' });
  familyNameInput = this.page.getByRole('textbox', { name: 'Family Name (required)' });

  // Navigation button - green arrow/next button
  nextButton = this.page.locator('#next-button');

  // Step 2: Gender - Select/dropdown for gender
  genderDropdown = this.page.locator('select').first();

  // Step 3: Date of Birth
  dayInput = this.page.getByRole('textbox', { name: 'Day (required)' })
  monthDropdown = this.page.getByRole('combobox', { name: 'Month (required)' })
  yearInput = this.page.getByRole('textbox', { name: 'Year (required)' })

  // Step 4: Address
  addressInput = this.page.locator('#address1');
  address2Input = this.page.locator('#address2');
  cityInput = this.page.locator('#cityVillage');
  stateInput = this.page.locator('#stateProvince');
  countryInput = this.page.locator('#country');
  postalCodeInput = this.page.locator('#postalCode');

  // Step 5: Contact Information
  phoneInput = this.page.locator('[name="phoneNumber"]');

  // Step 6: Relationship
  relationshipDropdown = this.page.locator('[name="relationship_type"]')
  relatedPersonNameInput = this.page.locator('#relationship').getByPlaceholder('Person Name')

  // Confirmation
  confirmButton = this.page.getByRole('button', { name: 'Confirm' })
  successMessage = this.page.locator('//div[contains(@class, "alert-success")] | //div[contains(@class, "success-message")]');
  patientNameDisplay = this.page.locator('//h2 | //h1 | //div[contains(@class, "patient-name")]');

  async navigateToRegisterPatient() {
    await this.page.waitForLoadState('networkidle');
    await expect(this.registerPatientLink).toBeVisible();
    await this.click(this.registerPatientLink);
    await this.page.waitForLoadState('networkidle');
    // Wait for the form to load
    await this.page.waitForSelector('input', { timeout: 5000 }).catch(() => { });
  }

  async enterBasicInfo(givenName: string, familyName: string, middleName?: string) {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(500); // Wait for form to render

    await this.fill(this.givenNameInput, givenName);

    if (middleName) {
      await this.fill(this.middleNameInput, middleName);
    }

    await this.fill(this.familyNameInput, familyName);
    await this.click(this.nextButton);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(500);
  }

  async selectGender(gender: 'Male' | 'Female') {
    await this.page.waitForLoadState('networkidle');
    await this.click(this.genderDropdown);
    await this.page.getByRole('option', { name: gender, exact: true }).click().catch(() => {
      // Fallback if exact match doesn't work
      return this.genderDropdown.selectOption(gender);
    });
    await this.click(this.nextButton);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(500);
  }

  async enterDateOfBirth(day: string, month: string, year: string) {
    await this.dayInput.clear();
    await this.dayInput.fill(day);

    await this.monthDropdown.selectOption({ value: month });

    await this.yearInput.clear();
    await this.yearInput.fill(year);

    await this.click(this.nextButton);
  }


  async enterAddress(
    address: string,
    cityVillage: string,
    country: string,
    address2?: string,
    state?: string,
    postalCode?: string
  ) {
    await this.page.waitForLoadState('networkidle');
    await this.fill(this.addressInput, address);

    if (address2) {
      await this.fill(this.address2Input, address2);
    }

    await this.fill(this.cityInput, cityVillage);

    if (state) {
      await this.fill(this.stateInput, state);
    }

    if (country) {
      await this.fill(this.countryInput, country);
    }

    if (postalCode) {
      await this.fill(this.postalCodeInput, postalCode);
    }

    await this.click(this.nextButton);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(500);
  }

  async enterPhoneNumber(phoneNumber: string) {
    await this.page.waitForLoadState('networkidle');
    await this.fill(this.phoneInput, phoneNumber);

    await this.click(this.nextButton);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(500);
  }

  async enterRelationship(relationship: string, personName: string) {
    await this.relationshipDropdown.selectOption({ label: relationship });

    await this.relatedPersonNameInput.fill(personName);

    await this.click(this.nextButton);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(500);
  }


  async confirmRegistration() {
    await this.page.waitForLoadState('networkidle');
    await expect(this.confirmButton).toBeVisible({ timeout: 10000 });
    await this.click(this.confirmButton);
    await this.page.waitForLoadState('networkidle');
  }

async verifyRegistrationSuccess(expectedName: string) {
  // Wait for navigation to patient page
  await this.page.waitForURL(/patient\.page/);

  // Small stability wait (ONLY if UI is slow in OpenMRS)
  await this.page.waitForLoadState('networkidle');

  const bodyText = await this.page.locator('body').innerText();

  const actual = bodyText.replace(/\s+/g, ' ').trim();
  const expected = expectedName.replace(/\s+/g, ' ').trim();

  expect(actual).toContain(expected);
}


}