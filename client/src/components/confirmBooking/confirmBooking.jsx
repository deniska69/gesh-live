import React, { useEffect } from "react";
import "./confirmBooking.css";
import { useDispatch, useSelector } from "react-redux";
import { oneBooking } from "../../actions/bookings";
import { updateBooking } from "../../actions/bookings";
import { oneRoom } from "../../actions/rooms";

const ConfirmBooking = (props) => {
  const dispatch = useDispatch();
  const id_booking = props.match.params.idBooking;
  const id_room = props.match.params.idRoom;

  //Вызов функции для получения одной записи претензии из базы данных
  useEffect(() => {
    dispatch(oneBooking(id_booking));
    dispatch(oneRoom(id_room));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const booking = useSelector((state) => state.booking.oneBooking);
  const room = useSelector((state) => state.room.currentRoom);

  let date1 = new Date(booking.date1);
  let date2 = new Date(booking.date2);
  let dateDayCount = Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));

  console.log(booking);

  function Confirm() {
    updateBooking(id_booking, 2);
  }

  function Deny() {
    updateBooking(id_booking, 1);
  }

  return (
    <div className="card" id="card_cabinet">
      <div className="card-body">
        <div className="row">
          <h5>Пожалуйста, подтвердите бронирование в вашем отеле:</h5>
          <br />
          <br />
          <p>Апартаменты: {room.name}</p>
          <p>
            C: {new Date(booking.date1).toLocaleDateString()} По: {new Date(booking.date2).toLocaleDateString()}
          </p>
          <p>Взрослые: {booking.person1}</p>
          <p>Дети: {booking.person2}</p>
          <p>
            Цена: {booking.price} (руб.) за {dateDayCount} суток проживания
          </p>

          <div className="row">
            <div className="col-sm-2">
              <div className="col">
                <button type="button" className="btn btn-success" onClick={() => Confirm()}>
                  Подтвердить
                </button>
              </div>
            </div>
            <div className="col-sm-2">
              <div className="col">
                <button type="button" className="btn btn-danger" onClick={() => Deny()}>
                  Отказать
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBooking;
