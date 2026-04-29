import BasePage from './BasePage';
import { Page } from '@playwright/test';
import { ENV } from '../utils/env'

export default class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  usernameInput = this.page.getByRole('textbox', { name: 'Username:' });
  passwordInput = this.page.getByRole('textbox', { name: 'Password:' });
  loginButton = this.page.getByRole('button', { name: 'Log In' });

 async goto() {
  await this.page.goto(ENV.baseURL);
}

  async chooseModule(moduleName: string) {
    await this.page.locator(`//li[@id="${moduleName}"]`).click();
  }

  async login(username: string, password: string, moduleName?: string) {

    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);

    if (moduleName) await this.chooseModule(moduleName);

    await this.click(this.loginButton);
  }
}
