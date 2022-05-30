import React, { useEffect } from "react";
import "./hotel.css";
import { useDispatch, useSelector } from "react-redux";
import { oneHotel } from "../../actions/hotels";
import { Check2Circle } from "react-bootstrap-icons";

const Hotel = (props) => {
  const dispatch = useDispatch();
  const urlHotel = props.match.params.urlHotel;
  const hotel = useSelector((state) => state.hotel.hotelOne);

  //Вызов функции для получения данных одного отеля
  useEffect(() => {
    dispatch(oneHotel("", urlHotel));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="card" id="card_hotel">
      <div className="card-body">
        <div className="row bottom_line">
          <h3>{hotel.name}</h3>
        </div>
        <div className="row">
          <div className="col-8">
            <div dangerouslySetInnerHTML={{ __html: hotel.description }} />
          </div>
          <div className="col-4">
            {hotel.benefits && hotel.benefits.length > 0 ? <h4>Преимущества</h4> : <div></div>}
            <p></p>
            {hotel.benefits ? (
              hotel.benefits.map((benefits, index) => (
                <div className="row" id={"roweBenefits" + index} key={index}>
                  <div className="col-2">
                    <Check2Circle color="#0daff2" size={45} />
                  </div>
                  <div className="col-10">
                    <div className="row hotelBenefitsTitile">{benefits.title}</div>
                    <div className="row">{benefits.description}</div>
                  </div>
                </div>
              ))
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotel;
