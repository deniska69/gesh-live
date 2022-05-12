import React, { useEffect } from "react";
import "./events.css";
import { useDispatch, useSelector } from "react-redux";
import { allEvents } from "../../actions/events";
import attachmentDefault from "../../assets/img/attachment.png";
import { API_URL } from "../../config";

const Events = () => {
  const dispatch = useDispatch();

  //Вызов функции для получения всех записей претензий из базы данных
  useEffect(() => {
    dispatch(allEvents());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listEvents = useSelector((state) => state.events.listEvents); //Заносим в переменную все записи претензий из редюсера

  return (
    <div className="card" id="card_cabinet">
      <div className="card-body">
        <div className="row">
          <h3>События Шерегеша</h3>
          <br />
          <br />

          <div className="card-group">
            {listEvents.map(({ _id, text1, text2, text3, cover }) => (
              <div key={_id.toString()} className="card">
                <img src={cover ? `${API_URL + "\\events\\" + cover}` : attachmentDefault} alt={_id.toString()} id="attachment_img_events" />

                <div className="card-body">
                  <h5 className="card-title">{text1}</h5>
                  <p className="card-text">{text2}</p>
                  <p className="card-text">
                    <small className="text-muted">{text3}</small>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
