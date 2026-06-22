import { test, expect } from '@playwright/test'; // ИМПОРТЫ — инструменты Playwright - голое имя пакета (без ./ или ../). Node понимает: «это библиотека, ищи её в node_modules» (куда её положил npm install)
import { users } from '../src/data/users'; // ИМПОРТЫ — тестовые данные (логины и пароли)
import { LoginPage } from '../src/pages/LoginPage'; //импортируем класс страницы Логин
import { Inventory } from '../src/pages/Inventory';
import { Cart } from '../src/pages/Cart';
import { CheckoutOne } from '../src/pages/CheckoutOne';
import { CheckoutTwo } from '../src/pages/CheckoutTwo';
import { CheckoutComplete } from '../src/pages/CheckoutComplete';
import { faker } from '@faker-js/faker';

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
    await expect(page.locator('[data-test="title"]')).toContainText('Products');
  });

  // ТЕСТ TC-02: Логин с НЕвалидными данными
  test('TC-02: Логин с НЕвалидными данными', async ({ page }) => {
    // { page } — ФИКСТУРА (своя, свежая для этого теста)
    // ACT — действия
    const loginPage = new LoginPage(page); // loginPage — ПЕРЕМЕННАЯ (объект); LoginPage — КЛАСС; page — фикстура, передаю в POM
    await loginPage.login(users.invalidUser.username, users.invalidUser.password);

    // ASSERT — проверки
    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface');
  });
});

// ГРУППА тестов одной фичи
test.describe('Корзина', () => {
  // пользователь залогинен

  // ARRANGE — подготовка перед каждым тестом
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.login(users.standard.username, users.standard.password);

    // ASSERT — проверки
    await expect(page.locator('[data-test="title"]')).toContainText('Products');
  });

  // ТЕСТ TC-03: Добавление товара в корзину
  test('TC-03: Добавление товара в корзину', async ({ page }) => {
    // { page } — ФИКСТУРА (своя, свежая для этого теста)
    // ACT — действия - создать объект Inventory (как создавала LoginPage), вызвать addFirstItemToCart()
    const inventory = new Inventory(page); // объект страницы товаров
    await inventory.addFirstItemToCart(); // кликаем «Add to cart» у первого товара

    // ASSERT — проверки
    await expect(inventory.cartBadge).toContainText('1'); // бейдж корзины показывает "1"
  });

  // ТЕСТ TC-04: Удаление товара из корзины
  test('TC-04: Удаление товара из корзины', async ({ page }) => {
    // { page } — ФИКСТУРА (своя, свежая для этого теста)
    // ACT — действия - создать объект Inventory (как создавала LoginPage), вызвать addFirstItemToCart()
    const inventory = new Inventory(page); // объект страницы товаров
    await inventory.addFirstItemToCart(); // кликаем «Add to cart» у первого товара
    await expect(inventory.cartBadge).toContainText('1'); // бейдж корзины показывает "1"
    await inventory.removeFirstItem(); //удаляем

    // ASSERT — проверки
    await expect(inventory.cartBadge).not.toBeVisible(); // бэйджа нет
  });

  // ТЕСТ TC-05: Полный флоу покупки
  test('TC-05: Полный флоу покупки', async ({ page }) => {
    // ACT
    const inventory = new Inventory(page); // объект страницы товаров
    await inventory.addFirstItemToCart(); // кликаем «Add to cart» у первого товара
    await expect(inventory.cartBadge).toContainText('1'); // бейдж корзины показывает "1"
    await inventory.goToCart(); // Кликаем на значок корзины с бэйджем 1
    const cart = new Cart(page);
    await cart.clickCheckout(); //Кликаем Checkout
    const checkoutOne = new CheckoutOne(page);
    await checkoutOne.fillForm(
      //Заполняем 3 поля First Name, Last Name,  Zip/Postal Code
      faker.person.firstName(),
      faker.person.lastName(),
      faker.location.zipCode(),
    );
    await checkoutOne.clickContinue();
    const checkoutTwo = new CheckoutTwo(page);
    await checkoutTwo.clickFinish();

    // ASSERT — проверки
    const complete = new CheckoutComplete(page);
    await expect(complete.checkoutComplete).toContainText('Thank you for your order!');
  });
});
