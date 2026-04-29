import { chromium, firefox, webkit, FullConfig } from '@playwright/test';
import { ENV } from '../utils/env';


export default async function globalSetup(config: FullConfig) {
  const project = config.projects[0];

  let browserType = chromium;
  if (project.name === 'firefox') browserType = firefox;
  if (project.name === 'webkit') browserType = webkit;

  const browser = await browserType.launch();
  const page = await browser.newPage();

  // LOGIN (direct, no Page Object dependency)
  await page.goto(ENV.baseURL);

  await page.getByRole('textbox', { name: 'Username:' }).fill(ENV.username);
  await page.getByRole('textbox', { name: 'Password:' }).fill(ENV.password);

  await page.locator(`//li[@id="Inpatient Ward"]`).click();

  await page.getByRole('button', { name: 'Log In' }).click();

  await page.waitForURL(/home.page/);

  await page.context().storageState({
    path: 'storageState.json',
  });

  await browser.close();
}
