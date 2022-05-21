import axios from "axios";
import { setUserCurrentAuth } from "../reducers/userReducer";
import { setUserCurrentAuthIsAdmin } from "../reducers/userReducer";
import { setUserOneList } from "../reducers/userReducer";
import { setUserAllList } from "../reducers/userReducer";
import { setUserUpdateOneInAllList } from "../reducers/userReducer";
import { API_URL } from "../config";
import { WWW_URL } from "../config";
import { toastView } from "../components/App";

///////////// Users ////////////////

//Функция регистрации, принимает параметры: эл.потча, пароль, ф.и.о, уровень доступ
export const registration = async (email, password, name, id_acc) => {
  //Оборовачиваем выполняемый код в try/cath для отлова ошибок
  try {
    //В случае, если не получен уровень доступа при вызове функции, устанавливаем по-умолчанию уровень доступа обычного пользователя
    id_acc = id_acc || 1;

    //Уровень доступа = 1 (Обычный пользователь)
    //Уровень доступа = 2 (Администратор)
    //Уровень доступа = 3 (Менеджер отеля)

    //Отправка асинхронного POST-запроса на серверную часть
    const response = await axios.post(`${API_URL}api/auth/registration`, {
      email,
      password,
      name,
      id_acc,
      enable: 1,
    });

    toastView("success", response.data.message); //Вывод уведомления с ответом от сервера об успешной регистрации
  } catch (e) {
    toastView("error", e.response.data.message); //В случае ошибки выводим уведомление
  }
};

//Функция авторизации, принимает параметры: эл.почта, пароль
export const login = (email, password) => {
  return async (dispatch) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Отправка асинхронного POST-запроса на серверную часть
      const response = await axios.post(`${API_URL}api/auth/login`, {
        email,
        password,
      });

      dispatch(setUserCurrentAuth(response.data.user)); //Обработка ответа от сервера

      // eslint-disable-next-line
      if (response.data.user.id_acc == 2) {
        dispatch(setUserCurrentAuthIsAdmin());
      }

      localStorage.setItem("token", response.data.token); //Сохранение токена аутентификации в локальном хранилище на компьютер клиента

      window.location.href = `${WWW_URL}cabinet`; //Перевод пользователя на страницу его личного кабинета
    } catch (e) {
      toastView("error", e.response.data.message); //В случае ошибки выводим уведомление
    }
  };
};

//Функция аутентификации пользователя
export const auth = () => {
  return async (dispatch) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Отправка асинхронного GET-запроса на серверную часть
      const response = await axios.get(`${API_URL}api/auth/auth`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, //Отправка токена аутентификации из локального хранилища на компьютере клиента
      });
      dispatch(setUserCurrentAuth(response.data.user)); //Обработка ответа от сервера
      localStorage.setItem("token", response.data.token); //Сохранение токена авторизации на компьютер клиента
      // eslint-disable-next-line
      if (response.data.user.id_acc == 2) {
        dispatch(setUserCurrentAuthIsAdmin());
      }
    } catch (e) {
      localStorage.removeItem("token"); //В случае ошибки выводим уведомление с ответом от сервера об ошибке
      toastView("error", e.response.data.message); //В случае ошибки выводим уведомление
    }
  };
};

//Функция загрузки аватара
export const uploadAvatar = (_id, file) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(`${API_URL}api/files/avatar`, formData, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
      dispatch(setUserCurrentAuth(response.data));
      toastView("success", "Аватар успешно обновлён."); //Вывод уведомления с ответом от сервера об успешной блокировке
    } catch (e) {
      toastView("error", e.response.data.message); //В случае ошибки выводим уведомление
    }
  };
};

//Функция получения всех записей User
export const allUser = (id_acc) => {
  return async (dispatch) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Отправка асинхронного POST-запроса на серверную часть
      const response = await axios.get(`${API_URL}api/auth/allUsers?id_acc=${id_acc}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, //Отправка токена аутентификации из локального хранилища на компьютере клиента
      });

      dispatch(setUserAllList(response.data.user));
    } catch (e) {
      toastView("error", e.response.data.message); //В случае ошибки выводим уведомление
    }
  };
};

//Функция получения одой записи User
export const oneUser = (id) => {
  return async (dispatch) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Отправка асинхронного POST-запроса на серверную часть
      const response = await axios.get(`${API_URL}api/auth/oneUser?_id=${id}`);

      dispatch(setUserOneList(response.data.user));
    } catch (e) {
      toastView("error", e.response.data.message); //В случае ошибки выводим уведомление
    }
  };
};

//Функция обновления профиля, принимает параметры: идентификатор пользователя, эл.потча, пароль, ф.и.о
export const updateProfile = (_id, email, password, name, id_acc) => {
  return async (dispatch) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Отправка асинхронного PUT-запроса на серверную часть
      const response = await axios.put(`${API_URL}api/auth/updateProfile`, {
        _id,
        email,
        password,
        name,
        id_acc,
      });

      dispatch(setUserUpdateOneInAllList(response.data.user));
      toastView("success", response.data.message); //Вывод уведомления с ответом от сервера об успешном обновлении профиля
    } catch (e) {
      toastView("error", e.response.data.message); //В случае ошибки выводим уведомление
    }
  };
};

//Функция блокировки пользователя, принимает параметры: идентификатор пользователя, значение enable
export const blockProfile = (_id, enable) => {
  return async (dispatch) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Отправка асинхронного PUT-запроса на серверную часть
      const response = await axios.put(`${API_URL}api/auth/blockProfile`, {
        _id,
        enable,
      });

      dispatch(setUserUpdateOneInAllList(response.data.user));
      toastView("success", response.data.message); //Вывод уведомления с ответом от сервера об успешной блокировке
    } catch (e) {
      toastView("error", e.response.data.message); //В случае ошибки выводим уведомление
    }
  };
};

//Функция блокировки пользователя, принимает параметры: идентификатор пользователя, значение enable
export const deleteAvatar = (_id) => {
  return async (dispatch) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Отправка асинхронного PUT-запроса на серверную часть
      const response = await axios.put(`${API_URL}api/auth/deleteAvatar`, {
        _id,
      });

      dispatch(setUserUpdateOneInAllList(response.data.user));
      toastView("success", response.data.message); //Вывод уведомления с ответом от сервера об успешной блокировке
    } catch (e) {
      toastView("error", e.response.data.message); //В случае ошибки выводим уведомление
    }
  };
};
