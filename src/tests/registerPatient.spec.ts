import { test } from '@playwright/test';
import RegisterPatientPage from '../pages/RegisterPatientPage';
import { randomPatient } from '../utils/randomData';

test.describe('Register Patient', () => {
  test('should successfully register a new patient', async ({ page }) => {

    await page.goto("/referenceapplication/home.page");

    const registerPatientPage = new RegisterPatientPage(page);
    const testPatient = randomPatient();

    await registerPatientPage.navigateToRegisterPatient();

    await registerPatientPage.enterBasicInfo(
      testPatient.givenName,
      testPatient.familyName,
      testPatient.middleName
    );

    await registerPatientPage.selectGender(testPatient.gender);

    await registerPatientPage.enterDateOfBirth(
      testPatient.day,
      testPatient.month,
      testPatient.year
    );

    await registerPatientPage.enterAddress(
      testPatient.address,
      testPatient.cityVillage,
      testPatient.country,
      testPatient.address2,
      testPatient.state,
      testPatient.postalCode
    );

    await registerPatientPage.enterPhoneNumber(testPatient.phoneNumber);

    await registerPatientPage.enterRelationship(
      testPatient.relationship,
      testPatient.relatedPersonName
    );

    await registerPatientPage.confirmRegistration();

    const expectedName =
      `${testPatient.givenName} ${testPatient.familyName}`;

    await registerPatientPage.verifyRegistrationSuccess(expectedName);
  });
});
