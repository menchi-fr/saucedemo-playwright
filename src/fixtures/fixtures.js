import { test as base, expect } from '@playwright/test'; // base — «обычный» test Playwright, который я расширяю
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { users } from '../data/users';

// test.extend({...}) — беру базовый test и добавляем свою фикстуру loggedInPage.
// loggedInPage — вкладка, которая К НАЧАЛУ теста уже залогинена под standard_user - то, что раньше дублировалось в beforeEach у cart и checkout.
export const test = base.extend({
  // имя фикстуры — loggedInPage; по нему тест будет её запрашивать: async ({ loggedInPage }) => {...}
  loggedInPage: async ({ page }, use) => {
    // фикстура получает встроенную { page } (свежую вкладку) и готовит её:
    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.login(users.standard.username, users.standard.password);

    // проверка что вход удался
    const inventory = new InventoryPage(page);
    await expect(inventory.title).toContainText('Products');

    // use(page) — отдать залогиненную вкладку в тест.
    // Тест выполняется ровно в этот момент; всё, что после use(), — это teardown (пока не нужен).
    await use(page);
  },
});

// expect пробрасываем дальше, чтобы спеки импортировали и test, и expect из одного места.
export { expect };
