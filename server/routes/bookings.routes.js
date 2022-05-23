//Импортируем необходимые модули и библиотеки с соответсвующим названиями для удобной работы
const Router = require("express");
const router = new Router();
const Bookings = require("../models/Booking");
const authMiddleware = require("../middleware/auth.middleware");
const mongoose = require("mongoose");

///////////// Bookings /////////////

//POST-запрос по ссылке /booking для записи в БД записи о бронировании, принимает параметры: эл.потча, пароль, ф.и.о, уровень доступ
router.post(
  "/booking",
  //Выполнение асинхронной функции
  async (req, res) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Получаем значения отправленных полей
      const { id_user, id_hotel, id_room, person1, person2, date1, date2, price, date_add, nameHotel, nameRoom, email, status } = req.body;

      //Выводим в логи сервера результат
      console.log("\nЗапрос на добавление нового бронирования:");
      console.log({
        "ID Пользователя:": id_user,
        "ID Отеля:": id_hotel,
        "ID Апартаментов:": id_room,
        "Взрослых:": person1,
        "Детей:": person2,
        "Дата заезда": date1,
        "Дата выезда": date2,
        "Дата добавления": date_add,
        Статус: status,
      });

      const bookings = new Bookings({ id_user, id_hotel, id_room, person1, person2, date1, date2, price, date_add, status }); //Создаём запись в БД
      await bookings.save(); //Сохранем запись в БД

      //Выводим в логи сервера результат успешной регистрации нового пользователя
      console.log("\nЗарегистрировано новое бронирование:");
      console.log({
        "ID Бронирования:": bookings._id,
        "ID Пользователя:": bookings.id_user,
        "ID Отеля:": bookings.id_hotel,
        "ID Апартаментов:": bookings.id_room,
        "Взрослых:": bookings.person1,
        "Детей:": bookings.person2,
        "Дата заезда": new Date(bookings.date1).toLocaleDateString(),
        "Дата выезда": new Date(bookings.date2).toLocaleDateString(),
        "Дата добавления": new Date(bookings.date_add).toISOString(),
        Статус: bookings.status,
      });

      //////////////////////////////////////////////////////////////////
      //Отправляем письмо пользователю о регистрации бронирования
      //////////////////////////////////////////////////////////////////

      let date11 = new Date(bookings.date1);
      let date22 = new Date(bookings.date2);
      let dateDayCount = Math.ceil(Math.abs(date22.getTime() - date11.getTime()) / (1000 * 3600 * 24));

      const hotel = await Hotels.findOne({ _id: bookings.id_hotel });
      const room = await Rooms.findOne({ _id: bookings.id_room });

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
        from: '"Отдел бронирования Шерегеш LIVE" <booking@gesh-live.ru>',
        to: email,
        subject: "Вы создали новое бронировние",
        html:
          'Здраствуйте! Вы создали бронирование на сайте <a href="www.gesh-live.ru" target="_blank">www.gesh-live.ru</a>' +
          "<p>№ бронирования: " +
          bookings._id +
          "</p>" +
          "<p>Отель: " +
          hotel.name +
          "</p>" +
          "<p>Апартаменты: " +
          room.name +
          "</p>" +
          "<p>Дата заезда: " +
          new Date(bookings.date1).toLocaleDateString() +
          ", Дата выезда: " +
          new Date(bookings.date2).toLocaleDateString() +
          " (" +
          dateDayCount +
          " суток)</p>" +
          "<p>Места для взрослых: " +
          bookings.person1 +
          "</p>" +
          "<p>Места для детей: " +
          bookings.person2 +
          "</p>" +
          "<p>Цена проживания за " +
          dateDayCount +
          " суток: " +
          bookings.price +
          "</p>" +
          "<p>Статус бронирования: Ожидайте подтверждения администратором отеля</p>" +
          "<p>----------------------------------------------------------------</p>" +
          "<p>Пожалуйста, ожидайте подтверждения бронирования,</p>" +
          "<p>уже скоро вам на почту придёт письмо с подтверждением.</p>",
      });

      console.log("\nПисьмо о создании бронирования отправлено на эл.почту пользователя: " + email);

      if (hotel.email != undefined) {
        //////////////////////////////////////////////////////////////////
        //Отправляем письмо в отель о регистрации бронирования
        //////////////////////////////////////////////////////////////////

        result = await transporter.sendMail({
          from: '"Отдел бронирования Шерегеш LIVE" <booking@gesh-live.ru>',
          to: hotel.email,
          subject: "Поступило новое бронировние",
          html:
            'Здраствуйте! Запрос на бронирование с сайта <a href="www.gesh-live.ru" target="_blank">www.gesh-live.ru</a>' +
            "<p>№ бронирования: " +
            bookings._id +
            "</p>" +
            "<p>Отель: " +
            hotel.name +
            "</p>" +
            "<p>Апартаменты: " +
            room.name +
            "</p>" +
            "<p>Дата заезда: " +
            new Date(bookings.date1).toLocaleDateString() +
            ", Дата выезда: " +
            new Date(bookings.date2).toLocaleDateString() +
            " (" +
            dateDayCount +
            " суток)</p>" +
            "<p>Места для взрослых: " +
            bookings.person1 +
            "</p>" +
            "<p>Места для детей: " +
            bookings.person2 +
            "</p>" +
            "<p>Цена проживания за " +
            dateDayCount +
            " суток: " +
            bookings.price +
            "</p>" +
            "<p>Статус бронирования: Ожидает подтверждения администратором отеля</p>" +
            "<p>----------------------------------------------------------------</p>" +
            "<p>Пожалуйста, перейдите по ссылке и подтвердите бронирование:" +
            "<a href=" +
            String(config.get("wwwUrl")) +
            "confirmBooking/" +
            bookings._id +
            "/" +
            bookings.id_room +
            ' target="_blank">Ссылка на страницу подтверждения</a></p>',
        });

        console.log("\nПисьмо о создании бронирования отправлено на эл.почту отеля: " + hotel.email);
      }

      //Выводим сообщение об успешном бронировании
      return res.json({ message: "Вы забронировали апартаменты! Ожидайте подтверждающее письмо на эл.почту, указанную в вашем профиле!" });

      //В случае возникновения непредвиенной ошибки - выводим сообщение об ошибке в консоль сервера и на сайт
    } catch (e) {
      console.log("\nОшибка добавления нового бронирования:\n", e);
      res.send({ message: "Ошибка сервера в auth.routes router.get('/booking')." });
    }
  }
);

