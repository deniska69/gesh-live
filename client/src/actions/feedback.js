import axios from "axios";
import { API_URL } from "../config";

///////////// Feedback /////////////

//Функция отправки запроса
export const feedback = async (text, email, phone) => {
  //Оборовачиваем выполняемый код в try/cath для отлова ошибок
  try {
    //Отправка асинхронного POST-запроса на серверную часть
    const response = await axios.post(`${API_URL}api/auth/feedback`, {
      text,
      email,
      phone,
    });

    alert(response.data.message); //Вывод уведомления с ответом от сервера об успешной записи в БД
  } catch (e) {
    alert(e.response.data.message); //В случае ошибки выводим уведомление с ответом от сервера об ошибке
  }
};
