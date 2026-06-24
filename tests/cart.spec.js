import { test, expect } from '../src/fixtures/fixtures';
import { InventoryPage } from '../src/pages/InventoryPage';

// ГРУППА тестов одной фичи
test.describe('Корзина', () => {
  // пользователь залогинен

  // ARRANGE — подготовка перед каждым тестом (пустой. у нас фикстура на залогиненную страницу)

  // ТЕСТ TC-03: Добавление товара в корзину
  test('TC-03: Добавление товара в корзину', async ({ loggedInPage }) => {
    // { page } — ФИКСТУРА (своя, свежая для этого теста)
    // ACT — действия - создать объект InventoryPage (как создавала LoginPage), вызвать addFirstItemToCart()
    const inventory = new InventoryPage(loggedInPage); // объект страницы товаров
    await inventory.addFirstItemToCart(); // кликаем «Add to cart» у первого товара

    // ASSERT — проверки
    await expect(inventory.cartBadge).toContainText('1'); // бейдж корзины показывает "1"
  });

  // ТЕСТ TC-04: Удаление товара из корзины
  test('TC-04: Удаление товара из корзины', async ({ loggedInPage }) => {
    // { page } — ФИКСТУРА (своя, свежая для этого теста)
    // ACT — действия - создать объект InventoryPage (как создавала LoginPage), вызвать addFirstItemToCart()
    const inventory = new InventoryPage(loggedInPage); // объект страницы товаров
    await inventory.addFirstItemToCart(); // кликаем «Add to cart» у первого товара
    await expect(inventory.cartBadge).toContainText('1'); // бейдж корзины показывает "1"
    await inventory.removeFirstItem(); //удаляем

    // ASSERT — проверки
    await expect(inventory.cartBadge).not.toBeVisible(); // бэйджа нет
  });
});