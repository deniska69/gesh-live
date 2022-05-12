//Импортируем схему и модель из пакета mongoose
const { Schema, model, ObjectId } = require("mongoose")

//Создаём схему, в которой будет храниться информация о полях сущности User
const Rooms = new Schema({

    id_hotel: { type: ObjectId, ref: 'Hotels' },
    name: { type: String },
    person1: { type: Number },
    person2: { type: Number },
    price: { type: Number },
    hotel: []

})

//Экспорт схемы
module.exports = model('Rooms', Rooms)