import { Page } from '@playwright/test';

export async function getServiceNamesFromTable(page: Page): Promise<Set<string>> {
  const names = new Set<string>();
  let nextEnabled = true;

  // Wait for page to fully load after any navigation
  await page.waitForLoadState('networkidle').catch(() => {});

  // Try to navigate from first page if available
  try {
    const first = page.locator('#appointmentTypesTable_first');
    if (await first.count() && (await first.isVisible())) {
      await first.click().catch(() => {});
    }
  } catch (e) {}

  do {
    await page.waitForSelector('//tbody//tr/td[1]', { timeout: 3000 }).catch(() => {});
    const cells = await page.locator('//tbody//tr/td[1]').allTextContents();
    for (const c of cells) {
      const s = c.trim();
      if (s) names.add(s);
    }

    const nextBtn = page.locator('#appointmentTypesTable_next');
    if (!(await nextBtn.count())) break;
    const classAttr = await nextBtn.getAttribute('class');
    nextEnabled = !(classAttr || '').includes('disabled');
    if (nextEnabled) {
      await nextBtn.click();
      await page.waitForTimeout(500);
    }
  } while (nextEnabled);

  return names;
}

export async function pageNumberForEditService(page: Page, serviceName: string): Promise<number> {
  let pageNumber = 1;
  // move to first if exists
  try {
    const first = page.locator('#appointmentTypesTable_first');
    if (await first.count() && (await first.isVisible())) {
      await first.click().catch(() => {});
      await page.waitForSelector('//tbody//tr', { timeout: 3000 }).catch(() => {});
      pageNumber = 1;
    }
  } catch (e) {}

  while (true) {
    const rows = await page.locator('//tbody//tr').elementHandles();
    for (const row of rows) {
      const cells = await row.$$('td');
      for (const cell of cells) {
        const txt = (await cell.innerText()).trim();
        if (txt.replace('\u00A0', ' ').toLowerCase() === serviceName.trim().toLowerCase()) {
          return pageNumber;
        }
      }
    }

    const nextBtn = page.locator('#appointmentTypesTable_next');
    if (!(await nextBtn.count())) break;
    const classAttr = await nextBtn.getAttribute('class');
    const nextEnabled = !(classAttr || '').includes('disabled');
    if (!nextEnabled) break;
    await nextBtn.click();
    pageNumber++;
    await page.waitForSelector('//tbody//tr', { timeout: 3000 }).catch(() => {});
  }

  return 0;
}
