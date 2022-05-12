import axios from "axios";
import { API_URL } from "../config";
import { setAllNews } from "../reducers/newsReducer";

///////////// News /////////////////

//Функция загрузки обложки новости
export const uploadAttachmentNews = (file, attachmentName) => {
  return async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append("file", file, attachmentName);

      await axios.post(`${API_URL}api/files/news`, formData);
    } catch (e) {
      console.log(e);
    }
  };
};

//Функция добавления новой новости
export const addNews = async (text1, text2, date, attachment) => {
  //Оборовачиваем выполняемый код в try/cath для отлова ошибок
  try {
    let date_add = new Date();

    //Отправка асинхронного POST-запроса на серверную часть

    /*eslint-disable no-unused-vars*/
    const response = await axios.post(`${API_URL}api/auth/addNews`, {
      text1,
      text2,
      date,
      date_add,
      attachment,
    });
    /*eslint-enable no-unused-vars*/

    alert("Новость добавлена!");
  } catch (e) {
    //В случае ошибки выводим уведомление с ответом от сервера об ошибке
    alert("actions addNews: ошибка.");
  }
};

//Функция получения всех записей новостей
export const allNews = () => {
  return async (dispatch) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Отправка асинхронного GET-запроса на серверную часть
      const response = await axios.get(`${API_URL}api/auth/allNews`);

      //Занесение полученного списка претензий в редюсер претензий
      dispatch(setAllNews(response.data.news));
    } catch (e) {
      alert(e); //В случае ошибки выводим уведомление с ответом от сервера об ошибке
    }
  };
};

//Функция обновления записи одной новости
export const updateNews = async (_id, text1, text2, date) => {
  //Оборовачиваем выполняемый код в try/cath для отлова ошибок
  try {
    //Отправка асинхронного PUT-запроса на серверную часть
    const response = await axios.put(`${API_URL}api/auth/updateNews`, {
      _id,
      text1,
      text2,
      date,
    });

    alert(response.data.message); //Вывод уведомления с ответом от сервера об успешной регистрации
  } catch (e) {
    alert(e.response.data.message); //В случае ошибки выводим уведомление с ответом от сервера об ошибке
  }
};
