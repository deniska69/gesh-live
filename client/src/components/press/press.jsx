import React from 'react';
import './press.css';
import press1 from '../../assets/img/press/press1.jpg';
import press2 from '../../assets/img/press/press2.jpg';
import press3 from '../../assets/img/press/press3.jpg';
import press4 from '../../assets/img/press/press4.jpg';
import press5 from '../../assets/img/press/press5.jpg';

const Weather = () => {
  return (
    <div className="card" id="card_press">
      <div className="card-body">
        <div className="row">
          <h5>Пресс-службы заведений</h5>
          <br />
          <br />

          <div className="card card_press">
            {/* eslint-disable-next-line */}
            <img src={press1} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Аттракцион «Перевёрнутый дом»</h5>
              <p className="card-text">Внутри это обычный двухэтажный дом. Только...</p>
              {/* eslint-disable-next-line */}
              <a href="#" className="btn btn-primary btn-sm">
                Подробнее
              </a>
            </div>
          </div>

          <div className="card card_press">
            {/* eslint-disable-next-line */}
            <img src={press2} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Йети-парк «Alpen Club»</h5>
              <p className="card-text">По легенде, проходя в пещеру, маленькие гости попадают в мир, наполненный тайнами, магией и легендами...</p>
              {/* eslint-disable-next-line */}
              <a href="#" className="btn btn-primary btn-sm">
                Подробнее
              </a>
            </div>
          </div>

          <div className="card card_press">
            {/* eslint-disable-next-line */}
            <img src={press3} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Экскурсия на снегоходах</h5>
              <p className="card-text">Для тех, кто уже успел попробовать все трассы, подойдёт экстремальное развлечение - катание на снегоходах.</p>
              {/* eslint-disable-next-line */}
              <a href="#" className="btn btn-primary btn-sm">
                Подробнее
              </a>
            </div>
          </div>

          <p></p>

          <div className="card card_press">
            {/* eslint-disable-next-line */}
            <img src={press4} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Полёт на параплане</h5>
              <p className="card-text">Мало острых ощущений? Посмотрите на Зелёную с высоты.</p>
              {/* eslint-disable-next-line */}
              <a href="#" className="btn btn-primary btn-sm">
                Подробнее
              </a>
            </div>
          </div>

          <div className="card card_press">
            {/* eslint-disable-next-line */}
            <img src={press5} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Полёт на вертолете</h5>
              <p className="card-text">Если высоты параплана недостаточно, можно полетать над курортом на вертолёте.</p>
              {/* eslint-disable-next-line */}
              <a href="#" className="btn btn-primary btn-sm">
                Подробнее
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
