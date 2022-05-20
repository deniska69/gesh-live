import React from "react";
import "./booking.css";
import HotelSelect from "./hotelSelect";
import { useSelector } from "react-redux";
import FindRoom from "./findRoom";
// eslint-disable-next-line
import { WWW_URL } from "../../config";

const Booking = () => {
  //Получаем из редюсера состояние: авторизован ли пользователь
  // eslint-disable-next-line
  const isAuth = useSelector((state) => state.user.isAuth);

  //Если пользователь не авторизован, то редиректим его на главную страницу
  //if (!isAuth) window.location.href = `${WWW_URL}`;

  const isBooking = useSelector((state) => state.booking.isBooking);

  return (
    <div className="card" id="card_cabinet">
      <div className="card-body">
        <div className="row align-item-start">
          <div className="col-lg-4">
            <h5>Выберите даты и условия поездки:</h5>
            <p />
            <HotelSelect />
          </div>
          <div className="col-lg-7 offset-lg-1">{isBooking && <FindRoom />}</div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
