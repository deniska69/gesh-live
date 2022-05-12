//Импортируем необходимые модули и библиотеки с соответсвующим названиями для удобной работы
const Router = require("express");
const router = new Router();

///////////// Feedback /////////////

//POST-запрос по ссылке /booking для записи в БД записи о бронировании, принимает параметры: эл.потча, пароль, ф.и.о, уровень доступ
router.post(
  "/feedback",
  //Выполнение асинхронной функции
  async (req, res) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Получаем значения отправленных полей
      const { text, email, phone } = req.body;

      let stringText = "Поступил новый отзыв от посетителя сайта:" + "\nEmail: " + email + "\nТелефон: " + phone + "\nТекст: " + text;

      let testEmailAccount = await nodemailer.createTestAccount();

      let transporter = nodemailer.createTransport({
        host: "smtp.yandex.ru",
        port: 465,
        secure: true,
        auth: {
          user: "booking@gesh-live.ru",
          pass: "mmfcmamfjuhohoxb",
        },
      });

      let result = await transporter.sendMail({
        from: '"Постетитель сайта" <booking@gesh-live.ru>',
        to: "booking@gesh-live.ru",
        subject: "Новый отзыв",
        text: stringText,
      });

      console.log("\nНа почту поступил новый запрос.");

      //Выводим сообщение об успешном бронировании
      return res.json({ message: "Ваш запрос зарегистрирован! Мы скоро с вами свяжемся!" });

      //В случае возникновения непредвиенной ошибки - выводим сообщение об ошибке в консоль сервера и на сайт
    } catch (e) {
      console.log("\nОшибка отправления запроса:\n", e);
      res.send({ message: "Ошибка сервера в auth.routes router.get('/zapros')." });
    }
  }
);

module.exports = router;
