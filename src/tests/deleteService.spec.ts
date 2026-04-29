import { test, expect } from '@playwright/test';
import DeleteServicePage from '../pages/DeleteServicePage';
import AddServicePage from '../pages/AddServicePage';
import { getServiceNamesFromTable } from '../utils/serviceTable';

test.describe('Delete Service', () => {
  test('should delete an existing service', async ({ page }) => {
    await page.goto('/');

    const add = new AddServicePage(page);
    const del = new DeleteServicePage(page);

    await add.openAppointmentScheduling();
    await add.openManageServices();

    // get all services from table
    const serviceNames = Array.from(await getServiceNamesFromTable(page));

    // check length
    expect(serviceNames.length).toBeGreaterThan(0);

    // pick random service
    const randomServiceName =
      serviceNames[Math.floor(Math.random() * serviceNames.length)];

    console.log("Service names: ", serviceNames);
    console.log("Random Service: ", randomServiceName);

    // delete service
    const result = await del.deleteService(randomServiceName);
    console.log(result);

    // refresh list after delete
    const serviceNamesInTable = Array.from(await getServiceNamesFromTable(page));
    

    console.log("Updated service names: ", serviceNamesInTable);

    // Assertion
    expect(serviceNamesInTable.includes(randomServiceName)).toBeFalsy();
    await expect(page.locator(`text=${randomServiceName}`)).toHaveCount(0);
  });
});
