## TC-01: Успешный логин с валидными данными
Предусловие: открыта https://www.saucedemo.com/
Шаги:
1. ввести username: standard_user
2. ввести password: secret_sauce
3. нажать Login
Ожидаемый результат: виден заголовок "Products"

## TC-02: Логин с НЕвалидными данными
Предусловие: открыта https://www.saucedemo.com/
Шаги:
1. ввести username: 111
2. ввести password: 222
3. нажать Login
Ожидаемый результат: видно error-message "Epic sadface"

## TC-03: Добавление товара в корзину
Предусловие: пользователь залогинен (standard_user), открыта страница inventory
Шаги:
1. ввести username: standard_user
2. ввести password: secret_sauce
3. нажать Login
Ожидаемый результат: виден заголовок "Products"


## TC-04: Удаление товара из корзины



## TC-05: Полный флоу покупки (добавление товаров -> переход в корзину -> заполнение данных -> success-экран)
