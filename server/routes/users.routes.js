//Импортируем необходимые модули и библиотеки с соответсвующим названиями для удобной работы
const Router = require("express");
const router = new Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const authMiddleware = require("../middleware/auth.middleware");
//const nodemailer = require("nodemailer");

///////////// Users ////////////////

//POST-запрос по ссылке /registration для регистрации
router.post(
  "/registration",
  //Проверка отправляемых полей на корректность
  [
    check("email", "Некоректный Email.").isEmail(),
    check("password", "Пароль должен быть длиннее 3 и короче 12 символов.").isLength({ min: 3, max: 12 }),
    check("name", "Некоректное или слишком короткое имя.").isString().isLength({ min: 3, max: 30 }),
    check("id_acc", "Некоректный id_acc.").isNumeric(),
  ],
  //Выполнение асинхронной функции
  async (req, res) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Выводим в логи сервера результат
      console.log("\nЗапрос на регистрацию нового пользователя:");
      console.log(req.body);

      //Проверяем, нет ли ошибок в отправляемых полях
      const errors = validationResult(req);

      //В случае ошибки выводим сообщение об ошибке в консоль сервера и на сайт
      if (!errors.isEmpty()) {
        console.log("\nОшибка регистрации:\n", errors.errors);
        return res.status(400).json({ message: "Ошибка регистрации. Проверьте поля на корректность заполнения.", errors });
      }

      //Получаем значения отправленных полей
      const { email, password, name, id_acc, enable } = req.body;

      //Проверяем нет ли уже пользователя с такой эл.почтой
      const candidate = await User.findOne({ email });

      //Если такой пользователь существует - выводим сообщение об ошибке на сайт
      if (candidate) {
        return res.status(400).json({ message: `Пользователь с эл.почтой ${email} уже существует.` });
      }
      const hashPassword = await bcrypt.hash(password, 8); //Хешируем пароль
      const user = new User({ email, password: hashPassword, name, id_acc, enable }); //Создаём пользвателя
      await user.save(); //Сохранем пользователя

      //Выводим в логи сервера результат успешной регистрации нового пользователя
      console.log("\n\nЗарегистрирован новый пользователь:");
      console.log({
        id: user.id,
        email: user.email,
        name: user.name,
        id_acc: user.id_acc,
      });

      //////////////////////////////////////////////////////////////////
      //Отправляем письмо пользователю о регистрации на сайте
      //////////////////////////////////////////////////////////////////

      // let transporter = nodemailer.createTransport({
      //   host: "smtp.gmail.com",
      //   port: 465,
      //   secure: true,
      //   auth: {
      //     user: "licobezadresa@gmail.com",
      //     pass: "uoqhnsqwvshcyxnq",
      //   },
      // });

      // let result = await transporter.sendMail({
      //   from: '"Отдел бронирования Шерегеш LIVE" <booking@gesh-live.ru>',
      //   to: "maxartem0419@gmail.com",
      //   subject: "Регистрация нового пользователя",
      //   html: "Здраствуйте, " + user.name + '! Мы рады приветствовать вас на нашем сайте <a href="www.gesh-live.ru" target="_blank">www.gesh-live.ru</a>' + "<p>Ваши данные для авторизации:</p>" + "<p>Email: " + user.email + "</p>" + "<p>Пароль: " + password + "</p>" + "<p>Желаем приятного времпровождения на нашем сайте! :)</p>",
      // });

      // console.log("\nПриветственное письмо отправлено на эл.почту нового пользователя: " + user.email);

      //////////////////////////////////////////////////////////////////
      //Отправляем письмо себе о регистрации пользователя
      //////////////////////////////////////////////////////////////////

      // result = await transporter.sendMail({
      //   from: '"Отдел бронирования Шерегеш LIVE" <booking@gesh-live.ru>',
      //   to: "booking@gesh-live.ru",
      //   subject: "Зарегистрирован новый пользователь!",
      //   html: "<p>Ф.И.О.: " + user.name + "</p>" + "<p>Email: " + user.email + "</p>",
      // });

      // console.log("\nПисьмо о регистрации нового пользователя отправлено на эл.почту booking@gesh-live.ru");

      //Выводим сообщение об успешной регистрации на сайт
      return res.json({ message: `Пользователь ${user.name} зарегистрирован.` });

      //В случае возникновения непредвиенной ошибки - выводим сообщение об ошибке в консоль сервера и на сайт
    } catch (e) {
      console.log("\nОшибка API-сервера в users.routes router.put('/registration').\n", e);
      res.status(400).send({ message: "Ошибка API-сервера в users.routes router.put('/registration')." });
    }
  }
);

