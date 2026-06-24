import { test, expect } from '@playwright/test'; // ИМПОРТЫ — инструменты Playwright - голое имя пакета (без ./ или ../). Node понимает: «это библиотека, ищи её в node_modules» (куда её положил npm install)
import { users } from '../src/data/users'; // ИМПОРТЫ — тестовые данные (логины и пароли)
import { LoginPage } from '../src/pages/LoginPage'; //импортируем класс страницы Логин
import { InventoryPage } from '../src/pages/InventoryPage';

// ГРУППА тестов одной фичи
test.describe('Логин', () => {
  // открываем чистый сайт соусбери

  // ARRANGE — подготовка перед каждым тестом
  test.beforeEach(async ({ page }) => {
    // { page } — ФИКСТУРА Playwright (имя фиксировано, переименовать нельзя)
    await page.goto('/'); //перейди по адресу на этой вкладке (как вписать URL в адресную строку и нажать Enter)
  });

  // ТЕСТ TC-01: Успешный логин с валидными данными
  test('TC-01: Успешный логин с валидными данными', async ({ page }) => {
    // { page } — ФИКСТУРА (своя, свежая для этого теста)
    // beforeEach уже сделал goto('/') → страница загружена; тест получает ту же загруженную вкладку через { page } и продолжает с того места;
    // «дай мне доступ к той же вкладке, чтобы продолжить работать»

    // ACT — действия
    const loginPage = new LoginPage(page); // loginPage — ПЕРЕМЕННАЯ (хранит ОБЪЕКТ); LoginPage — КЛАСС; page — фикстура, передаю в POM
    await loginPage.login(users.standard.username, users.standard.password);

    // ASSERT — проверки
    const inventory = new InventoryPage(page);
    await expect(inventory.title).toContainText('Products');
  });

  // ТЕСТ TC-02: Логин с НЕвалидными данными
  test('TC-02: Логин с НЕвалидными данными', async ({ page }) => {
    // { page } — ФИКСТУРА (своя, свежая для этого теста)
    // ACT — действия
    const loginPage = new LoginPage(page); // loginPage — ПЕРЕМЕННАЯ (объект); LoginPage — КЛАСС; page — фикстура, передаю в POM
    await loginPage.login(users.invalidUser.username, users.invalidUser.password);

    // ASSERT — проверки
    await expect(loginPage.errorMessage).toContainText('Epic sadface');
  });
});
