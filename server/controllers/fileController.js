const config = require("config");
const fs = require("fs");
const User = require("../models/User");
const Hotel = require("../models/Hotels");
const Uuid = require("uuid");

class FileController {
  async uploadAvatar(req, res) {
    try {
      const file = req.files.file;
      const user = await User.findById(req.user.id);
      const avatarName = Uuid.v4() + ".jpg";
      file.mv(config.get("staticPath") + "\\avatars\\" + avatarName);
      user.avatar = avatarName;
      await user.save();
      return res.json(user);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Ошибка загрузки аватара на сервер." });
    }
  }

  async uploadNews(req, res) {
    try {
      const file = req.files.file;
      const attachmentName = req.files.file.name;
      file.mv(config.get("staticPath") + "\\news\\" + attachmentName);
      return res.json({ attachmentName: attachmentName });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Ошибка загрузки обложки новости на сервер." });
    }
  }

  async uploadEvents(req, res) {
    try {
      const file = req.files.file;
      const attachmentName = req.files.file.name;
      file.mv(config.get("staticPath") + "\\events\\" + attachmentName);
      return res.json({ attachmentName: attachmentName });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Ошибка загрузки обложки события на сервер." });
    }
  }

  async uploadHotelsGallery(req, res) {
    try {
      const idHotel = req.query.id_hotel; //Получаем ID отеля из запроса
      const files = req.files.file; //Получаем файлы из запрсоа
      const fileNames = []; //Создаём пустой массив для хранения новых имён файлов
      const path = config.get("staticPath") + "\\hotels\\" + idHotel + "\\gallery\\"; //Заносим в переменную путь до директории
      const hotel = await Hotel.findById(idHotel); //Получаем из БД текущие данные отеля

      //Проверяем наличие директории: если не существует >> рекурсивно создаём директории до нужной
      if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
      }

      //Перебираем все файлы из запроса
      for (const file of files) {
        const fileName = Uuid.v4() + ".jpg"; //Генерируем новое имя
        file.mv(path + fileName); //Перемещаем файл в директорию

        //Добавляем в массив новое имя файла
        const fileNamesObj = { image: fileName };
        fileNames.push(fileNamesObj);
      }

      hotel.gallery = fileNames; //Применяем новые данные отеля
      await hotel.save(); //Сохранем отель

      return res.json({ message: "Выбранные изображения успешно загружены!", hotel }); //Возвращаем клиентской части список обновлённые данные отеля
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Ошибка загрузки изображений галереи на сервер." });
    }
  }

  async deleteHotelsGallery(req, res) {
    try {
      const idHotel = req.query.id_hotel; //Получаем ID отеля из запроса
      const hotel = await Hotel.findById(idHotel); //Получаем из БД текущие данные отеля
      const files = req.files.file; //Получаем файлы из запрсоа
      const fileNames = hotel.gallery; //Создаём пустой массив для хранения новых имён файлов
      const path = config.get("staticPath") + "\\hotels\\" + idHotel + "\\gallery\\"; //Заносим в переменную путь до директории

      //Перебираем все файлы из запроса
      for (const file of files) {
        //Проверяем наличие файла: если существует >> удаляем файл
        if (!fs.existsSync(path + file)) {
          fs.unlink(path + file);
        }

        //Добавляем в массив новое имя файла
        // const fileNamesObj = { image: fileName };
        // fileNames.push(fileNamesObj);
      }

      hotel.gallery = fileNames; //Применяем новые данные отеля
      await hotel.save(); //Сохранем отель

      return res.json({ message: "Выбранные изображения успешно загружены!", hotel }); //Возвращаем клиентской части список обновлённые данные отеля
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Ошибка загрузки изображений галереи на сервер." });
    }
  }
}

module.exports = new FileController();
