import axios from 'axios';
import { API_URL } from '../config';
//import { setAllHotels, setOneHotelUpdate, setOneHotel, setOneHotelFromAllHotels } from "../reducers/hotelsReducer";
import { setHotelOne, setHotelsAll, setOneHotelUpdateInAllHotels } from '../reducers/hotelsReducer';
import { toastView } from '../components/App';

///////////// Hotels ///////////////

//Функция добавления нового отеля
export const addHotel = async (name, id_manager) => {
  //Оборовачиваем выполняемый код в try/cath для отлова ошибок
  try {
    //Отправка асинхронного POST-запроса на серверную часть
    const response = await axios.post(`${API_URL}api/auth/addHotel`, {
      name,
      id_manager,
    });
    toastView('success', response.data.message); //Вывод уведомления с ответом от сервера об успешном добавлении нового отеля
  } catch (e) {
    toastView('error', e.response.data.message); //В случае ошибки выводим уведомление
  }
};

//Функция получения данных одного отеля
export const oneHotel = (_id, url) => {
  return async dispatch => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Отправка асинхронного PUT-запроса на серверную часть
      const response = await axios.put(`${API_URL}api/auth/hotelOne`, {
        _id,
        url,
      });
      dispatch(setHotelOne(response.data.hotel));
      toastView('success', response.data.message); //Вывод уведомления с ответом от сервера об успешном обновлении данных отеля
    } catch (e) {
      toastView('error', e.response.data.message); //В случае ошибки выводим уведомление
    }
  };
};

//Функция получения всех записей Hotels
export const allHotels = () => {
  return async dispatch => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Отправка асинхронного POST-запроса на серверную часть
      const response = await axios.get(`${API_URL}api/auth/allHotel`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, //Отправка токена аутентификации из локального хранилища на компьютере клиента
      });

      dispatch(setHotelsAll(response.data.hotels));
    } catch (e) {
      toastView('error', e.response.data.message); //В случае ошибки выводим уведомление
    }
  };
};

//Функция обновления данных отеля
export const updateHotel = (_id, name, description, id_manager, url, benefits) => {
  return async dispatch => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Отправка асинхронного PUT-запроса на серверную часть
      const response = await axios.put(`${API_URL}api/auth/hotelOneUpdate`, {
        _id,
        name,
        description,
        id_manager,
        url,
        benefits,
      });

      dispatch(setOneHotelUpdateInAllHotels(response.data.hotel));
      toastView('success', response.data.message); //Вывод уведомления с ответом от сервера об успешном обновлении данных отеля
    } catch (e) {
      toastView('error', e.response.data.message); //В случае ошибки выводим уведомление
    }
  };
};

//Функция загрузки изображений галереи на сервер
export const uploadHotelsGallery = (id_hotel, imagesList) => {
  return async dispatch => {
    try {
      const formData = new FormData();
      for (const image of imagesList) {
        formData.append('file', image);
      }

      const response = await axios.post(`${API_URL}api/files/uploadHotelsGallery?id_hotel=${id_hotel}&count_images=${imagesList.length}`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'multipart/form-data' },
      });

      dispatch(setOneHotelUpdateInAllHotels(response.data.hotel));
      toastView('success', response.data.message); //Вывод уведомления с ответом от сервера об успешной загрузке изображений в галерею отеля
    } catch (e) {
      toastView('error', e.response.data.message); //В случае ошибки выводим уведомление
    }
  };
};

//Функция удаления изображений галереи на сервер
export const deleteHotelsGallery = (id_hotel, listNameImages) => {
  return async dispatch => {
    try {
      const response = await axios.post(`${API_URL}api/files/deleteHotelsGallery?id_hotel=${id_hotel}`, listNameImages, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      dispatch(setOneHotelUpdateInAllHotels(response.data.hotel));
      toastView('success', response.data.message); //Вывод уведомления с ответом от сервера об успешно удалению изображений из галереи отеля
    } catch (e) {
      toastView('error', e.response.data.message); //В случае ошибки выводим уведомление
    }
  };
};
