import { test, expect } from '../../fixtures/ui.fixture';
import { products } from '../../data/test-data';
import { dollarsToCents } from '../../helpers/assertions';

test.beforeEach(async ({ authenticated }) => { void authenticated; });

test('INV-01 product details match the selected inventory product', async ({ inventory, page }) => {
  await inventory.openProduct(products.backpack.name);
  await expect(page.getByTestId('inventory-item-name')).toHaveText(products.backpack.name);
  await expect(page.getByTestId('inventory-item-price')).toHaveText('$29.99');
  await expect(page.getByTestId('inventory-item-desc')).not.toBeEmpty();
  await page.getByTestId('back-to-products').click();
  await expect(inventory.items).toHaveCount(6);
});

test('INV-02 products sort alphabetically from Z to A', async ({ inventory }) => {
  await inventory.sort('za');
  await expect(inventory.names).toHaveCount(6);
  const names = await inventory.names.allTextContents();
  expect(names).toEqual([...names].sort().reverse());
});

test('INV-03 products sort by ascending price', async ({ inventory }) => {
  await inventory.sort('lohi');
  await expect(inventory.prices).toHaveCount(6);
  const prices = (await inventory.prices.allTextContents()).map(dollarsToCents);
  expect(prices).toEqual([...prices].sort((a, b) => a - b));
});

