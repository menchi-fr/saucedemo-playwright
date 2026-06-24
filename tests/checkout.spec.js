import { test, expect } from '../src/fixtures/fixtures';
import { InventoryPage } from '../src/pages/InventoryPage';
import { CartPage } from '../src/pages/CartPage';
import { CheckoutOnePage } from '../src/pages/CheckoutOnePage';
import { CheckoutTwoPage } from '../src/pages/CheckoutTwoPage';
import { CheckoutCompletePage } from '../src/pages/CheckoutCompletePage';
import { faker } from '@faker-js/faker';

// ГРУППА тестов одной фичи
test.describe('Полный флоу', () => {
  // пользователь залогинен

  // ТЕСТ TC-05: Полный флоу покупки
  test('TC-05: Полный флоу покупки', async ({ loggedInPage }) => {
    // ACT
    const inventory = new InventoryPage(loggedInPage); // объект страницы товаров
    await inventory.addFirstItemToCart(); // кликаем «Add to cart» у первого товара
    await expect(inventory.cartBadge).toContainText('1'); // бейдж корзины показывает "1"
    await inventory.goToCart(); // Кликаем на значок корзины с бэйджем 1
    const cart = new CartPage(loggedInPage);
    await cart.clickCheckout(); //Кликаем Checkout
    const checkoutOne = new CheckoutOnePage(loggedInPage);
    await checkoutOne.fillForm(
      //Заполняем 3 поля First Name, Last Name,  Zip/Postal Code
      faker.person.firstName(),
      faker.person.lastName(),
      faker.location.zipCode(),
    );
    await checkoutOne.clickContinue();
    const checkoutTwo = new CheckoutTwoPage(loggedInPage);
    await checkoutTwo.clickFinish();

    // ASSERT — проверки
    const complete = new CheckoutCompletePage(loggedInPage);
    await expect(complete.checkoutComplete).toContainText('Thank you for your order!');
  });
});