//Импортируем схему и модель из пакета mongoose
const {Schema, model, ObjectId} = require("mongoose")

//Создаём схему, в которой будет храниться информация о полях сущности Booking
const News = new Schema({
    
    text1: {type: String},
    text2: {type: String},
    date: {type: String},
    cover: {type: String},
    date_add: {type: String}

})

//Экспорт схемы
module.exports = model('News', News)