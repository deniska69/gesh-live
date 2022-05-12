import React from "react";
import { useSelector } from "react-redux";
import "./home.css";
import centr_img from "../../assets/img/home/line.svg";
import cards1 from "../../assets/img/home/cards1.png";
import cards2 from "../../assets/img/home/cards2.png";
import cards3 from "../../assets/img/home/cards3.png";
import cards4 from "../../assets/img/home/cards4.png";

const Home = () => {
  //Получаем из редюсера состояние: авторизован ли пользователь
  const isAuth = useSelector((state) => state.user.isAuth);

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Ссылки-меню под шапкой */}
        <div className="continer-fluid">
          <div className="row row_home">
            <div className="col-lg-6 offset-lg-6">
              <div id="parent">
                <div id="child">
                  <a className="ac" href="/history">
                    История основания горы
                  </a>
                  <a className="ac" href="/gallery">
                    Фотогаллерея
                  </a>
                  <a className="ac" href="/press">
                    Пресс-службы заведений
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Центральная надпись */}
        <div className="row text-center row_home">
          <div id="parentcc">
            <div id="childcc">
              О Шерегеше и Горной Шории
              <p className="centr_nadpis">Второй по величине и первый по популярности</p>
              <p className="centr_nadpis">горнолыжный курорт в России</p>
              {/* eslint-disable-next-line */}
              <img className="centr_img" src={centr_img} />
            </div>
          </div>
        </div>

        {/* Три большие кнопки */}
        <div className="row justify-content-center row_home">
          <div className="card" id="baseCard">
            <div className="card-body">
              {!isAuth && (
                /* eslint-disable-next-line */
                <a className="threeBtn" href="#" data-bs-toggle="modal" data-bs-target="#enterCabinetModal">
                  Бронирование
                </a>
              )}
              {isAuth && (
                <a className="threeBtn" href="/booking">
                  Бронирование
                </a>
              )}
              <a className="threeBtn" href="/events">
                Мероприятия
              </a>
              <a className="threeBtn" href="/news">
                Новости
              </a>
            </div>
          </div>
        </div>

        {/* Информационный блок */}
        <div className="row text-center row_home">
          <div id="parentcc">
            <div id="childcc">
              <p className="info_p">Узнай больше о Шерегеше</p>
            </div>
          </div>

          <div className="row justify-content-center row_home">
            <div className="col-auto">
              {/* eslint-disable-next-line */}
              <img src={cards1} className="info_img" />
            </div>
            <div className="col-auto">
              {/* eslint-disable-next-line */}
              <img src={cards2} className="info_img" />
            </div>
            <div className="col-auto">
              {/* eslint-disable-next-line */}
              <img src={cards3} className="info_img" />
            </div>
            <div className="col-auto">
              {/* eslint-disable-next-line */}
              <img src={cards4} className="info_img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
