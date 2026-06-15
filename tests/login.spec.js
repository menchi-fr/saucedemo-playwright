import { test, expect } from '@playwright/test'; // ИМПОРТЫ — инструменты Playwright
import { users } from '../src/data/users';             // ИМПОРТЫ — тестовые данные (логин и пароль)
import { LoginPage } from '../src/pages/LoginPage';

// ГРУППА тестов одной фичи
test.describe('Логин', () => {

  // ARRANGE — подготовка перед каждым тестом
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // ТЕСТ TC-01: Успешный логин с валидными данными
  test('Успешный логин', async ({ page }) => {
    // ACT — действия
    const loginPage = new LoginPage(page);
    await loginPage.login(users.standard.username, users.standard.password); 

    // ASSERT — проверки
    await expect(page.locator('[data-test="title"]')).toContainText('Products');
  });

    // ТЕСТ TC-2
  //test('Успешный логин', async ({ page }) => {
    // ACT — действия
    // ...

    // ASSERT — проверки
    // ...
 // });


});
  