import { type Page } from '@playwright/test';

export class CartPage {
  constructor(readonly page: Page) {}
  get items() { return this.page.getByTestId('inventory-item'); }
  item(name: string) {
    return this.items.filter({ has: this.page.getByText(name, { exact: true }) });
  }
  async remove(name: string) {
    await this.item(name).getByRole('button', { name: 'Remove', exact: true }).click();
  }
  async checkout() { await this.page.getByTestId('checkout').click(); }
}

