//Импортируем схему и модель из пакета mongoose
const { Schema, model, ObjectId } = require("mongoose");

//Создаём схему, в которой будет храниться информация о полях сущности Booking
const Hotels = new Schema({
  //id - создаются по умолчанию автоматически

  //Название отеля - тип поля: строковый, обязательный, не уникальный
  name: { type: String, required: true },

  //ID Менеджера отеля - тип поля: строковый, не обязательный, не уникальный
  id_manager: { type: String },

  //Описание отеля - тип поля: строковый, не обязательный, не уникальный
  description: { type: String },

  //Ссылка отеля - тип поля: строковый, не обязательный, не уникальный
  url: { type: String },

  benefits: [{ title: { type: String }, description: { type: String } }],
});

//Экспорт схемы
module.exports = model("Hotels", Hotels);
