//Импортируем необходимые модули и библиотеки с соответсвующим названиями для удобной работы
const Router = require('express');
const router = new Router();
const Rooms = require('../models/Rooms');
const Hotels = require('../models/Hotels');
const { check, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/auth.middleware');

///////////// Rooms ////////////////

//POST-запрос по ссылке /roomAdd для добавления новых апартаментов
router.post(
  '/roomAdd',
  //Проверка отправляемых полей на корректность
  [check('name', 'Некоректное или слишком короткое имя.').isString().isLength({ min: 3, max: 50 })],
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
      const { id_hotel, name } = req.body;

      const hotel = await Hotels.findOne({ _id: id_hotel });

      //Проверяем нет ли уже апартаментов с таким названием для выбранного отеля
      const candidate = await Rooms.findOne({ id_hotel, name });

      //Если такой пользователь существует - выводим сообщение об ошибке на сайт
      if (candidate) {
        return res.status(400).json({ message: `Апартаменты с названием "${name}" для отеля "${hotel.name}" уже существует.` });
      }

      const room = new Rooms({ id_hotel, name }); //Создаём апартаменты
      await room.save(); //Сохранем апартаменты

      //Выводим в логи сервера результат успешной регистрации нового пользователя
      console.log('\nДобавлены новые апартаменты:');
      console.log({
        id: room.id,
        hotel: hotel.name,
        name: room.name,
      });

      //Выводим сообщение об успешной регистрации на сайт
      return res.json({ message: 'Апартаменты добавлены.' });

      //В случае возникновения непредвиенной ошибки - выводим сообщение об ошибке в консоль сервера и на сайт
    } catch (e) {
      console.log("\nОшибка API-сервера в rooms.routes router.put('/roomAdd').\n", e);
      res.status(400).json({ message: "Ошибка API-сервера в rooms.routes router.put('/roomAdd')." });
    }
  }
);

//GET-запрос по ссылке /roomOne для получения конкретную запись апартаментов
router.get(
  '/roomOne',
  //Выполнение асинхронной функции
  async (req, res) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Получаем значения отправленных полей
      const { _id } = req.query;

      const room = await Rooms.findOne({ _id: _id });

      //Возвращаем ответ клиентской части сервера в виде JSON-структуры
      return res.json({ room });

      //В случае возникновения непредвиденной ошибки - выводим сообщение об ошибке
    } catch (e) {
      console.log("\nОшибка API-сервера в rooms.routes router.put('/roomOne').\n", e);
      res.status(400).json({ message: "Ошибка API-сервера в rooms.routes router.put('/roomOne')." });
    }
  }
);

//GET-запрос по ссылке /roomsAll для получения списка апартаментов для выбранного отеля
router.get(
  '/roomsAll',
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
      console.log("\nОшибка API-сервера в rooms.routes router.put('/roomsAll').\n", e);
      res.status(400).json({ message: "Ошибка API-сервера в rooms.routes router.put('/roomsAll')." });
    }
  }
);

//PUT-запрос по ссылке /roomOneUpdate для обновления апартаментов
router.put(
  '/roomOneUpdate',
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
      console.log("\nОшибка API-сервера в rooms.routes router.put('/roomOneUpdate').\n", e);
      res.status(400).json({ message: "Ошибка API-сервера в rooms.routes router.put('/roomOneUpdate')." });
    }
  }
);

module.exports = router;
