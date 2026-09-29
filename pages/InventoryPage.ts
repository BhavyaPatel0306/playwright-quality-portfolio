import { type Page } from '@playwright/test';

export class InventoryPage {
  constructor(readonly page: Page) {}
  get items() { return this.page.getByTestId('inventory-item'); }
  get names() { return this.page.getByTestId('inventory-item-name'); }
  get prices() { return this.page.getByTestId('inventory-item-price'); }
  get badge() { return this.page.getByTestId('shopping-cart-badge'); }
  item(name: string) {
    return this.items.filter({ has: this.page.getByText(name, { exact: true }) });
  }
  async add(name: string) {
    await this.item(name).getByRole('button', { name: 'Add to cart', exact: true }).click();
  }
  async openProduct(name: string) { await this.page.getByText(name, { exact: true }).click(); }
  async sort(value: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.page.getByTestId('product-sort-container').selectOption(value);
  }
  async openCart() { await this.page.getByTestId('shopping-cart-link').click(); }
  async logout() {
    await this.page.getByRole('button', { name: 'Open Menu' }).click();
    await this.page.getByTestId('logout-sidebar-link').click();
  }
}

