import axios from "axios";
import { API_URL } from "../config";
import { setAllHotels, setOneHotel } from "../reducers/hotelsReducer";
import { toastView } from "../components/App";

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
    toastView("success", response.data.message); //Вывод уведомления с ответом от сервера об успешном добавлении нового отеля
  } catch (e) {
    toastView("error", e.response.data.message); //В случае ошибки выводим уведомление
  }
};

//Функция получения всех записей Hotels
export const allHotel = () => {
  return async (dispatch) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Отправка асинхронного POST-запроса на серверную часть
      const response = await axios.get(`${API_URL}api/auth/allHotel`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, //Отправка токена аутентификации из локального хранилища на компьютере клиента
      });

      dispatch(setAllHotels(response.data.hotels));
    } catch (e) {
      toastView("error", e.response.data.message); //В случае ошибки выводим уведомление
    }
  };
};

//Функция обновления данных отеля
export const updateHotel = (_id, name, description, id_manager) => {
  return async (dispatch) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Отправка асинхронного PUT-запроса на серверную часть
      const response = await axios.put(`${API_URL}api/auth/updateHotel`, {
        _id,
        name,
        description,
        id_manager,
      });
      dispatch(setOneHotel(response.data.hotel));
      toastView("success", response.data.message); //Вывод уведомления с ответом от сервера об успешном обновлении данных отеля
    } catch (e) {
      toastView("error", e.response.data.message); //В случае ошибки выводим уведомление
    }
  };
};