//POST-запрос по ссылке /login для авторизации
router.post(
  "/login",
  //Выполнение асинхронной функции
  async (req, res) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Получаем значения отправленных полей
      const { email, password } = req.body;

      //Проверяем есть ли пользователь с такой эл.почтой
      const user = await User.findOne({ email });

      //Если пользователь не найден - выводим сообщение об ошибке
      if (!user) {
        return res.status(404).json({ message: `Пользователь с эл.почтой ${email} не найден.` });
      }
      //Проверяем пароль на корректность
      const isPassValid = bcrypt.compareSync(password, user.password);

      //Если пароль не верный - выводим сообщение об ошибке
      if (!isPassValid) {
        return res.status(400).json({ message: "Неверный пароль" });
      }

      //Получаем токен авторизации
      const token = jwt.sign({ id: user.id }, config.get("secretKey"), { expiresIn: "1h" });

      //Выводим в логи сервера результат
      console.log("\nАвторизован пользователь:");
      console.log({
        id: user.id,
        email: user.email,
        name: user.name,
        id_acc: user.id_acc,
      });

      //Возвращаем клиентской части сервера данные пользователя
      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          id_acc: user.id_acc,
          avatar: user.avatar,
          enable: user.enable,
        },
      });

      //В случае возникновения непредвиденной ошибки - выводим сообщение об ошибке
    } catch (e) {
      console.log("\nОшибка API-сервера в users.routes router.put('/login').\n", e);
      res.status(400).send({ message: "Ошибка API-сервера в users.routes router.put('/login')." });
    }
  }
);

//GET-запрос по ссылке /auth для аутентификации пользователя
router.get(
  "/auth",
  authMiddleware,
  //Выполнение асинхронной функции
  async (req, res) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Получаем id пользователя
      const user = await User.findOne({ _id: req.user.id });

      //Получаем токен пользователя
      const token = jwt.sign({ id: user.id }, config.get("secretKey"), { expiresIn: "1h" });

      //Возвращаем ответ клиентской части сервера в виде JSON-структуры
      return res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          id_acc: user.id_acc,
          avatar: user.avatar,
        },
      });

      //В случае возникновения непредвиденной ошибки - выводим сообщение об ошибке
    } catch (e) {
      console.log("\nОшибка API-сервера в users.routes router.put('/auth').\n", e);
      res.status(400).send({ message: "Ошибка API-сервера в users.routes router.put('/auth')." });
    }
  }
);

//GET-запрос по ссылке /allUser для получения списка пользователей
router.get(
  "/allUsers",
  authMiddleware,
  //Выполнение асинхронной функции
  async (req, res) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Получаем значения отправленных полей
      const { id_acc } = req.query;

      let user = "";

      //Получаем пользователей
      if (id_acc === "undefined") {
        user = await User.find();
      } else {
        user = await User.find({ id_acc: id_acc });
      }

      //Возвращаем ответ клиентской части сервера в виде JSON-структуры
      return res.json({ user });

      //В случае возникновения непредвиденной ошибки - выводим сообщение об ошибке
    } catch (e) {
      console.log("\nОшибка API-сервера в users.routes router.put('/allUsers').\n", e);
      res.status(400).send({ message: "Ошибка API-сервера в users.routes router.put('/allUsers')." });
    }
  }
);

//PUT-запрос по ссылке /updateProfile для обновления профиля пользователя
router.put(
  "/updateProfile",
  //Выполнение асинхронной функции
  async (req, res) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Получаем значения отправленных полей
      const { _id, email, password, name, id_acc } = req.body;

      //Получаем из БД текущие данные пользователя
      const user = await User.findOne({ _id });

      //Выводим в логи сервера результат
      console.log("\nЗапрос на обновление профиля пользователя: (id: " + user.id + ")");
      console.log("\nТекущие данные:");
      console.log({
        email: user.email,
        password: user.password,
        name: user.name,
        id_acc: user.id_acc,
      });
      console.log("\nНовые данные:");
      console.log({
        email: email,
        password: await bcrypt.hash(password, 8),
        name: name,
        id_acc: id_acc,
      });

      //Применяем новые данные пользователя
      if (email != "") {
        user.email = email;
      }

      if (name != "") {
        user.name = name;
      }

      if (password != "") {
        user.password = await bcrypt.hash(password, 8);
      }

      if (id_acc === "" || id_acc === undefined) {
        user.id_acc = user.id_acc;
      }

      //Сохранем пользователя
      await user.save();

      //Выводим сообщение об успешной регистрации в консоль сервера и на сайт
      console.log(`\nПрофиль пользователь { id: ${user.id} } обновлён.`);
      return res.json({ message: `Профиль пользователя обновлён`, user });

      //В случае возникновения непредвиенной ошибки - выводим сообщение об ошибке в консоль сервера и на сайт
    } catch (e) {
      console.log("\nОшибка API-сервера в users.routes router.put('/updateProfile').\n", e);
      res.status(400).send({ message: "Ошибка API-сервера в users.routes router.put('/updateProfile')." });
    }
  }
);