//GET-запрос по ссылке /allBookings для получения истории бронирования для выбранного пользователя
router.get(
  "/allBookings",
  authMiddleware,
  //Выполнение асинхронной функции
  async (req, res) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      console.log(req.query);
      const bookings = await Bookings.aggregate([
        {
          $match: {
            id_user: new mongoose.Types.ObjectId(String(req.query.id_user)),
          },
        },
        {
          $lookup: {
            from: "hotels",
            localField: "id_hotel",
            foreignField: "_id",
            as: "hotel",
          },
        },
        {
          $lookup: {
            from: "rooms",
            localField: "id_room",
            foreignField: "_id",
            as: "room",
          },
        },
      ]);

      //Возвращаем ответ клиентской части сервера в виде JSON-структуры
      return res.json({ bookings });

      //В случае возникновения непредвиденной ошибки - выводим сообщение об ошибке
    } catch (e) {
      console.log("\nОшибка получения списка всех бронирований:\n", e);
      res.send({ message: "Ошибка сервера в auth.routes router.get('/allBookings')." });
    }
  }
);

//GET-запрос по ссылке /oneBooking для получения конкретного бронирования
router.get(
  "/oneBooking",
  //Выполнение асинхронной функции
  async (req, res) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Получаем значения отправленных полей
      const { _id } = req.query;

      const booking = await Bookings.findOne({ _id: _id });

      //Возвращаем ответ клиентской части сервера в виде JSON-структуры
      return res.json({ booking });

      //В случае возникновения непредвиденной ошибки - выводим сообщение об ошибке
    } catch (e) {
      console.log(e);
      res.send({ message: "Ошибка сервера в auth.routes router.get('/allBookings')." });
    }
  }
);

