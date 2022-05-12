//Импортируем модули с соответсвующим названиями для удобной работы
const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const fileUpload = require("express-fileupload");
const bookingsRouter = require("./routes/bookings.routes");
const eventsRouter = require("./routes/events.routes");
const feedbackRouter = require("./routes/feedback.routes");
const fileRouter = require("./routes/file.routes");
const hotelsRouter = require("./routes/hotels.routes");
const newsRouter = require("./routes/news.routes");
const roomsRouter = require("./routes/rooms.routes");
const usersRouter = require("./routes/users.routes");

const corsMiddleware = require("./middleware/cors.middleware");
const PORT = config.get("serverPort"); //Получаем из файла настроек номер порта, на котором будет запущен сервер
const URL_DB = config.get("dbUrl"); //Получаем из файла настроек URL подключения к БД

//Из Експресса создаём сервер
const app = express();

app.use(fileUpload({}));
app.use(corsMiddleware);
app.use(express.json());
app.use(express.static("static"));
app.use("/api/auth", bookingsRouter);
app.use("/api/auth", eventsRouter);
app.use("/api/auth", feedbackRouter);
app.use("/api/files", fileRouter);
app.use("/api/auth", hotelsRouter);
app.use("/api/auth", newsRouter);
app.use("/api/auth", roomsRouter);
app.use("/api/auth", usersRouter);

//Функция для подключения к базе данных и запуска сервера
const start = async () => {
  //Оборовачиваем выполняемый код в try/cath для отлова ошибок
  try {
    //Получаем ссылку подключения к БД из файла настроек
    await mongoose.connect(URL_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    //Выводим в лог сообщение об успешном запуске сервера
    app.listen(PORT, () => {
      console.log("\nBack-Сервер 'Gesh-Live' запущен [", new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" }), "(МСК)]\nПорт: ", PORT, " \n");

      var twirlTimer = (function () {
        var P = ["\\", "|", "/", "-"];
        var x = 0;
        return setInterval(function () {
          process.stdout.write("\r" + P[x++]);
          x &= 3;
        }, 250);
      })();
    });
  } catch (e) {}
};

//Вызов функции запуска сервера
start();
