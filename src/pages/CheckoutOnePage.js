export class CheckoutOnePage {
  // КЛАСС (чертёж). Большая буква = класс

  constructor(checkoutOnePage) {
    // ПАРАМЕТР: принимает фикстуру page из теста (new CheckoutOnePage(page)). Имя параметра я выбрала сама
    this.page = checkoutOnePage; // this.page — СВОЙСТВО объекта (слева) = параметр checkoutOnePage (справа). Сохраняю вкладку внутрь объекта
    // справа checkoutOnePage — параметр конструктора (вкладка из теста). Живёт только внутри конструктора.
    // слева this.page — постоянное свойство объекта: чтобы вкладка не потерялась и методы могли ею пользоваться позже через this.page.

    this.firstnameInput = checkoutOnePage.locator('[data-test="firstName"]'); // СВОЙСТВО-локатор ← поле First Name
    this.lastnameInput = checkoutOnePage.locator('[data-test="lastName"]'); // СВОЙСТВО-локатор ← поле Last Name
    this.zipcodeInput = checkoutOnePage.locator('[data-test="postalCode"]'); // СВОЙСТВО-локатор ← поле Zip/Postal Code
    this.continueButton = checkoutOnePage.locator('[data-test="continue"]'); // СВОЙСТВО-локатор ← кнопка «Continue»

    // ! Тонкость: локатор пока ничего не ищет на странице — он просто запоминает «как искать». Реальный поиск произойдёт позже, когда метод сделает .fill()/.click().
  }

  // данные приходят ПАРАМЕТРАМИ из теста (там их генерит faker). POM faker НЕ знает — просто раскладывает по полям. Та же логика, что login(username, password).
  async fillForm(firstName, lastName, postalCode) {
    // firstName, lastName, postalCode — ПАРАМЕТРЫ метода (значения подставит тест)
    await this.firstnameInput.fill(firstName); // в поле First Name кладём параметр firstName
    await this.lastnameInput.fill(lastName); // в Last Name — параметр lastName
    await this.zipcodeInput.fill(postalCode); // в Zip/Postal Code — параметр postalCode
  }

  async clickContinue() {
    // метод-действие, БЕЗ параметров: просто нажать Continue
    await this.continueButton.click(); // клик по локатору из конструктора; await — ждём, пока клик отработает
  }

  // Методы = действия страницы. Не копирую их в тест, а вызываю: await checkout.fillForm(...) → await checkout.clickContinue();
  // Данные (faker) — снаружи, в тесте. POM знает «как заполнить», а ЧЕМ — решает тест.
}