//GET-запрос по ссылке /oneUser для получения конкретного пользователя
router.get(
  "/oneUser",
  //Выполнение асинхронной функции
  async (req, res) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Получаем значения отправленных полей
      const { _id } = req.query;

      const user = await User.findOne({ _id: _id });

      //Возвращаем ответ клиентской части сервера в виде JSON-структуры
      return res.json({ user });

      //В случае возникновения непредвиденной ошибки - выводим сообщение об ошибке
    } catch (e) {
      console.log("\nОшибка API-сервера в users.routes router.put('/oneUser').\n", e);
      res.status(400).send({ message: "Ошибка API-сервера в users.routes router.put('/oneUser')." });
    }
  }
);

//PUT-запрос по ссылке /blockProfile для блокировки профиля пользователя
router.put(
  "/blockProfile",
  //Выполнение асинхронной функции
  async (req, res) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Получаем значения отправленных полей
      const { _id, enable } = req.body;

      //Получаем из БД текущие данные пользователя
      const user = await User.findOne({ _id });

      //Выводим в логи сервера результат
      console.log("\nЗапрос на блокировку профиля пользователя: { id:", user.id, "}");
      console.log("Текущие данные: { enable:", user.enable, "}", "Новые данные: { enable:", enable, "}");

      //Применяем новые данные пользователя
      user.enable = enable;

      //Сохранем пользователя
      await user.save();

      //Выводим сообщение об успешной блокировке/разблокировке в консоль сервера и на сайт и возвращаем ответ клиентской части сервера в виде JSON-структуры
      if (enable === 0) {
        console.log(`\nПользователь { id: ${user.id} } заблокирован.`);
        return res.json({ message: `Пользователь ${user.name} заблокирован.`, user });
      }

      if (enable === 1) {
        console.log(`\nПользователь { id: ${user.id} } разблокирован.`);
        return res.json({ message: `Пользователь ${user.name} разблокирован.`, user });
      }

      //В случае возникновения непредвиенной ошибки - выводим сообщение об ошибке в консоль сервера и на сайт
    } catch (e) {
      console.log("\nОшибка API-сервера в users.routes router.put('/blockProfile').\n", e);
      res.status(400).send({ message: "Ошибка API-сервера в users.routes router.put('/blockProfile')." });
    }
  }
);

//PUT-запрос по ссылке /deleteAvatar для блокировки профиля пользователя
router.put(
  "/deleteAvatar",
  //Выполнение асинхронной функции
  async (req, res) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Получаем значения отправленных полей
      const { _id } = req.body;

      //Получаем из БД текущие данные пользователя
      const user = await User.findOne({ _id });

      //Выводим в логи сервера результат
      console.log("\nЗапрос на удаление аватара пользователя: { id:", user.id, "}");

      //Применяем новые данные пользователя
      user.avatar = "";

      //Сохранем пользователя
      await user.save();

      //Выводим сообщение об успешной блокировке/разблокировке в консоль сервера и на сайт и возвращаем ответ клиентской части сервера в виде JSON-структуры
      console.log(`\nАватар ользователя { id: ${user.id} } удалён.`);
      return res.json({ message: `Аватар успешно удалён.`, user });

      //В случае возникновения непредвиенной ошибки - выводим сообщение об ошибке в консоль сервера и на сайт
    } catch (e) {
      console.log("\nОшибка API-сервера в users.routes router.put('/deleteAvatar').\n", e);
      res.status(400).send({ message: "Ошибка API-сервера в users.routes router.put('/deleteAvatar')." });
    }
  }
);

module.exports = router;
