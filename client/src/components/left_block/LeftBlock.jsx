import React from "react";
import "./left_block.css";
import logo from "./logo.svg";
import weather from "./weather.svg";
import elevator from "./elevator.svg";
import mountain from "./mountain.svg";
import food from "./food.svg";

const LeftBlock = () => {
  return (
    <div className="col leftBlock">
      <div className="row justify-content-center">
        <a className="a_menu" href="/">
          {/* eslint-disable-next-line */}
          <img src={logo} id="icons_menu" />
        </a>
        <br />
        <br />
        <br />

        <a className="a_menu" href="/weather">
          {/* eslint-disable-next-line */}
          <img src={weather} id="icons_menu" />
        </a>
        <a className="a_menu" href="/weather">
          Погода
        </a>

        <a className="a_menu" href="/elevator">
          {/* eslint-disable-next-line */}
          <img src={elevator} id="icons_menu" />
        </a>
        <a className="a_menu" href="/elevator">
          <p id="text_menu">Подъёмники</p>
        </a>

        <a className="a_menu" href="/mountain">
          {/* eslint-disable-next-line */}
          <img src={mountain} id="icons_menu" />
        </a>
        <a className="a_menu" href="/mountain">
          <p id="text_menu">Карта горы</p>
        </a>

        <a className="a_menu" href="/food">
          {/* eslint-disable-next-line */}
          <img src={food} id="icons_menu" />
        </a>
        <a className="a_menu" href="/food">
          <p id="text_menu">Источники питания</p>
        </a>
      </div>
    </div>
  );
};

export default LeftBlock;
