//Импортируем необходимые модули и библиотеки с соответсвующим названиями для удобной работы
const Router = require("express");
const router = new Router();
const Hotels = require("../models/Hotels");
const { check, validationResult } = require("express-validator");
const authMiddleware = require("../middleware/auth.middleware");

///////////// Hotels ///////////////

//POST-запрос по ссылке /addhotel для добавления нового отеля
router.post(
  "/addhotel",
  //Проверка отправляемых полей на корректность
  [check("name", "Некоректное или слишком короткое имя.").isString().isLength({ min: 3, max: 30 })],
  //Выполнение асинхронной функции
  async (req, res) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Выводим в логи сервера результат
      console.log("\nЗапрос на добавление нового отеля:");
      console.log(req.body);

      //Проверяем, нет ли ошибок в отправляемых полях
      const errors = validationResult(req);

      //В случае ошибки выводим сообщение об ошибке в консоль сервера и на сайт
      if (!errors.isEmpty()) {
        console.log("\nОшибка добавления отеля:\n", errors.errors);
        return res.status(400).json({ message: "Ошибка добавления отеля. Некоректное или слишком короткое имя." });
      }

      //Получаем значения отправленных полей
      const { name, id_manager } = req.body;

      //Проверяем нет ли уже отеля с таким названием
      const candidate = await Hotels.findOne({ name });

      //Если такой отель существует - выводим сообщение об ошибке на сайт
      if (candidate) {
        return res.status(400).json({ message: `Отель с названием ${name} уже существует.` });
      }

      //Переменная для хранения замены символов
      const converter = {
        а: "a",
        б: "b",
        в: "v",
        г: "g",
        д: "d",
        е: "e",
        ё: "e",
        ж: "zh",
        з: "z",
        и: "i",
        й: "y",
        к: "k",
        л: "l",
        м: "m",
        н: "n",
        о: "o",
        п: "p",
        р: "r",
        с: "s",
        т: "t",
        у: "u",
        ф: "f",
        х: "h",
        ц: "c",
        ч: "ch",
        ш: "sh",
        щ: "sch",
        ь: "",
        ы: "y",
        ъ: "",
        э: "e",
        ю: "yu",
        я: "ya",
      };

      const nameLowerCase = name.toLowerCase(); //Переводим название отеля в нижний регистр
      let url = ""; //Объявляем пустую переменную под будущий url

      //Заменяем все символы кириллицы на английские и записываем в переменную url
      for (var i = 0; i < nameLowerCase.length; ++i) {
        if (converter[nameLowerCase[i]] == undefined) {
          url += nameLowerCase[i];
        } else {
          url += converter[nameLowerCase[i]];
        }
      }

      //Заменяем оставшиемя симолы
      url = url.replace(/[^-0-9a-z]/g, "_");
      url = url.replace(/[-]+/g, "_");
      url = url.replace(/^\-|-$/g, "");

      const hotel = new Hotels({ name, id_manager, url }); //Создаём отель
      await hotel.save(); //Сохранем отель

      //Выводим в логи сервера результат успешной регистрации нового пользователя
      console.log("\nДобавлен новый отель:");
      console.log({
        id: hotel.id,
        name: hotel.name,
        id_manager: hotel.id_manager,
        url: url,
      });

      //Выводим сообщение об успешной регистрации на сайт
      return res.json({ message: "Отель добавлен." });

      //В случае возникновения непредвиенной ошибки - выводим сообщение об ошибке в консоль сервера и на сайт
    } catch (e) {
      console.log("\nОшибка API-сервера в users.routes router.put('/addhotel').\n", e);
      res.status(400).json({ message: "Ошибка API-сервера в users.routes router.put('/addhotel')." });
    }
  }
);

//GET-запрос по ссылке /allhotels для получения списка отелей
router.get(
  "/allhotel",
  authMiddleware,
  //Выполнение асинхронной функции
  async (req, res) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Получаем id пользователя
      const hotels = await Hotels.find();

      //Возвращаем ответ клиентской части сервера в виде JSON-структуры
      return res.json({ hotels });

      //В случае возникновения непредвиденной ошибки - выводим сообщение об ошибке
    } catch (e) {
      console.log("\nОшибка API-сервера в users.routes router.put('/allhotel').\n", e);
      res.status(400).json({ message: "Ошибка API-сервера в users.routes router.put('/allhotel')." });
    }
  }
);

