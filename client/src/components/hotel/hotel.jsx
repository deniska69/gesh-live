import React, { useEffect } from "react";
import "./hotel.css";
import { useDispatch, useSelector } from "react-redux";
import { oneHotel } from "../../actions/hotels";

const Hotel = (props) => {
  const dispatch = useDispatch();
  const urlHotel = props.match.params.urlHotel;

  //Вызов функции для получения данных одного отеля
  useEffect(() => {
    dispatch(oneHotel(urlHotel));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hotel = useSelector((state) => state.hotel.oneHotel);

  return (
    <div className="card" id="card_cabinet">
      <div className="card-body">
        <div className="row">
          <h3>{hotel.name}</h3>
          <br />
          <div dangerouslySetInnerHTML={{ __html: hotel.description }} />
        </div>
      </div>
    </div>
  );
};

export default Hotel;
