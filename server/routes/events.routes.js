//Импортируем необходимые модули и библиотеки с соответсвующим названиями для удобной работы
const Router = require("express");
const router = new Router();
const Events = require("../models/Events");

///////////// Events ///////////////

//POST-запрос по ссылке /addEvents для добавления нового события
router.post(
  "/addEvents",

  //Выполнение асинхронной функции
  async (req, res) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Выводим в логи сервера результат
      console.log("\nЗапрос на регистрацию нового события:");

      //Получаем значения отправленных полей
      const { text1, text2, text3, date_add, attachment } = req.body;

      console.log({
        "Дата регистрации": new Date(date_add).toLocaleDateString(),
        "Заголовок события": text1,
        "Текст события": text2,
        "Доп.текст": text3,
        Вложение: attachment,
      });

      cover = attachment;

      //Создаём в базе новую претензию
      const events = new Events({ text1, text2, text3, date_add, cover });

      //Сохранем претензию
      await events.save();

      //Выводим в логи сервера результат успешной регистрации нового пользователя
      console.log("\nЗарегистрировано новое событие:");
      console.log({
        ID: events._id,
        "Дата регистрации": new Date(events.date_add).toLocaleDateString(),
        "Заголовок новости": events.text1,
        "Текст новости": events.text2,
        "Доп.текст": events.text3,
        Вложение: events.cover,
      });

      //В случае возникновения непредвиенной ошибки - выводим сообщение об ошибке в консоль сервера и на сайт
    } catch (e) {
      console.log("\nОшибка регистрации нового события:\n", e);
      res.send({ message: "Ошибка сервера в auth.routes router.post('/addEvents')." });
    }
  }
);

//GET-запрос по ссылке /allEvents для получения всех записей событий
router.get(
  "/allEvents",

  //Выполнение асинхронной функции
  async (req, res) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Получаем все записи претензий
      const events = await Events.find();

      //Возвращаем ответ клиентской части сервера в виде JSON-структуры
      return res.json({ events });

      //В случае возникновения непредвиденной ошибки - выводим сообщение об ошибке
    } catch (e) {
      console.log(e);
      res.send({ message: "Ошибка сервера в auth.routes router.get('/allEvents')." });
    }
  }
);

//PUT-запрос по ссылке /updateEvents для обновления записи одного события
router.put(
  "/updateEvents",

  //Выполнение асинхронной функции
  async (req, res) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Получаем значения отправленных полей
      const { _id, text1, text2, text3 } = req.body;

      //Получаем из базы данных текущие данные претензии
      const events = await Events.findOne({ _id: _id });

      //Выводим в логи сервера результат
      console.log("\nЗапрос на обновление записи события: (ID: " + events.id + ")");
      console.log("\nТекущие данные:");
      console.log({
        "Дата регистрации": new Date(events.date_add).toLocaleDateString(),
        "Заголовок события": events.text1,
        "Текст события": events.text2,
        "Доп.текст": events.date,
      });
      console.log("\nНовые данные:");
      console.log({
        "Дата регистрации": new Date(events.date_add).toLocaleDateString(),
        "Заголовок события": text1,
        "Текст события": text2,
        "Доп.текст": text3,
      });

      //Применяем новые значения и сохраняет событие в базе данных
      events.text1 = text1;
      events.text2 = text2;
      events.date = text3;
      await events.save();

      //Выводим сообщение об успешной регистрации в консоль сервера и на сайт
      console.log("\nДанные события обновленны.\n");
      return res.json({ message: "Данные события обновленны." });

      //В случае возникновения непредвиенной ошибки - выводим сообщение об ошибке в консоль сервера и на сайт
    } catch (e) {
      console.log("\nОшибка обновления события:\n", e);
      res.send({ message: "Ошибка сервера в auth.routes router.put('/updateEvents')." });
    }
  }
);

module.exports = router;
