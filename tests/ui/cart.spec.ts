import { test, expect } from '../../fixtures/ui.fixture';
import { products } from '../../data/test-data';

test.beforeEach(async ({ authenticated }) => { void authenticated; });

test('CART-01 two products persist in cart after reload', async ({ inventory, cart, page }) => {
  await inventory.add(products.backpack.name);
  await inventory.add(products.bikeLight.name);
  await expect(inventory.badge).toHaveText('2');
  await inventory.openCart();
  await page.reload();
  await expect(cart.items).toHaveCount(2);
  for (const product of Object.values(products)) {
    await expect(cart.item(product.name).getByTestId('inventory-item-price')).toHaveText('$' + product.price);
    await expect(cart.item(product.name).getByTestId('item-quantity')).toHaveText('1');
  }
});

test('CART-02 removing the last item clears cart and badge', async ({ inventory, cart }) => {
  await inventory.add(products.backpack.name);
  await inventory.openCart();
  await cart.remove(products.backpack.name);
  await expect(cart.items).toHaveCount(0);
  await expect(inventory.badge).toHaveCount(0);
});

