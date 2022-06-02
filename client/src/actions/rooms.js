import axios from 'axios';
import { API_URL } from '../config';
import { setRoomOne, setRoomsAll, setOneRoomUpdateInAllRooms } from '../reducers/roomsReducer';
import { toastView } from '../components/App';

///////////// Rooms ////////////////

//Функция добавления новой комнаты
export const roomAdd = async (id_hotel, name) => {
  //Оборовачиваем выполняемый код в try/cath для отлова ошибок
  try {
    //Отправка асинхронного POST-запроса на серверную часть
    const response = await axios.post(`${API_URL}api/auth/roomAdd`, {
      id_hotel,
      name,
    });
    toastView('success', response.data.message); //Вывод уведомления с ответом от сервера об успешном добавлении новых апартаментов
  } catch (e) {
    toastView('error', e.response.data.message); //В случае ошибки выводим уведомление
  }
};

//Функция получения одних апартаментов
export const roomOne = id => {
  return async dispatch => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Отправка асинхронного POST-запроса на серверную часть
      const response = await axios.get(`${API_URL}api/auth/roomOne?_id=${id}`);

      dispatch(setRoomOne(response.data.room));
    } catch (e) {
      toastView('error', e.response.data.message); //В случае ошибки выводим уведомление
    }
  };
};

//Функция получения всех записей Rooms для выбранного отеля
export const roomsAll = id_hotel => {
  return async dispatch => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Отправка асинхронного POST-запроса на серверную часть
      const response = await axios.get(`${API_URL}api/auth/roomsAll?id_hotel=${id_hotel}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, //Отправка токена аутентификации из локального хранилища на компьютере клиента
      });

      dispatch(setRoomsAll(response.data.rooms));
    } catch (e) {
      toastView('error', e.response.data.message); //В случае ошибки выводим уведомление
    }
  };
};

//Функция обновления комнаты
export const roomOneUpdate = async (_id, id_hotel, name, description, gallery, count_adults, count_childrens, price) => {
  return async dispatch => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Отправка асинхронного PUT-запроса на серверную часть
      const response = await axios.put(`${API_URL}api/auth/roomOneUpdate`, {
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

//Функция загрузки изображений галереи на сервер
export const roomGalleryUpload = (id_hotel, id_room, imagesList) => {
  return async dispatch => {
    try {
      const formData = new FormData();
      for (const image of imagesList) {
        formData.append('file', image);
      }

      const response = await axios.post(`${API_URL}api/files/roomGalleryUpload?id_hotel=${id_hotel}&id_room=${id_room}&count_images=${imagesList.length}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'multipart/form-data' },
      });

      dispatch(setOneRoomUpdateInAllRooms(response.data.room));
      toastView('success', response.data.message); //Вывод уведомления с ответом от сервера об успешной загрузке изображений в галерею апартаментов
    } catch (e) {
      toastView('error', e.response.data.message); //В случае ошибки выводим уведомление
    }
  };
};

//Функция удаления изображений галереи на сервер
export const roomGalleryDelete = (id_hotel, id_room, listNameImages) => {
  return async dispatch => {
    try {
      const response = await axios.post(`${API_URL}api/files/roomGalleryDelete?id_hotel=${id_hotel}&id_room=${id_room}`, listNameImages, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      dispatch(setOneRoomUpdateInAllRooms(response.data.room));
      toastView('success', response.data.message); //Вывод уведомления с ответом от сервера об успешно удалению изображений из галереи апартаментов
    } catch (e) {
      toastView('error', e.response.data.message); //В случае ошибки выводим уведомление
    }
  };
};
