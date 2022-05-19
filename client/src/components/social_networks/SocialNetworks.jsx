import React from "react";
import "./social_networks.css";
import social_networks1 from "./vk.svg";
import social_networks2 from "./instagram.svg";
import { toastView } from "../App";

const SocialNetworks = () => {
  function alertSocial() {
    toastView("success", "Здесь могла быть ваша соц.сеть!");
  }

  return (
    <div className="Social_networks">
      {/* eslint-disable-next-line */}
      <a className="social_networks1" href="#" onClick={() => alertSocial()}>
        {/* eslint-disable-next-line */}
        <img src={social_networks1} id="icons"></img>
      </a>
      {/* eslint-disable-next-line */}
      <a className="social_networks2" href="#" onClick={() => alertSocial()}>
        {/* eslint-disable-next-line */}
        <img src={social_networks2} id="icons"></img>
      </a>
    </div>
  );
};

export default SocialNetworks;
