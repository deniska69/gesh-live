import React from "react";
import "./food.css";

import food1 from "../../assets/img/food/food1.png";
import food2 from "../../assets/img/food/food2.png";
import food3 from "../../assets/img/food/food6.png";
import food4 from "../../assets/img/food/food4.png";
import food5 from "../../assets/img/food/food5.png";
import food6 from "../../assets/img/food/food6.png";
import food7 from "../../assets/img/food/food7.png";
import food8 from "../../assets/img/food/food8.png";
import food9 from "../../assets/img/food/food9.png";
import food10 from "../../assets/img/food/food10.png";

const Food = () => {
  return (
    <div className="card" id="card_food">
      <div className="card-body">
        <div className="row">
          <h3>Источники питания</h3>
          <b />
          <br />

          <div className="row">
            <div className="col-3">
              <div className="list-group" id="list-tab" role="tablist">
                <a className="list-group-item list-group-item-action active" id="list-food1-list" data-bs-toggle="list" href="#list-food1" role="tab" aria-controls="food1">
                  Бар «Apres Ski Bar Grelka»
                </a>
                <a className="list-group-item list-group-item-action" id="list-food2-list" data-bs-toggle="list" href="#list-food2" role="tab" aria-controls="food2">
                  Ресторан «Снежный»
                </a>
                <a className="list-group-item list-group-item-action" id="list-food3-list" data-bs-toggle="list" href="#list-food3" role="tab" aria-controls="food3">
                  Рукс в Геше
                </a>
                <a className="list-group-item list-group-item-action" id="list-food4-list" data-bs-toggle="list" href="#list-food4" role="tab" aria-controls="food4">
                  «Beer Gesh»
                </a>
                <a className="list-group-item list-group-item-action" id="list-food5-list" data-bs-toggle="list" href="#list-food5" role="tab" aria-controls="food5">
                  Кафе «Финиш»
                </a>
                <a className="list-group-item list-group-item-action" id="list-food6-list" data-bs-toggle="list" href="#list-food6" role="tab" aria-controls="food6">
                  Солянка «Soul Kitchen»
                </a>
                <a className="list-group-item list-group-item-action" id="list-food7-list" data-bs-toggle="list" href="#list-food7" role="tab" aria-controls="food7">
                  «Alpen Club»
                </a>
                <a className="list-group-item list-group-item-action" id="list-food8-list" data-bs-toggle="list" href="#list-food8" role="tab" aria-controls="food8">
                  «The Days»
                </a>
                <a className="list-group-item list-group-item-action" id="list-food9-list" data-bs-toggle="list" href="#list-food9" role="tab" aria-controls="food9">
                  Три совы
                </a>
                <a className="list-group-item list-group-item-action" id="list-food10-list" data-bs-toggle="list" href="#list-food10" role="tab" aria-controls="food10">
                  «Экспонат» Бар
                </a>
              </div>
            </div>

            <div className="col-9">
              <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="list-food1" role="tabpanel" aria-labelledby="list-food1-list">
                  {/* eslint-disable-next-line */}
                  <img src={food1} className="card-img-top" alt="..." />
                </div>

                <div className="tab-pane fade" id="list-food2" role="tabpanel" aria-labelledby="list-food2-list">
                  {/* eslint-disable-next-line */}
                  <img src={food2} className="card-img-top" alt="..." />
                </div>

                <div className="tab-pane fade" id="list-food3" role="tabpanel" aria-labelledby="list-food3-list">
                  {/* eslint-disable-next-line */}
                  <img src={food3} className="card-img-top" alt="..." />
                </div>

                <div className="tab-pane fade" id="list-food4" role="tabpanel" aria-labelledby="list-food4-list">
                  {/* eslint-disable-next-line */}
                  <img src={food4} className="card-img-top" alt="..." />
                </div>

                <div className="tab-pane fade" id="list-food5" role="tabpanel" aria-labelledby="list-food5-list">
                  {/* eslint-disable-next-line */}
                  <img src={food5} className="card-img-top" alt="..." />
                </div>

                <div className="tab-pane fade" id="list-food6" role="tabpanel" aria-labelledby="list-food6-list">
                  {/* eslint-disable-next-line */}
                  <img src={food6} className="card-img-top" alt="..." />
                </div>

                <div className="tab-pane fade" id="list-food7" role="tabpanel" aria-labelledby="list-food7-list">
                  {/* eslint-disable-next-line */}
                  <img src={food7} className="card-img-top" alt="..." />
                </div>

                <div className="tab-pane fade" id="list-food8" role="tabpanel" aria-labelledby="list-food8-list">
                  {/* eslint-disable-next-line */}
                  <img src={food8} className="card-img-top" alt="..." />
                </div>

                <div className="tab-pane fade" id="list-food9" role="tabpanel" aria-labelledby="list-food9-list">
                  {/* eslint-disable-next-line */}
                  <img src={food9} className="card-img-top" alt="..." />
                </div>
                <div className="tab-pane fade" id="list-food10" role="tabpanel" aria-labelledby="list-food10-list">
                  {/* eslint-disable-next-line */}
                  <img src={food10} className="card-img-top" alt="..." />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Food;
