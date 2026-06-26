export class LoginPage {
  // LoginPage — КЛАСС (чертёж). Большая буква = класс

  constructor(saucedemoSite) {
    // saucedemoSite здесь — ПАРАМЕТР: принимает фикстуру page, переданную из теста (new LoginPage(page)). Имя параметра я выбрала сама
    this.page = saucedemoSite; // this.page — СВОЙСТВО объекта (слева) = параметр saucedemoSite (справа). Сохраняю вкладку внутрь объекта
    // слева this.page — я создаю у объекта постоянное свойство page и кладу туда вкладку.
    // справа saucedemoSite — это параметр конструктора (вкладка, прилетевшая из теста). Но беда: параметр живёт только внутри конструктора. Как только конструктор отработал — он исчезает.
    // поэтому левый this.page — Зачем: чтобы вкладка не потерялась и метод login() мог ею пользоваться позже через this.page. Без этой строки в login() не было бы доступа к вкладке.
    // Имена слева и справа теперь РАЗНЫЕ (this.page и saucedemoSite) — видно, что это разные вещи: слева — свойство объекта, справа — параметр. Имя параметра произвольное.
    this.usernameInput = saucedemoSite.getByTestId('username'); // this.usernameInput — СВОЙСТВО-локатор ← ЛОКАТОРЫ
    //свойство объекта (имя придумала я, camelCase).
    // getByTestId('username') = короткая форма от .locator('[data-test="username"]') — «найди на открытой вкладке элемент с атрибутом data-test="username"».
    // Чтобы getByTestId искал именно по data-test (а не по дефолтному data-testid), один раз указано в playwright.config.js → use.testIdAttribute: 'data-test'.
    this.passwordInput = saucedemoSite.getByTestId('password');
    this.loginButton = saucedemoSite.getByTestId('login-button');
    // ! Тонкость: getByTestId(...) (как и .locator(...)) пока ничего не ищет на странице — он просто возвращает локатор, который запоминает «как искать». Реальный поиск произойдёт позже, когда метод login() сделает .fill() или .click() по этому локатору.
    this.errorMessage = saucedemoSite.getByTestId('error');
  }

  // Конструктор = «паспорт страницы», заполняется при создании объекта:
  // локаторы — инструкции, как найти элементы (поле username, password, кнопку) ✓
  // this.page — ссылка на вкладку/сайт, чтобы было где искать ✓

  async login(username, password) {
    // username, password — ПАРАМЕТРЫ метода (значения подставит тест) ← ДЕЙСТВИЕ (метод)
    await this.usernameInput.fill(username); // this.usernameInput — свойство объекта; username — параметр
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  // login() (и другие методы) = действия, операции страницы.
  // Я не копируею их в тест, а вызываю.
  // Метод остаётся жить в POM, а тест просто говорит «выполни мне это действие»: в тесте:
  // await loginPage.login('standard_user', 'secret_sauce');
  //        ↑ объект   ↑ зову метод POM, передаю данные
  // Когда эта строка выполняется — управление «прыгает» в метод login() внутри LoginPage, он там делает fill → fill → click, и возвращается обратно в тест. Код действия — в одном месте (POM), а тестов, которые его зовут, может быть много (TC-01, TC-02 оба зовут один login()).
}
