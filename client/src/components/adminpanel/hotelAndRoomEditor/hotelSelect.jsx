import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { allHotels } from "../../../actions/hotels";
import HotelEditor from "./hotelEditor";

const HotelSelect = () => {
  const dispatch = useDispatch();

  const allHotelsList = useSelector((state) => state.hotel.hotelsAll); //Получаем из редюсера список всех отелей
  const [isSelectHotel, setIsSelectHotel] = useState(false); //Выбран ли какой-либо отель из списка
  const [selectHotel, setSelectHotel] = useState(""); //Выбранный отель

  //Функция загрузки списка всех отелей
  useEffect(() => {
    dispatch(allHotels()); //Вызов функции загрузки списка всех отелей с занесением их в редюсер
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Функция обработки выбора отеля из выпадающего списка
  function selectHotelFromTheList(e) {
    setIsSelectHotel(false); //Предварительно сбрасываем выбор отеля из списка

    if (e.target.value !== "0") {
      setIsSelectHotel(true); //Подтверждаем выбор отеля из списка
      setSelectHotel(allHotelsList.filter((n) => n._id === e.target.value)[0]); //Записываем в переменную данные выбранного отеля
    } else {
      setIsSelectHotel(false); //Сбрасываем выбор отеля из списка
    }
  }

  return (
    <div className="row align-item-start">
      <div className="col-lg-2">
        <select className="form-select form-select-sm selectHotels" aria-label="Default select example" onChange={(e) => selectHotelFromTheList(e)}>
          <option value={0}>Выберите отель...</option>
          {allHotelsList.map((hotel) => (
            <option key={hotel._id.toString()} value={hotel._id.toString()}>
              {" "}
              {hotel.name.toString()}
            </option>
          ))}
        </select>
        {isSelectHotel && (
          <div className="d-grid gap-2">
            <button className="btn btn-primary btn-sm" type="button" onClick={() => console.log(selectHotel)}>
              console.log(selectHotel)
            </button>
          </div>
        )}
      </div>
      {isSelectHotel && <HotelEditor value={selectHotel} setValue={setSelectHotel} />}
    </div>
  );
};

export default HotelSelect;
