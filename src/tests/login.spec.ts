import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import { ENV } from '../utils/env';

test.describe('Login', () => {
  test.use({storageState: undefined,contextOptions: {
  storageState: undefined
  }
});
  test('should log in with valid credentials', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(ENV.username, ENV.password, "Inpatient Ward");
    await expect(page).toHaveURL(/home.page/);
  });
});
