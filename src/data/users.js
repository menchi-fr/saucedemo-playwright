export const users = {
  standard: { username: 'standard_user',   password: 'secret_sauce' },
  invalidUser: { username: '111',   password: '222' },
};

// users — это объект. Объект в JS — это набор пар «ключ: значение». Достаёшь данные через точку, шаг за шагом:
// users               // весь объект целиком
// users.standard      // { username: 'standard_user', password: 'secret_sauce' }
// users.standard.username   // 'standard_user'
// users.standard.password   // 'secret_sauce'