import axios from "axios";
import { API_OPENWEAETHERMAP_ORG } from "../config";
import { CiTY_ID_OPENWEAETHERMAP_ORG } from "../config";
import { setWeatherDescription } from "../reducers/weatherReducer";
import { setWeatherIcon } from "../reducers/weatherReducer";
import { setWeatherTemp } from "../reducers/weatherReducer";
import { setWeatherTempFeelsLike } from "../reducers/weatherReducer";
import { setWeatherHumidity } from "../reducers/weatherReducer";
import { setWeatherWindSpeed } from "../reducers/weatherReducer";
import { setWeatherVisibility } from "../reducers/weatherReducer";
const apiUrl = `http://api.openweathermap.org/data/2.5/weather?id=${CiTY_ID_OPENWEAETHERMAP_ORG}&lang=ru&units=metric&appid=${API_OPENWEAETHERMAP_ORG}`;

//Функция загрузки погоды с сайта https://openweathermap.org/
export const getWeather = () => {
  return async (dispatch) => {
    //Оборовачиваем выполняемый код в try/cath для отлова ошибок
    try {
      //Отправка асинхронного GET-запроса на серверную часть
      const response = await axios.get(apiUrl);

      dispatch(setWeatherDescription(response.data.weather[0]["description"].charAt(0).toUpperCase() + response.data.weather[0]["description"].slice(1)));
      dispatch(setWeatherIcon(response.data.weather[0]["icon"]));
      dispatch(setWeatherTemp(Math.round(response.data.main.temp)));
      dispatch(setWeatherTempFeelsLike(Math.round(response.data.main.feels_like)));
      dispatch(setWeatherHumidity(response.data.main.humidity));
      dispatch(setWeatherWindSpeed(response.data.wind.speed));
      dispatch(setWeatherVisibility(response.data.visibility));
    } catch (e) {
      return false; //В случае ошибки возвращаем false
    }
  };
};
