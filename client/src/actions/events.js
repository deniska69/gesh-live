import axios from "axios";
import { API_URL } from "../config";
import { setAllEvents } from "../reducers/eventsReducer";

///////////// Events ///////////////

//Функция загрузки обложки события
export const uploadAttachmentEvents = (file, attachmentName) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("file", file, attachmentName);

      await axios.post(`${API_URL}api/files/events`, formData);
    } catch (e) {
      console.log(e);
    }
  };
};

//Функция добавления нового события
export const addEvents = async (text1, text2, text3, attachment) => {
  //Оборовачиваем выполняемый код в try/cath для отлова ошибок
  try {
    let date_add = new Date();

    //Отправка асинхронного POST-запроса на серверную часть

    /*eslint-disable no-unused-vars*/
    const response = await axios.post(`${API_URL}api/auth/addEvents`, {
      text1,
      text2,
      text3,
      date_add,
      attachment,
    });
    /*eslint-enable no-unused-vars*/

    alert("Событие добавлено!");
  } catch (e) {
    //В случае ошибки выводим уведомление с ответом от сервера об ошибке
    alert("actions addEvents: ошибка.");
  }
};

//Функция получения всех записей событийй
export const allEvents = () => {
  return async (dispatch) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Отправка асинхронного GET-запроса на серверную часть
      const response = await axios.get(`${API_URL}api/auth/allEvents`);

      //Занесение полученного списка претензий в редюсер претензий
      dispatch(setAllEvents(response.data.events));
    } catch (e) {
      alert(e); //В случае ошибки выводим уведомление с ответом от сервера об ошибке
    }
  };
};

//Функция обновления записи одного события
export const updateEvents = async (_id, text1, text2, text3) => {
  //Оборовачиваем выполняемый код в try/cath для отлова ошибок
  try {
    //Отправка асинхронного PUT-запроса на серверную часть
    const response = await axios.put(`${API_URL}api/auth/updateEvents`, {
      _id,
      text1,
      text2,
      text3,
    });

    alert(response.data.message); //Вывод уведомления с ответом от сервера об успешной регистрации
  } catch (e) {
    alert(e.response.data.message); //В случае ошибки выводим уведомление с ответом от сервера об ошибке
  }
};
