//Импортируем необходимые модули и библиотеки с соответсвующим названиями для удобной работы
const Router = require('express');
const router = new Router();
const Rooms = require('../models/Rooms');
const { check, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/auth.middleware');

///////////// Rooms ////////////////

//POST-запрос по ссылке /addRoom для добавления новых апартаментов
router.post(
  '/addRoom',
  //Проверка отправляемых полей на корректность
  [check('name', 'Некоректное или слишком короткое имя.').isString().isLength({ min: 3, max: 30 })],
  //Выполнение асинхронной функции
  async (req, res) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Выводим в логи сервера результат
      console.log('\nЗапрос на добавление новых апартаментов:');
      console.log(req.body);

      //Проверяем, нет ли ошибок в отправляемых полях
      const errors = validationResult(req);

      //В случае ошибки выводим сообщение об ошибке в консоль сервера и на сайт
      if (!errors.isEmpty()) {
        console.log('\nОшибка добавления апартаментов:\n', errors.errors);
        return res.status(400).json({ message: 'Ошибка добавления апартаментов. Проверьте поля на корректность заполнения.', errors });
      }

      //Получаем значения отправленных полей
      const { id_hotel, name, person1, person2, price } = req.body;

      const hotel = await Hotels.findOne({ _id: id_hotel });

      //Проверяем нет ли уже апартаментов с таким названием для выбранного отеля
      const candidate = await Rooms.findOne({ id_hotel, name });

      //Если такой пользователь существует - выводим сообщение об ошибке на сайт
      if (candidate) {
        return res.status(400).json({ message: `Апартаменты с названием "${name}" для отеля "${hotel.name}" уже существует.` });
      }

      const room = new Rooms({ id_hotel, name, person1, person2, price }); //Создаём апартаменты
      await room.save(); //Сохранем апартаменты

      //Выводим в логи сервера результат успешной регистрации нового пользователя
      console.log('\nДобавлены новые апартаменты:');
      console.log({
        id: room.id,
        hotel: hotel.name,
        name: room.name,
        person1: room.person1,
        person2: room.person2,
        price: room.price,
      });

      //Выводим сообщение об успешной регистрации на сайт
      return res.json({ message: 'Апартаменты добавлены.' });

      //В случае возникновения непредвиенной ошибки - выводим сообщение об ошибке в консоль сервера и на сайт
    } catch (e) {
      console.log("\nОшибка API-сервера в rooms.routes router.put('/addRoom').\n", e);
      res.status(400).json({ message: "Ошибка API-сервера в rooms.routes router.put('/addRoom')." });
    }
  }
);

//GET-запрос по ссылке /allRoom для получения списка апартаментов для выбранного отеля
router.get(
  '/allRoom',
  authMiddleware,
  //Выполнение асинхронной функции
  async (req, res) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Получаем id пользователя
      const rooms = await Rooms.find({ id_hotel: req.query.id_hotel });

      //Возвращаем ответ клиентской части сервера в виде JSON-структуры
      return res.json({ rooms });

      //В случае возникновения непредвиденной ошибки - выводим сообщение об ошибке
    } catch (e) {
      console.log("\nОшибка API-сервера в rooms.routes router.put('/allRoom').\n", e);
      res.status(400).json({ message: "Ошибка API-сервера в rooms.routes router.put('/allRoom')." });
    }
  }
);

//PUT-запрос по ссылке /roomOneUpdate для обновления апартаментов
router.put(
  '/updateOneRoom',
  //Проверка отправляемых полей на корректность
  [
    check('name', 'Некоректное или слишком короткое имя.').isString().isLength({ min: 3, max: 30 }),
    check('person1', 'Некоректный person1.').isNumeric(),
    check('person2', 'Некоректный person2.').isNumeric(),
    check('price', 'Некоректный price.').isNumeric(),
  ],
  //Выполнение асинхронной функции
  async (req, res) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Получаем значения отправленных полей
      const { _id, id_hotel, name, person1, person2, price } = req.body;

      const hotel = await Hotels.findOne({ _id: id_hotel });

      //Получаем из БД текущие данные комнаты
      const candidate = await Rooms.findOne({ _id: _id });

      //console.log(_id)

      //Выводим в логи сервера результат
      console.log('\nЗапрос на обновление апартаментов: (id: ' + candidate.id + ')');
      console.log('\nТекущие данные:');
      console.log({
        hotel: hotel.name,
        name: candidate.name,
        person1: candidate.person1,
        person2: candidate.person2,
        price: candidate.price,
      });
      console.log('\nНовые данные:');
      console.log({
        hotel: hotel.name,
        name: req.body.name,
        person1: req.body.person1,
        person2: req.body.person2,
        price: req.body.price,
      });

      //Проверяем, нет ли ошибок в отправляемых полях
      const errors = validationResult(req);

      //В случае ошибки выводим сообщение об ошибке в консоль сервера и на сайт
      if (!errors.isEmpty()) {
        console.log('\nОшибка обновления апартаментов:\n', errors.errors);
        return res.status(400).json({ message: 'Ошибка обновления апартаментов.', errors });
      }

      //Если ошибок нет
      else {
        //Применяем новые данные пользователя
        candidate.name = name;
        candidate.person1 = person1;
        candidate.person2 = person2;
        candidate.price = price;

        //Сохранем пользователя
        await candidate.save();
      }

      //Выводим сообщение об успешной регистрации в консоль сервера и на сайт
      console.log('\nДанные апартаментов обновленны.\n');
      return res.json({ message: 'Данные апартаментов обновленны!' });

      //В случае возникновения непредвиенной ошибки - выводим сообщение об ошибке в консоль сервера и на сайт
    } catch (e) {
      console.log("\nОшибка API-сервера в rooms.routes router.put('/updateOneRoom').\n", e);
      res.status(400).json({ message: "Ошибка API-сервера в rooms.routes router.put('/updateOneRoom')." });
    }
  }
);

// //GET-запрос по ссылке /oneRoom для получения конкретную запись апартаментов
// router.get(
//   '/oneRoom',
//   //Выполнение асинхронной функции
//   async (req, res) => {
//     //Оборовачиваем выполняемый код в try/cath для отлова ошибок
//     try {
//       //Получаем значения отправленных полей
//       const { _id } = req.query;

//       const room = await Rooms.findOne({ _id: _id });

//       //Возвращаем ответ клиентской части сервера в виде JSON-структуры
//       return res.json({ room });

//       //В случае возникновения непредвиденной ошибки - выводим сообщение об ошибке
//     } catch (e) {
//       console.log("\nОшибка API-сервера в rooms.routes router.put('/oneRoom').\n", e);
//       res.status(400).json({ message: "Ошибка API-сервера в rooms.routes router.put('/oneRoom')." });
//     }
//   }
// );

module.exports = router;
