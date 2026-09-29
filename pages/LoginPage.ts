import { type Page } from '@playwright/test';

export class LoginPage {
  constructor(readonly page: Page) {}
  get error() { return this.page.getByTestId('error'); }
  async goto() { await this.page.goto('/'); }
  async login(username: string, password: string) {
    await this.page.getByTestId('username').fill(username);
    await this.page.getByTestId('password').fill(password);
    await this.page.getByTestId('login-button').click();
  }
}

