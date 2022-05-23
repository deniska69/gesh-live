import React from "react";
import "./mountain.css";
import imgMountain from "../../assets/img/mountain/mountain.jpg";

const Mountain = () => {
  return (
    <div className="card" id="card_mountain">
      <div className="card-body">
        <div className="row">
          <h3>Карта горы</h3>
          <br />
          <br />
          {/* eslint-disable-next-line */}
          <img src={imgMountain} className="card-img-top"></img>
        </div>
      </div>
    </div>
  );
};

export default Mountain;
