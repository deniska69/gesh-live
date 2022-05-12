//Импортируем схему и модель из пакета mongoose
const { Schema, model, ObjectId } = require("mongoose")

//Создаём схему, в которой будет храниться информация о полях сущности Booking
const Bookings = new Schema({

    id_user: { type: ObjectId, ref: 'User' },
    id_hotel: { type: ObjectId, ref: 'Hotels' },
    id_room: { type: ObjectId, ref: 'Rooms' },
    person1: { type: Number },
    person2: { type: Number },
    date1: { type: Date },
    date2: { type: Date },
    price: { type: Number },
    date_add: { type: Date },
    status: { type: Number }

})

//Экспорт схемы
module.exports = model('Bookings', Bookings)