import { type Page } from '@playwright/test';

export class CheckoutPage {
  constructor(readonly page: Page) {}
  get error() { return this.page.getByTestId('error'); }
  async fillCustomer(customer: { firstName: string; lastName: string; postalCode: string }) {
    await this.page.getByTestId('firstName').fill(customer.firstName);
    await this.page.getByTestId('lastName').fill(customer.lastName);
    await this.page.getByTestId('postalCode').fill(customer.postalCode);
  }
  async continue() { await this.page.getByTestId('continue').click(); }
  async finish() { await this.page.getByTestId('finish').click(); }
  async cancel() { await this.page.getByTestId('cancel').click(); }
}

