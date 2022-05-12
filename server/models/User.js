//Импортируем схему и модель из пакета mongoose
const { Schema, model, ObjectId } = require("mongoose");

//Создаём схему, в которой будет храниться информация о полях сущности User
const User = new Schema({
  //id - создаются по умолчанию автоматически

  //enable - тип поля: int, не уникальный, обязательный, по умолчанию: 1 (активный пользователь)
  enable: { type: Number, required: true },

  //email - тип поля: строковый, уникальный, обязательный
  email: { type: String, required: true, unique: true },

  //password - тип поля: строковый, не уникальный, обязательный
  password: { type: String, required: true },

  //name - тип поля: строковый, не уникальный, обязательный
  name: { type: String, required: true },

  //id_acc - тип поля: int, не уникальный, обязательный, по умолчанию: 1 (обычный пользователь)
  id_acc: { type: Number, required: true },

  //avatar - тип поля: строковый, не уникальынй, не обязательный
  avatar: { type: String },
});

//Экспорт схемы
module.exports = model("User", User);
