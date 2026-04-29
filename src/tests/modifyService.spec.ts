import { test, expect } from '@playwright/test';
import ModifyServicePage from '../pages/ModifyServicePage';
import AddServicePage from '../pages/AddServicePage';
import { randomService } from '../utils/randomData';
import { getServiceNamesFromTable } from '../utils/serviceTable';

test.describe('Modify Service', () => {
  test('should modify service data', async ({ page }) => {

    const add = new AddServicePage(page);
    const modify = new ModifyServicePage(page);
    const svc = randomService();

    await page.goto('/');

    await add.openAppointmentScheduling();
    await add.openManageServices();

    // Get services
    const serviceNames = Array.from(await getServiceNamesFromTable(page));
    expect(serviceNames.length).toBeGreaterThan(0);

    const randomServiceName =
      serviceNames[Math.floor(Math.random() * serviceNames.length)];

    console.log("Selected Service:", randomServiceName);

    // ✔ SINGLE EDIT ONLY
    const updatedName = await modify.editServiceDetails(randomServiceName);

    expect(updatedName).not.toBeNull();

    // Wait for UI refresh (IMPORTANT)
    await page.waitForTimeout(1000);

    // Refresh table AFTER update
    const updatedTable = Array.from(await getServiceNamesFromTable(page));

    console.log("Updated Table:", updatedTable);

    // ✔ FINAL ASSERTION
    expect(updatedTable.includes(updatedName!)).toBeTruthy();
  });
});
