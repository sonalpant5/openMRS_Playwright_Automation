import { test, expect } from '@playwright/test';
import AddServicePage from '../pages/AddServicePage';
import { randomService } from '../utils/randomData';
import { getServiceNamesFromTable } from '../utils/serviceTable';

test.describe('Add Service', () => {
  test('should create a new service', async ({ page }) => {
    await page.goto("/referenceapplication/home.page");
    const add = new AddServicePage(page);
    const svc = randomService();
    await add.openAppointmentScheduling();
    await add.openManageServices();
    const newServiceName = await add.addService(svc.name, '30', svc.description);
    const serviceNamesInTable = await getServiceNamesFromTable(page);
    console.log("new service: ", newServiceName);
    console.log("serviceNamesInTable: ", serviceNamesInTable);
    expect(serviceNamesInTable.has(newServiceName)).toBeTruthy();
    
  });
});
