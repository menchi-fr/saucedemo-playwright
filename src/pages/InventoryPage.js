export class InventoryPage {
  // КЛАСС (чертёж). Большая буква = класс

  constructor(inventoryPage) {
    // ПАРАМЕТР: принимает фикстуру page, переданную из теста (new InventoryPage(page)). Имя параметра я выбрала сама
    this.page = inventoryPage; // this.page — СВОЙСТВО объекта (слева) = параметр inventoryPage (справа). Сохраняю вкладку внутрь объекта
    // справа inventoryPage — параметр конструктора (вкладка из теста). Живёт только внутри конструктора.
    // слева this.page — постоянное свойство объекта: чтобы вкладка не потерялась и методы могли ею пользоваться позже через this.page.

    this.addToCartButton = inventoryPage.getByRole('button', { name: 'Add to cart' }).first(); // СВОЙСТВО-локатор ← кнопка «Add to cart»
    // getByRole(...) находит ВСЕ кнопки «Add to cart»; .first() берёт первую — нам неважно, какой товар.

    this.cartBadge = inventoryPage.getByTestId('shopping-cart-badge'); // СВОЙСТВО-локатор ← бейдж корзины (циферка над иконкой)

    this.removeButton = inventoryPage.getByRole('button', { name: 'Remove' }).first(); // СВОЙСТВО-локатор ← кнопка «Remove» (первая)

    this.cartButton = inventoryPage.getByTestId('shopping-cart-link'); // СВОЙСТВО-локатор ← иконка-ссылка корзины (переход на /cart.html)

    this.title = inventoryPage.getByTestId('title');

    // ! Тонкость: локатор пока ничего не ищет на странице — он просто запоминает «как искать». Реальный поиск произойдёт позже, когда метод сделает .click().
  }

  // Конструктор = «паспорт страницы»:
  // локаторы — как найти элементы (кнопка Add to cart, бейдж, кнопка Remove, иконка корзины) ✓
  // this.page — ссылка на вкладку/сайт, чтобы было где искать ✓

  async addFirstItemToCart() {
    // метод-действие, БЕЗ параметров: товар выбираем сами («первый»)
    await this.addToCartButton.click(); // клик по локатору из конструктора; await — ждём, пока клик отработает
  }

  async removeFirstItem() {
    // метод-действие, БЕЗ параметров: удаляем первый товар
    await this.removeButton.click();
  }

  async goToCart() {
    // метод-действие, БЕЗ параметров: переход в корзину по иконке
    await this.cartButton.click();
  }

  // Методы = действия страницы. Не копирую их в тест, а вызываю: await inventory.goToCart();
  // Код действия живёт в POM (в одном месте), а тестов, которые его зовут, может быть много.
}
