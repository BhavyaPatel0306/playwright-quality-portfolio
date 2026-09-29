import { test, expect } from '../../fixtures/ui.fixture';
import { users } from '../../data/test-data';

test.beforeEach(async ({ login }) => { await login.goto(); });

test('AUTH-01 valid credentials open inventory', async ({ login, page, inventory }) => {
  await login.login(users.standard, users.password);
  await expect(page).toHaveURL(/\/inventory\.html$/);
  await expect(inventory.items).toHaveCount(6);
});

test('AUTH-02 invalid password is rejected', async ({ login, page }) => {
  await login.login(users.standard, 'incorrect-password');
  await expect(login.error).toHaveText('Epic sadface: Username and password do not match any user in this service');
  await expect(page.getByTestId('login-button')).toBeVisible();
});

test('AUTH-03 locked account is rejected', async ({ login }) => {
  await login.login(users.locked, users.password);
  await expect(login.error).toHaveText('Epic sadface: Sorry, this user has been locked out.');
});

test('AUTH-04 empty credentials require a username', async ({ login }) => {
  await login.login('', '');
  await expect(login.error).toHaveText('Epic sadface: Username is required');
});

test('AUTH-05 logout blocks direct access to inventory', async ({ login, inventory, page }) => {
  await login.login(users.standard, users.password);
  await inventory.logout();
  await expect(page.getByTestId('login-button')).toBeVisible();
  await page.goto('/inventory.html');
  await expect(page.getByTestId('login-button')).toBeVisible();
  await expect(login.error).toContainText("You can only access '/inventory.html' when you are logged in.");
});

