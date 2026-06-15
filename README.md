# saucedemo-playwright

Учебный проект автоматизации UI-тестов для демо-сайта
[saucedemo.com](https://www.saucedemo.com) на **Playwright Test**.
Тесты построены по паттерну **Page Object Model (POM)**.

## Технологии

- [Playwright Test](https://playwright.dev/) — фреймворк для E2E-тестов
- Node.js + ES Modules (`import`/`export`)

## Установка

```bash
npm install                # установить зависимости
npx playwright install     # скачать браузеры (нужно один раз)
```

## Запуск тестов

В проекте нет npm-скриптов — Playwright вызывается напрямую через `npx`:

```bash
npx playwright test                              # все тесты (headless, chromium)
npx playwright test tests/login.spec.js          # один файл
npx playwright test -g "Успешный логин"          # один тест по названию
npx playwright test --headed                     # с видимым браузером
npx playwright test --ui                         # интерактивный UI-режим
npx playwright show-report                       # открыть HTML-отчёт после прогона
```

## Структура проекта

```
saucedemo-playwright/
├── tests/                 # спек-файлы с тестами (testDir)
│   └── login.spec.js
├── src/
│   ├── pages/             # Page Object — локаторы и действия страниц
│   │   └── LoginPage.js
│   └── data/              # тестовые данные (логины, пароли и т.п.)
│       └── users.js
├── TEST_CASES.md          # ручные тест-кейсы (шаги + ожидаемый результат)
├── playwright.config.js   # конфигурация Playwright
└── CLAUDE.md              # инструкция для Claude Code
```

### Как устроены тесты

- **`tests/`** — спеки в формате Arrange / Act / Assert (подготовка → действия →
  проверки). Адреса резолвятся относительно `baseURL`, поэтому `page.goto('/')`
  ведёт на главную сайта.
- **`src/pages/`** — классы Page Object. В конструкторе хранятся локаторы
  (используются атрибуты `data-test`), методы описывают действия пользователя
  (например, `LoginPage.login(username, password)`). Селекторы держим здесь, а не
  в спеках.
- **`src/data/`** — тестовые данные, которые спеки импортируют вместо
  «зашитых» значений.
- **`TEST_CASES.md`** — ручные тест-кейсы. ID (TC-01, …) соответствуют тестам
  в `tests/`.

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
