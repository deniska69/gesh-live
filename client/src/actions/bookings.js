import axios from "axios";
import { API_URL } from "../config";
import { WWW_URL } from "../config";
import { setExBooking } from "../reducers/bookingReducer";
import { setFindBooking } from "../reducers/bookingReducer";
import { setHistory } from "../reducers/bookingReducer";
import { setOneBooking } from "../reducers/bookingReducer";

///////////// Bookings /////////////

//Функция записи Bookings в БД записи о бронировании
export const booking = async (id_user, id_hotel, id_room, person1, person2, date1, date2, price, date_add, nameHotel, nameRoom, email, status) => {
  //Оборовачиваем выполняемый код в try/cath для отлова ошибок
  try {
    //Отправка асинхронного POST-запроса на серверную часть
    const response = await axios.post(`${API_URL}api/auth/booking`, {
      id_user,
      id_hotel,
      id_room,
      person1,
      person2,
      date1,
      date2,
      price,
      date_add,
      nameHotel,
      nameRoom,
      email,
      status: 0,
    });

    alert(response.data.message); //Вывод уведомления с ответом от сервера об успешной записи в БД

    window.location.href = `${WWW_URL}cabinet`; //Перевод пользователя на страницу его личного кабинета
  } catch (e) {
    alert(e.response.data.message); //В случае ошибки выводим уведомление с ответом от сервера об ошибке
  }
};

//Функция получения всех записей Bookings для выбранного id_user
export const allBookings = (id_user) => {
  return async (dispatch) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Отправка асинхронного POST-запроса на серверную часть
      const response = await axios.get(`${API_URL}api/auth/allBookings?id_user=${id_user}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, //Отправка токена аутентификации из локального хранилища на компьютере клиента
      });

      dispatch(setHistory(response.data.bookings));
    } catch (e) {
      alert(e); //В случае ошибки выводим уведомление с ответом от сервера об ошибке
    }
  };
};

//Функция получения одной записи Bookings для выбранного id_booking
export const oneBooking = (id) => {
  return async (dispatch) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Отправка асинхронного POST-запроса на серверную часть
      const response = await axios.get(`${API_URL}api/auth/oneBooking?_id=${id}`, {});

      dispatch(setOneBooking(response.data.booking));
    } catch (e) {
      alert(e); //В случае ошибки выводим уведомление с ответом от сервера об ошибке
    }
  };
};

//Функция обновления статуса одной записи отелей
export const updateBooking = async (_id, status) => {
  //Оборовачиваем выполняемый код в try/cath для отлова ошибок
  try {
    //Отправка асинхронного PUT-запроса на серверную часть
    const response = await axios.put(`${API_URL}api/auth/updateBooking`, {
      _id,
      status,
    });
    alert(response.data.message); //Вывод уведомления с ответом от сервера об успешной регистрации
  } catch (e) {
    alert(e.response.data.message); //В случае ошибки выводим уведомление с ответом от сервера об ошибке
  }
};

//Функция получения всех записей Booking и Rooms для выбранных условий поиска бронирования
export const findBooking = (id_hotel, person1, person2, date1, date2) => {
  return async (dispatch) => {
    /* eslint eqeqeq: 0 */
    if (id_hotel == "all") {
      //Оборовачиваем выполняемый код в try/cath для отлова ошибок
      try {
        //Отправка асинхронного POST-запроса на серверную часть
        const response = await axios.get(`${API_URL}api/auth/findExBooking?person1=${person1}&person2=${person2}&date1=${date1}&date2=${date2}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, //Отправка токена аутентификации из локального хранилища на компьютере клиента
        });

        //Заносим найденые апартаменты в редюсер
        dispatch(setExBooking(response.data.booking));

        //Отправка асинхронного POST-запроса на серверную часть
        const response2 = await axios.get(`${API_URL}api/auth/findRoomBooking?person1=${person1}&person2=${person2}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, //Отправка токена аутентификации из локального хранилища на компьютере клиента
        });

        //Заносим найденые апартаменты в редюсер
        dispatch(setFindBooking(response2.data.rooms));

        console.log("\nНайдено всего бронирований: " + Object.keys(response.data.booking).length);
        console.log("\nНайдено всего апартаментов: " + Object.keys(response2.data.rooms).length);
      } catch (e) {
        alert(e); //В случае ошибки выводим уведомление с ответом от сервера об ошибке
      }
    } else {
      //Оборовачиваем выполняемый код в try/cath для отлова ошибок
      try {
        //Отправка асинхронного POST-запроса на серверную часть
        const response = await axios.get(`${API_URL}api/auth/findExBooking?id_hotel=${id_hotel}&person1=${person1}&person2=${person2}&date1=${date1}&date2=${date2}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, //Отправка токена аутентификации из локального хранилища на компьютере клиента
        });

        //Заносим найденые апартаментыв редюсер
        dispatch(setExBooking(response.data.booking));

        //Отправка асинхронного POST-запроса на серверную часть
        const response2 = await axios.get(`${API_URL}api/auth/findRoomBooking?id_hotel=${id_hotel}&person1=${person1}&person2=${person2}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, //Отправка токена аутентификации из локального хранилища на компьютере клиента
        });

        //Заносим найденые апартаменты в редюсер
        dispatch(setFindBooking(response2.data.rooms));
      } catch (e) {
        alert(e); //В случае ошибки выводим уведомление с ответом от сервера об ошибке
      }
    }
  };
};
