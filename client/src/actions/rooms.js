import axios from "axios";
import { API_URL } from "../config";
import { setAllRooms } from "../reducers/roomsReducer";
import { setRoom } from "../reducers/roomsReducer";

///////////// Rooms ////////////////

//Функция добавления новой комнаты
export const addRoom = async (id_hotel, name, person1, person2, price) => {
  //Оборовачиваем выполняемый код в try/cath для отлова ошибок
  try {
    //Отправка асинхронного POST-запроса на серверную часть
    const response = await axios.post(`${API_URL}api/auth/addRoom`, {
      id_hotel,
      name,
      person1,
      person2,
      price,
    });
    alert(response.data.message); //Вывод уведомления с ответом от сервера об успешной регистрации
  } catch (e) {
    alert(e.response.data.message); //В случае ошибки выводим уведомление с ответом от сервера об ошибке
  }
};

//Функция получения всех записей Rooms для выбранного отеля
export const allRoom = (id_hotel) => {
  return async (dispatch) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Отправка асинхронного POST-запроса на серверную часть
      const response = await axios.get(`${API_URL}api/auth/allRoom?id_hotel=${id_hotel}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, //Отправка токена аутентификации из локального хранилища на компьютере клиента
      });

      dispatch(setAllRooms(response.data.rooms));
    } catch (e) {
      alert(e); //В случае ошибки выводим уведомление с ответом от сервера об ошибке
    }
  };
};

//Функция обновления комнаты
export const updateRoom = async (_id, id_hotel, name, person1, person2, price) => {
  //Оборовачиваем выполняемый код в try/cath для отлова ошибок
  try {
    //Отправка асинхронного PUT-запроса на серверную часть
    const response = await axios.put(`${API_URL}api/auth/updateRoom`, {
      _id,
      id_hotel,
      name,
      person1,
      person2,
      price,
    });
    alert(response.data.message); //Вывод уведомления с ответом от сервера об успешной регистрации
  } catch (e) {
    alert(e.response.data.message); //В случае ошибки выводим уведомление с ответом от сервера об ошибке
  }
};

//Функция получения одной записи Bookings для выбранного id_booking
export const oneRoom = (id) => {
  return async (dispatch) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Отправка асинхронного POST-запроса на серверную часть
      const response = await axios.get(`${API_URL}api/auth/oneRoom?_id=${id}`);

      dispatch(setRoom(response.data.room));
    } catch (e) {
      alert(e); //В случае ошибки выводим уведомление с ответом от сервера об ошибке
    }
  };
};
