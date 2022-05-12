//Импортируем необходимые модули и библиотеки с соответсвующим названиями для удобной работы
const Router = require("express");
const router = new Router();
const News = require("../models/News");

///////////// News /////////////////

//POST-запрос по ссылке /addNews для добавления новой новости
router.post(
  "/addNews",

  //Выполнение асинхронной функции
  async (req, res) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Выводим в логи сервера результат
      console.log("\nЗапрос на регистрацию новой новости:");

      //Получаем значения отправленных полей
      const { text1, text2, date, date_add, attachment } = req.body;

      console.log({
        "Дата регистрации": new Date(date_add).toLocaleDateString(),
        "Заголовок новости": text1,
        "Текст новости": text2,
        Дата: date,
        Вложение: attachment,
      });

      cover = attachment;

      //Создаём в базе новую претензию
      const news = new News({ text1, text2, date, date_add, cover });

      //Сохранем претензию
      await news.save();

      //Выводим в логи сервера результат успешной регистрации нового пользователя
      console.log("\nЗарегистрирована новая новость:");
      console.log({
        ID: news._id,
        "Дата регистрации": new Date(news.date_add).toLocaleDateString(),
        "Заголовок новости": news.text1,
        "Текст новости": news.text2,
        Дата: news.date,
        Вложение: news.cover,
      });

      //В случае возникновения непредвиенной ошибки - выводим сообщение об ошибке в консоль сервера и на сайт
    } catch (e) {
      console.log("\nОшибка регистрации новой новости:\n", e);
      res.send({ message: "Ошибка сервера в auth.routes router.post('/addNews')." });
    }
  }
);

//GET-запрос по ссылке /allNews для получения всех записей новостей
router.get(
  "/allNews",

  //Выполнение асинхронной функции
  async (req, res) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Получаем все записи претензий
      const news = await News.find();

      //Возвращаем ответ клиентской части сервера в виде JSON-структуры
      return res.json({ news });

      //В случае возникновения непредвиденной ошибки - выводим сообщение об ошибке
    } catch (e) {
      console.log(e);
      res.send({ message: "Ошибка сервера в auth.routes router.get('/allNews')." });
    }
  }
);

//PUT-запрос по ссылке /updateNews для обновления записи одной новости
router.put(
  "/updateNews",

  //Выполнение асинхронной функции
  async (req, res) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Получаем значения отправленных полей
      const { _id, text1, text2, date } = req.body;

      //Получаем из базы данных текущие данные претензии
      const news = await News.findOne({ _id: _id });

      //Выводим в логи сервера результат
      console.log("\nЗапрос на обновление записи новости: (ID: " + news.id + ")");
      console.log("\nТекущие данные:");
      console.log({
        "Дата регистрации": new Date(news.date_add).toLocaleDateString(),
        "Заголовок новости": news.text1,
        "Текст новости": news.text2,
        Дата: news.date,
      });
      console.log("\nНовые данные:");
      console.log({
        "Дата регистрации": new Date(news.date_add).toLocaleDateString(),
        "Заголовок новости": text1,
        "Текст новости": text2,
        Дата: date,
      });

      //Применяем новые значения и сохраняет новость в базе данных
      news.text1 = text1;
      news.text2 = text2;
      news.date = date;
      await news.save();

      //Выводим сообщение об успешной регистрации в консоль сервера и на сайт
      console.log("\nДанные новости обновленны.\n");
      return res.json({ message: "Данные новости обновленны." });

      //В случае возникновения непредвиенной ошибки - выводим сообщение об ошибке в консоль сервера и на сайт
    } catch (e) {
      console.log("\nОшибка обновления новости:\n", e);
      res.send({ message: "Ошибка сервера в auth.routes router.put('/updateNews')." });
    }
  }
);

module.exports = router;
