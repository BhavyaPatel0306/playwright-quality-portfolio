import { test, expect } from '../../fixtures/ui.fixture';
import { products, customer } from '../../data/test-data';
import { dollarsToCents } from '../../helpers/assertions';

test.beforeEach(async ({ authenticated, inventory, cart }) => {
  void authenticated;
  await inventory.add(products.backpack.name);
  await inventory.add(products.bikeLight.name);
  await inventory.openCart();
  await cart.checkout();
});

test('CHECK-01 order summary, totals and successful confirmation', async ({ checkout, page, inventory }) => {
  await checkout.fillCustomer(customer);
  await checkout.continue();
  await expect(page).toHaveURL(/\/checkout-step-two\.html$/);
  await expect(page.getByTestId('inventory-item')).toHaveCount(2);
  await expect(page.getByTestId('inventory-item-name')).toHaveText([
    products.backpack.name, products.bikeLight.name,
  ]);
  const subtotal = dollarsToCents((await page.getByTestId('subtotal-label').textContent())!);
  const tax = dollarsToCents((await page.getByTestId('tax-label').textContent())!);
  const total = dollarsToCents((await page.getByTestId('total-label').textContent())!);
  expect(subtotal).toBe(3998);
  expect(tax).toBe(320); // Demo checkout applies 8%, rounded to cents.
  expect(total).toBe(subtotal + tax);
  await checkout.finish();
  await expect(page.getByTestId('complete-header')).toHaveText('Thank you for your order!');
  await expect(inventory.badge).toHaveCount(0);
});

test('CHECK-02 missing first name prevents checkout', async ({ checkout, page }) => {
  await checkout.fillCustomer({ ...customer, firstName: '' });
  await checkout.continue();
  await expect(checkout.error).toHaveText('Error: First Name is required');
  await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
});

test('CHECK-03 missing postal code prevents checkout', async ({ checkout, page }) => {
  await checkout.fillCustomer({ ...customer, postalCode: '' });
  await checkout.continue();
  await expect(checkout.error).toHaveText('Error: Postal Code is required');
  await expect(page).toHaveURL(/\/checkout-step-one\.html$/);
});

test('CHECK-04 cancellation returns to cart with items intact', async ({ checkout, cart, page }) => {
  await checkout.cancel();
  await expect(page).toHaveURL(/\/cart\.html$/);
  await expect(cart.items).toHaveCount(2);
  await expect(cart.item(products.backpack.name)).toBeVisible();
  await expect(cart.item(products.bikeLight.name)).toBeVisible();
});