//GET-запрос по ссылке /findExBooking для получения списка апартаментов, которые уже забронированы
router.get(
  "/findExBooking",
  authMiddleware,
  //Выполнение асинхронной функции
  async (req, res) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Получаем параметры из запроса
      const { id_hotel, person1, person2, date1, date2 } = req.query;

      //Переводим даты заезда и выезда к формату, для работы с БД
      var _date1 = new Date(date1).toISOString().slice(0, -1) + "+00:00";
      var _date2 = new Date(date2).toISOString().slice(0, -1) + "+00:00";

      let booking;

      //Ищем существующие бронирования по запросу в БД
      if (id_hotel == undefined) {
        //Выводим в логи сервера информацию о запросе бронирования
        console.log("\nЗапрос на поиск забронированных апартаментов по условиям запроса бронирования:");
        console.log({
          Отели: "Все отели",
          Взрослых: person1,
          Детей: person2,
          "Дата заезда": date1,
          "Дата выезда": date2,
        });

        booking = await Bookings.find({
          $or: [
            {
              person1: person1,
              person2: person2,
              status: { $ne: 1 },
              date1: { $gte: _date1, $lte: _date2 },
              date2: { $gte: _date1, $lte: _date2 },
            },
            {
              person1: person1,
              person2: person2,
              status: { $ne: 1 },
              date1: { $lte: _date1 },
              date2: { $gte: _date1, $lte: _date2 },
            },
            {
              person1: person1,
              person2: person2,
              status: { $ne: 1 },
              date1: { $gte: _date1, $lte: _date2 },
              date2: { $gte: _date2 },
            },
            {
              person1: person1,
              person2: person2,
              status: { $ne: 1 },
              date1: { $lte: _date1 },
              date2: { $gte: _date2 },
            },
          ],
        });
      } else {
        const hotel = await Hotels.findOne({ _id: id_hotel });

        //Выводим в логи сервера информацию о запросе бронирования
        console.log("\nЗапрос на поиск забронированных апартаментов по условиям запроса бронирования:");
        console.log({
          "Отель:": hotel.name,
          Взрослых: person1,
          Детей: person2,
          "Дата заезда1": date1,
          "Дата выезда": date2,
        });

        booking = await Bookings.find({
          $or: [
            {
              id_hotel: id_hotel,
              person1: person1,
              person2: person2,
              status: { $ne: 1 },
              date1: { $gte: _date1, $lte: _date2 },
              date2: { $gte: _date1, $lte: _date2 },
            },
            {
              id_hotel: id_hotel,
              person1: person1,
              person2: person2,
              status: { $ne: 1 },
              date1: { $lte: _date1 },
              date2: { $gte: _date1, $lte: _date2 },
            },
            {
              id_hotel: id_hotel,
              person1: person1,
              person2: person2,
              status: { $ne: 1 },
              date1: { $gte: _date1, $lte: _date2 },
              date2: { $gte: _date2 },
            },
            {
              id_hotel: id_hotel,
              person1: person1,
              person2: person2,
              status: { $ne: 1 },
              date1: { $lte: _date1 },
              date2: { $gte: _date2 },
            },
          ],
        });
      }

      console.log("\nНайдено всего существующих бронирований: " + Object.keys(booking).length);

      //console.log(booking)

      //Возвращаем ответ клиентской части сервера в виде JSON-структуры
      return res.json({ booking });

      //В случае возникновения непредвиденной ошибки - выводим сообщение об ошибке
    } catch (e) {
      console.log(e);
      res.send({ message: "Ошибка сервера в auth.routes router.get('/allRoom')." });
    }
  }
);

//GET-запрос по ссылке /findBooking для получения списка апартаментов для поиска бронирования
router.get(
  "/findRoomBooking",
  authMiddleware,
  //Выполнение асинхронной функции
  async (req, res) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Получаем параметры из запроса
      const { id_hotel, person1, person2 } = req.query;

      let rooms;

      //Ищем существующие бронирования по запросу в БД
      if (id_hotel == undefined) {
        //Выводим в логи сервера информацию о запросе бронирования
        console.log("\nЗапрос на поиск всех апартаментов по условиям запроса бронирования:");
        console.log({
          Отели: "Все отели",
          Взрослых: person1,
          Детей: person2,
        });

        rooms = await Rooms.aggregate([
          {
            $match: {
              person1: +person1,
              person2: +person2,
            },
          },
          {
            $lookup: {
              from: "hotels",
              localField: "id_hotel",
              foreignField: "_id",
              as: "hotel",
            },
          },
        ]);
      } else {
        const hotel = await Hotels.findOne({ _id: id_hotel });

        //Выводим в логи сервера информацию о запросе бронирования
        console.log("\nЗапрос на поиск всех апартаментов по условиям запроса бронирования:");
        console.log({
          Отель: hotel.name,
          Взрослых: person1,
          Детей: person2,
        });

        rooms = await Rooms.aggregate([
          {
            $match: {
              id_hotel: new mongoose.Types.ObjectId(id_hotel),
              person1: +person1,
              person2: +person2,
            },
          },
          {
            $lookup: {
              from: "hotels",
              localField: "id_hotel",
              foreignField: "_id",
              as: "hotel",
            },
          },
        ]);
      }

      console.log("\nНайдено подходящих апартаментов: " + Object.keys(rooms).length + "\n");

      //Возвращаем ответ клиентской части сервера в виде JSON-структуры
      return res.json({ rooms });

      //В случае возникновения непредвиденной ошибки - выводим сообщение об ошибке
    } catch (e) {
      console.log(e);
      res.send({ message: "Ошибка сервера в auth.routes router.get('/allRoom')." });
    }
  }
);

