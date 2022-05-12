import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeather } from "../../actions/weather";
import "./weather.css";

const Weather = () => {
  const dispatch = useDispatch();

  //Вызов функции для получения всех записей претензий из базы данных
  useEffect(() => {
    dispatch(getWeather());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const descriptionWeather = useSelector((state) => state.weather.description);
  const iconWeather = useSelector((state) => state.weather.icon);
  const tempWeather = useSelector((state) => state.weather.temp);
  const tempFeelsLikeWeather = useSelector((state) => state.weather.tempFeelsLike);
  const humidityWeather = useSelector((state) => state.weather.humidity);
  const windSpeedWeather = useSelector((state) => state.weather.windSpeed);
  const visibilityWeather = useSelector((state) => state.weather.visibility);

  return (
    <div className="card cardWeather">
      <div className="card-body">
        <div className="row">
          <h3>Прогноз погоды в Шерегеше</h3>
          <br />
          <br />

          {/* eslint-disable-next-line */}
          <div className="row _clear rowWeatherIconAndTemp">
            <div className="col _clear colWeatherIcon text-center">
              {/* eslint-disable-next-line */}
              <img src={`https://openweathermap.org/img/wn/${iconWeather}@2x.png`} className="iconWeather"></img>
            </div>
            <div className="col _clear colWeatherTemp">
              <h1>{tempWeather}&deg;</h1>
            </div>
          </div>

          <div className="row _clear rowWeatherFeelsLikeTempAndDescription">
            <div className="col _clear">
              <h6>
                Ощущается как {tempFeelsLikeWeather}&deg;. {descriptionWeather}
              </h6>
            </div>
          </div>

          <div className="row _clear rowWeatherOther">
            <div className="col colWeatherOther">
              <p className="pWeather">Скорость ветра: {windSpeedWeather}м/с</p>
              <p className="pWeather">Влажность: {humidityWeather}%</p>
              <p className="pWeather">Видимость: {visibilityWeather / 1000}КМ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
