const SET_DESCRIPTION = "SET_DESCRIPTION";
const SET_ICON = "SET_ICON";
const SET_TEMP = "SET_TEMP";
const SET_TEMP_FEELS_LIKE = "SET_TEMP_FEELS_LIKE";
const SET_HUMIDITY = "SET_HUMIDITY";
const SET_WIND_SPEED = "SET_WIND_SPEED";
const SET_VISIBILITY = "SET_VISIBILITY";

const defaultState = {
  description: "",
  icon: "",
  temp: "",
  tempFeelsLike: "",
  humidity: "",
  windSpeed: "",
  visibility: "",
};

export default function weatherReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_DESCRIPTION:
      return {
        ...state,
        description: action.payload,
      };
    case SET_ICON:
      return {
        ...state,
        icon: action.payload,
      };
    case SET_TEMP:
      return {
        ...state,
        temp: action.payload,
      };
    case SET_TEMP_FEELS_LIKE:
      return {
        ...state,
        tempFeelsLike: action.payload,
      };
    case SET_HUMIDITY:
      return {
        ...state,
        humidity: action.payload,
      };
    case SET_WIND_SPEED:
      return {
        ...state,
        windSpeed: action.payload,
      };
    case SET_VISIBILITY:
      return {
        ...state,
        visibility: action.payload,
      };
    default:
      return state;
  }
}
export const setWeatherDescription = (description) => ({ type: SET_DESCRIPTION, payload: description });
export const setWeatherIcon = (icon) => ({ type: SET_ICON, payload: icon });
export const setWeatherTemp = (temp) => ({ type: SET_TEMP, payload: temp });
export const setWeatherTempFeelsLike = (tempFeelsLike) => ({ type: SET_TEMP_FEELS_LIKE, payload: tempFeelsLike });
export const setWeatherHumidity = (humidity) => ({ type: SET_HUMIDITY, payload: humidity });
export const setWeatherWindSpeed = (windSpeed) => ({ type: SET_WIND_SPEED, payload: windSpeed });
export const setWeatherVisibility = (visibility) => ({ type: SET_VISIBILITY, payload: visibility });