//PUT-запрос по ссылке /hotelOneUpdate для обновления отеля
router.put(
  "/hotelOneUpdate",
  //Выполнение асинхронной функции
  async (req, res) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Получаем значения отправленных полей
      const { _id, name, description, id_manager, url } = req.body;

      //Получаем из БД текущие данные отеля
      const hotel = await Hotels.findOne({ _id });

      //Выводим в логи сервера результат
      console.log("\nЗапрос на обновление отеля: (id: " + hotel.id + ")");
      console.log("\nТекущие данные:");
      console.log({
        name: hotel.name,
        description: hotel.description,
        id_manager: hotel.id_manager,
        url: hotel.url,
      });

      if (url.length < 3) {
        console.log("\nОшибка API-сервера в users.routes router.put('/hotelOneUpdate').\nСлишком коротий URL сервера.");
        return res.status(400).send({ message: "URL должен быть длиннее 3 символов." });
      }
      //Переменная для хранения замены символов
      const converter = {
        а: "a",
        б: "b",
        в: "v",
        г: "g",
        д: "d",
        е: "e",
        ё: "e",
        ж: "zh",
        з: "z",
        и: "i",
        й: "y",
        к: "k",
        л: "l",
        м: "m",
        н: "n",
        о: "o",
        п: "p",
        р: "r",
        с: "s",
        т: "t",
        у: "u",
        ф: "f",
        х: "h",
        ц: "c",
        ч: "ch",
        ш: "sh",
        щ: "sch",
        ь: "",
        ы: "y",
        ъ: "",
        э: "e",
        ю: "yu",
        я: "ya",
      };

      const nameLowerCase = url.toLowerCase(); //Переводим название отеля в нижний регистр
      let urlNew = ""; //Объявляем пустую переменную под будущий url

      //Заменяем все символы кириллицы на английские и записываем в переменную url
      for (var i = 0; i < nameLowerCase.length; ++i) {
        if (converter[nameLowerCase[i]] == undefined) {
          urlNew += nameLowerCase[i];
        } else {
          urlNew += converter[nameLowerCase[i]];
        }
      }

      //Заменяем оставшиемя симолы
      urlNew = urlNew.replace(/[^-0-9a-z]/g, "_");
      urlNew = urlNew.replace(/[-]+/g, "_");
      urlNew = urlNew.replace(/^\-|-$/g, "");

      if (hotel.url != urlNew) {
        //Проверяем нет ли уже отеля с таким url
        const candidate = await Hotels.findOne({ url: urlNew });

        //Если такой отель существует - выводим сообщение об ошибке на сайт
        if (candidate) {
          return res.status(400).json({ message: `Уже существует отель с URL: ${urlNew}` });
        }
      }

      console.log("\nНовые данные:");
      console.log({
        name: name,
        description: description,
        id_manager: id_manager,
        url: urlNew,
      });

      //Применяем новые данные отеля
      hotel.name = name;
      hotel.description = description;
      hotel.id_manager = id_manager;
      hotel.url = urlNew;

      //Сохранем отель
      await hotel.save();

      //Выводим сообщение об успешном обновлении данных отедя в консоль сервера и на сайт
      console.log("\nДанные отеля успешно обновлены.\n");
      return res.json({ message: "Данные отеля успешно обновлены!", hotel });

      //В случае возникновения непредвиенной ошибки - выводим сообщение об ошибке в консоль сервера и на сайт
    } catch (e) {
      console.log("\nОшибка API-сервера в users.routes router.put('/hotelOneUpdate').\n", e);
      res.status(400).send({ message: "Ошибка API-сервера в users.routes router.put('/hotelOneUpdate')." });
    }
  }
);

//PUT-запрос по ссылке /hotelOne для получения данных по одному отелю
router.put(
  "/hotelOne",
  //Выполнение асинхронной функции
  async (req, res) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Получаем значения отправленных полей
      const { url } = req.body;

      //Получаем из БД текущие данные отеля
      const hotel = await Hotels.findOne({ url });

      return res.json({ hotel });

      //В случае возникновения непредвиенной ошибки - выводим сообщение об ошибке в консоль сервера и на сайт
    } catch (e) {
      console.log("\nОшибка API-сервера в users.routes router.put('/hotelOne').\n", e);
      res.status(400).send({ message: "Ошибка API-сервера в users.routes router.put('/hotelOne')." });
    }
  }
);

module.exports = router;
