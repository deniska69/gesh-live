import React from "react";
import "./gallery.css";
import photo1 from "../../assets/img/gallery/photo1.jpg";
import photo2 from "../../assets/img/gallery/photo2.jpg";
import photo3 from "../../assets/img/gallery/photo3.jpg";
import photo4 from "../../assets/img/gallery/photo4.jpg";
import photo5 from "../../assets/img/gallery/photo5.jpg";
import photo6 from "../../assets/img/gallery/photo6.jpg";
import photo7 from "../../assets/img/gallery/photo7.jpg";
import photo8 from "../../assets/img/gallery/photo8.jpg";
import photo9 from "../../assets/img/gallery/photo9.jpg";

const Weather = () => {
  return (
    <div className="card" id="card_gallery">
      <div className="card-body">
        <div className="row">
          <h3>Фотогаллеря</h3>
          <br />
          <br />

          <div id="carouselExampleControls" className="carousel slide img-thumbnail gallery" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                {/* eslint-disable-next-line */}
                <img src={photo1} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                {/* eslint-disable-next-line */}
                <img src={photo2} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                {/* eslint-disable-next-line */}
                <img src={photo3} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                {/* eslint-disable-next-line */}
                <img src={photo4} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                {/* eslint-disable-next-line */}
                <img src={photo5} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                {/* eslint-disable-next-line */}
                <img src={photo6} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                {/* eslint-disable-next-line */}
                <img src={photo7} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                {/* eslint-disable-next-line */}
                <img src={photo8} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                {/* eslint-disable-next-line */}
                <img src={photo9} className="d-block w-100" alt="..." />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Предыдущий</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Следующий</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