//PUT-запрос по ссылке /updateBooking для обновления записи бронирования
router.put(
  "/updateBooking",

  //Выполнение асинхронной функции
  async (req, res) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Получаем значения отправленных полей
      const { _id, status } = req.body;

      //Получаем из БД текущие данные пользователя
      const bookings = await Bookings.findOne({ _id: _id });

      bookings.status = req.body.status;

      //Сохранем бронирование
      await bookings.save();

      //////////////////////////////////////////////////////////////////
      //Отправляем письмо пользователю о регистрации бронирования
      //////////////////////////////////////////////////////////////////

      let date11 = new Date(bookings.date1);
      let date22 = new Date(bookings.date2);
      let dateDayCount = Math.ceil(Math.abs(date22.getTime() - date11.getTime()) / (1000 * 3600 * 24));

      const hotel = await Hotels.findOne({ _id: bookings.id_hotel });
      const room = await Rooms.findOne({ _id: bookings.id_room });
      const user = await User.findOne({ _id: bookings.id_user });
      const email = user.email;

      let statusTextUser = "";
      let statusTextHotel = "";

      if (bookings.status == 1) {
        statusTextUser = "Новый статус бронирования: Отказано отелем :(";
        statusTextHotel = "Новый статус бронирования: Отказано отелем :(";
      }

      if (bookings.status == 2) {
        statusTextUser = "Новый статус бронирования: Подтверждено отелем! :) Собирайтесь в дорогу!";
        statusTextHotel = "Новый статус бронирования: Подтверждено отелем! Ожидайте постояльцев! :)";
      }

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
        from: '"Отдел бронирования Шерегеш LIVE" <booking@gesh-live.ru>',
        to: email,
        subject: "Изменился статус бронирования",
        html:
          'Здраствуйте! Мы уведомляем Вас о том, что изменился статус вашего бронирования на сайте <a href="www.gesh-live.ru" target="_blank">www.gesh-live.ru</a>' +
          "<p>№ бронирования: " +
          bookings._id +
          "</p>" +
          "<p>Отель: " +
          hotel.name +
          "</p>" +
          "<p>Апартаменты: " +
          room.name +
          "</p>" +
          "<p>Дата заезда: " +
          new Date(bookings.date1).toLocaleDateString() +
          ", Дата выезда: " +
          new Date(bookings.date2).toLocaleDateString() +
          " (" +
          dateDayCount +
          " суток)</p>" +
          "<p>Места для взрослых: " +
          bookings.person1 +
          "</p>" +
          "<p>Места для детей: " +
          bookings.person2 +
          "</p>" +
          "<p>Цена проживания за " +
          dateDayCount +
          " суток: " +
          bookings.price +
          "</p>" +
          "<p>" +
          statusTextUser +
          "</p>",
      });

      console.log("\nПисьмо об изменении статуса бронирования отправлено на эл.почту пользователя: " + email);

      if (hotel.email != undefined) {
        //////////////////////////////////////////////////////////////////
        //Отправляем письмо в отель о регистрации бронирования
        //////////////////////////////////////////////////////////////////

        result = await transporter.sendMail({
          from: '"Отдел бронирования Шерегеш LIVE" <booking@gesh-live.ru>',
          to: hotel.email,
          subject: "Подтверждение смены статуса заявки на бронирование",
          html:
            'Здраствуйте! Вы изменили статус бронирования с сайта <a href="www.gesh-live.ru" target="_blank">www.gesh-live.ru</a>' +
            "<p>№ бронирования: " +
            bookings._id +
            "</p>" +
            "<p>Отель: " +
            hotel.name +
            "</p>" +
            "<p>Апартаменты: " +
            room.name +
            "</p>" +
            "<p>Дата заезда: " +
            new Date(bookings.date1).toLocaleDateString() +
            ", Дата выезда: " +
            new Date(bookings.date2).toLocaleDateString() +
            " (" +
            dateDayCount +
            " суток)</p>" +
            "<p>Места для взрослых: " +
            bookings.person1 +
            "</p>" +
            "<p>Места для детей: " +
            bookings.person2 +
            "</p>" +
            "<p>Цена проживания за " +
            dateDayCount +
            " суток: " +
            bookings.price +
            "</p>" +
            "<p>" +
            statusTextHotel +
            "</p>",
        });

        console.log("\nПисьмо об изменении статуса бронирования отправлено на эл.почту отеля: " + hotel.email);
      }

      //Выводим сообщение об успешной регистрации в консоль сервера и на сайт
      console.log("\nДанные бронирования обновленны администратором отеля.\n");
      return res.json({ message: "Данные бронирования обновленны! Спасибо!" });

      //В случае возникновения непредвиенной ошибки - выводим сообщение об ошибке в консоль сервера и на сайт
    } catch (e) {
      console.log("\nОшибка обновления бронирования:\n", e);
      res.send({ message: "Ошибка сервера в auth.routes router.get('/updateBooking')." });
    }
  }
);

module.exports = router;
