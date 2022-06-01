import React, { useEffect } from 'react';
import './hotel.css';
import { useDispatch, useSelector } from 'react-redux';
import { oneHotel } from '../../actions/hotels';
import { Check2Circle } from 'react-bootstrap-icons';
import { API_URL } from '../../config';

const Hotel = props => {
  const dispatch = useDispatch();
  const urlHotel = props.match.params.urlHotel;
  const hotel = useSelector(state => state.hotel.hotelOne);

  //Вызов функции для получения данных одного отеля
  useEffect(() => {
    dispatch(oneHotel('', urlHotel));
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
            <div id="carouselExampleControlsNoTouching" className="carousel slide" data-bs-touch="false" data-bs-interval="false">
              <div className="carousel-inner">
                {hotel.gallery ? (
                  hotel.gallery.map((item, index) => {
                    if (index === 0) {
                      return (
                        <div className="carousel-item active" key={index}>
                          <img className="d-block w-100" src={`${API_URL + '\\hotels\\' + hotel._id + '\\gallery\\' + item.image}`} alt={item.image} />
                        </div>
                      );
                    } else {
                      return (
                        <div className="carousel-item" key={index}>
                          <img className="d-block w-100" src={`${API_URL + '\\hotels\\' + hotel._id + '\\gallery\\' + item.image}`} alt={item.image} />
                        </div>
                      );
                    }
                  })
                ) : (
                  <div></div>
                )}
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Предыдущий</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControlsNoTouching" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Следующий</span>
              </button>
            </div>
            <br />
            <div dangerouslySetInnerHTML={{ __html: hotel.description }} />
          </div>
          <div className="col-4">
            {hotel.benefits && hotel.benefits.length > 0 ? <h4>Преимущества</h4> : <div></div>}
            <p></p>
            {hotel.benefits ? (
              hotel.benefits.map((benefits, index) => (
                <div className="row" id={'roweBenefits' + index} key={index}>
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
