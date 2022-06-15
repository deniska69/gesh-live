import React from 'react';
import { Link } from 'react-router-dom';

import './left_block.css';

import logo from './logo.svg';
import weather from './weather.svg';
import elevator from './elevator.svg';
import mountain from './mountain.svg';
import food from './food.svg';

const LeftBlock = () => {
  return (
    <div className="col leftBlock">
      <div className="row justify-content-center">
        <Link to="/" className="a_menu">
          <img src={logo} id="icons_menu" alt="Шерегеш LIVE" />
        </Link>

        <br />
        <br />
        <br />

        <Link className="a_menu" to="/weather">
          <img src={weather} id="icons_menu" alt="Шерегеш LIVE Погода" />
        </Link>
        <Link className="a_menu" to="/weather">
          Погода
        </Link>

        <Link className="a_menu" to="/elevator">
          <img src={elevator} id="icons_menu" alt="Шерегеш LIVE Подъёмники" />
        </Link>
        <Link className="a_menu" to="/elevator">
          Подъёмники
        </Link>

        <Link className="a_menu" to="/mountain">
          <img src={mountain} id="icons_menu" alt="Шерегеш LIVE Карта горы" />
        </Link>
        <Link className="a_menu" to="/mountain">
          Карта горы
        </Link>

        <Link className="a_menu" to="/food">
          <img src={food} id="icons_menu" alt="Шерегеш LIVE Источники питания" />
        </Link>
        <Link className="a_menu" to="/food">
          Источники питания
        </Link>
      </div>
    </div>
  );
};

export default LeftBlock;
