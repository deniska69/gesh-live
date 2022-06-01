import axios from 'axios';
import { API_URL } from '../config';
import { setRoomOne, setRoomsAll, setOneRoomUpdateInAllRooms } from '../reducers/roomsReducer';
import { toastView } from '../components/App';

///////////// Rooms ////////////////

//Функция добавления новой комнаты
export const addRoom = async (id_hotel, name) => {
  //Оборовачиваем выполняемый код в try/cath для отлова ошибок
  try {
    //Отправка асинхронного POST-запроса на серверную часть
    const response = await axios.post(`${API_URL}api/auth/addRoom`, {
      id_hotel,
      name,
    });
    toastView('success', response.data.message); //Вывод уведомления с ответом от сервера об успешном добавлении новых апартаментов
  } catch (e) {
    toastView('error', e.response.data.message); //В случае ошибки выводим уведомление
  }
};

//Функция получения всех записей Rooms для выбранного отеля
export const allRoom = id_hotel => {
  return async dispatch => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Отправка асинхронного POST-запроса на серверную часть
      const response = await axios.get(`${API_URL}api/auth/allRoom?id_hotel=${id_hotel}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, //Отправка токена аутентификации из локального хранилища на компьютере клиента
      });

      dispatch(setRoomsAll(response.data.rooms));
    } catch (e) {
      toastView('error', e.response.data.message); //В случае ошибки выводим уведомление
    }
  };
};

//Функция обновления комнаты
export const updateRoom = async (_id, id_hotel, name, description, gallery, count_adults, count_childrens, price) => {
  return async dispatch => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Отправка асинхронного PUT-запроса на серверную часть
      const response = await axios.put(`${API_URL}api/auth/updateOneRoom`, {
        _id,
        id_hotel,
        name,
        description,
        gallery,
        count_adults,
        count_childrens,
        price,
      });

      dispatch(setOneRoomUpdateInAllRooms(response.data.rooms));
      toastView('success', response.data.message); //Вывод уведомления с ответом от сервера об успешном обновлении данных апартаментов
    } catch (e) {
      toastView('error', e.response.data.message); //В случае ошибки выводим уведомление
    }
  };
};

//Функция получения одних апартаментов
export const oneRoom = id => {
  return async dispatch => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Отправка асинхронного POST-запроса на серверную часть
      const response = await axios.get(`${API_URL}api/auth/oneRoom?_id=${id}`);

      dispatch(setRoomOne(response.data.room));
    } catch (e) {
      toastView('error', e.response.data.message); //В случае ошибки выводим уведомление
    }
  };
};
