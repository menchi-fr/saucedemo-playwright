# saucedemo-playwright

Учебный проект автоматизации UI-тестов для демо-сайта
[saucedemo.com](https://www.saucedemo.com) на **Playwright Test**.
Тесты построены по паттерну **Page Object Model (POM)**.

## Технологии

- [Playwright Test](https://playwright.dev/) — фреймворк для E2E-тестов
- Node.js + ES Modules (`import`/`export`)
- [@faker-js/faker](https://fakerjs.dev/) — генерация тестовых данных (имена, адреса)
- ESLint + Prettier — линтер (ловит баги/мёртвый код) и форматтер (единый стиль)

## Установка

```bash
npm install                # установить зависимости
npx playwright install     # скачать браузеры (нужно один раз)
```

## Запуск тестов

Playwright вызывается напрямую через `npx`:

```bash
npx playwright test                              # все тесты (headless, chromium)
npx playwright test tests/login.spec.js          # один файл
npx playwright test -g "TC-05"                   # один тест по названию
npx playwright test --headed                     # с видимым браузером
npx playwright test --ui                         # интерактивный UI-режим
npx playwright show-report                       # открыть HTML-отчёт после прогона
```

## Линтер и форматтер

```bash
npm run lint               # проверить код ESLint'ом (npx eslint .)
npx eslint . --fix         # авто-починить, что ESLint умеет
npm run format             # отформатировать всё Prettier'ом (npx prettier --write .)
```

## Структура проекта

```
saucedemo-playwright/
├── tests/                 # спек-файлы с тестами (testDir)
│   └── login.spec.js      # TC-01…TC-05 (логин + корзина + флоу покупки)
├── src/
│   ├── pages/             # Page Object — локаторы и действия страниц
│   │   ├── LoginPage.js
│   │   ├── Inventory.js
│   │   ├── Cart.js
│   │   ├── CheckoutOne.js       # форма данных (step one)
│   │   ├── CheckoutTwo.js       # overview (step two), кнопка Finish
│   │   └── CheckoutComplete.js  # экран «Thank you for your order!»
│   └── data/              # тестовые данные (логины, пароли и т.п.)
│       └── users.js
├── TEST_CASES.md          # ручные тест-кейсы (шаги + ожидаемый результат)
├── playwright.config.js   # конфигурация Playwright
├── eslint.config.mjs      # правила ESLint
├── .prettierrc.json       # правила Prettier
└── CLAUDE.md              # инструкция для Claude Code (локальная, в .gitignore)
```

### Как устроены тесты

- **`tests/`** — спеки в формате Arrange / Act / Assert (подготовка → действия →
  проверки). Адреса резолвятся относительно `baseURL`, поэтому `page.goto('/')`
  ведёт на главную сайта. Логин как предусловие вынесен в `beforeEach`.
- **`src/pages/`** — классы Page Object. В конструкторе хранятся локаторы
  (используются атрибуты `data-test`), методы описывают действия пользователя
  (например, `LoginPage.login(username, password)`). Селекторы держим здесь, а не
  в спеках; проверки (`expect`) — в спеках.
- **`src/data/`** — тестовые данные, которые спеки импортируют вместо
  «зашитых» значений.
- **`TEST_CASES.md`** — ручные тест-кейсы. ID (TC-01, …) соответствуют тестам
  в `tests/`.

## Покрытие тестами

| ID | Сценарий |
|----|----------|
| TC-01 | Успешный логин с валидными данными |
| TC-02 | Логин с невалидными данными (баннер ошибки) |
| TC-03 | Добавление товара в корзину (бейдж = 1) |
| TC-04 | Удаление товара из корзины (бейдж исчезает) |
| TC-05 | Полный флоу покупки (add → cart → checkout → success-экран) |

## Конфигурация

Файл `playwright.config.js`:

- активен только проект **chromium** (Firefox, WebKit, мобильные и брендовые
  браузеры закомментированы);
- задан `baseURL: https://www.saucedemo.com`;
- трассировка собирается `on-first-retry`;
- отчёт — `html`.

## Как добавить новый тест

1. Создать Page Object в `src/pages/` для нужной страницы.
2. При необходимости добавить данные в `src/data/`.
3. Написать спек в `tests/`.
4. Описать тест-кейс в `TEST_CASES.md`.
