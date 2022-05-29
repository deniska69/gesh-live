import React, { useEffect, useState } from "react";
import "./hotelSelect.css";
import Input from "../../utils/input/Input";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { allHotels } from "../../actions/hotels";
import { findBooking } from "../../actions/bookings";
import { setIsBookingTrue } from "../../reducers/bookingReducer";
import { setFreeBooking } from "../../reducers/bookingReducer";
import { setBokingOption } from "../../reducers/bookingReducer";

const HotelSelect = () => {
  const dispatch = useDispatch();
  const allHotelsList = useSelector((state) => state.hotel.listHotels); //Список всех отелей
  let allExBooking = useSelector((state) => state.booking.listExBooking); //Список всех существующих бронирований
  let allFindBooking = useSelector((state) => state.booking.listFindBooking); //Список всех существующих апартаментов

  //Переменные для хранения критерий поиска бронирования
  var id_hotel;
  const [currentIDHotel, setCurrentIDHotel] = useState(""); //ID выбранного отеля
  const [currentPerson1, setPerson1] = useState(""); //Кол-во взрослых
  const [currentPerson2, setPerson2] = useState(""); //Кол-во детей
  const [currentDate1, setDate1] = useState(""); //Дата заезда
  const [currentDate2, setDate2] = useState(""); //Дата выезда

  let date1;
  let date2;
  let dateDayCount;

  //Переменные для валидации полей
  var validP1;
  var validP2;
  var validD1;
  var validD2;
  const [isValidPerson1, setIsValidPerson1] = useState(true);
  const [isValidPerson2, setIsValidPerson2] = useState(true);
  const [isValidDate1, setIsValidDate1] = useState(true);
  const [isValidDate2, setIsValidDate2] = useState(true);

  //Переменная и функция для вызова "Toast" уведомления для вывода описания выбранного отеля
  let toastText;
  const notify = () => toast(toastText);

  //Вызов функции для получения списка названий всех отелей
  useEffect(() => {
    dispatch(allHotels());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Функция обработки выбора отеля
  function changeHandlerHotelList(b) {
    /* eslint eqeqeq: 0 */
    if (b.target.value != 0) {
      allHotelsList.reduce((res, note) => {
        if (note._id === b.target.value) {
          // eslint-disable-next-line
          return setCurrentIDHotel(note._id), (toastText = note.description);
        } else {
          return res;
        }
      }, {});

      notify();
    } else {
      setCurrentIDHotel("all");
    }
  }

  //Функция обработки выбора даты заезда
  function changeHandlerD1(e) {
    var now = new Date();

    if (currentDate2 == "") {
      if (new Date(e.target.value) > now) {
        setDate1(e.target.value);
        setIsValidDate1(true);
      } else {
        setIsValidDate1(false);
      }
    } else {
      if (new Date(e.target.value) > now && e.target.value < currentDate2) {
        setDate1(e.target.value);
        setIsValidDate1(true);
      } else {
        setIsValidDate1(false);
      }
    }
  }

  //Функция обработки выбора даты выезда
  function changeHandlerD2(e) {
    var now = new Date();

    if (currentDate1 == "") {
      if (new Date(e.target.value) > now) {
        setDate2(e.target.value);
        setIsValidDate2(true);
      } else {
        setIsValidDate2(false);
      }
    } else {
      if (new Date(e.target.value) > now && e.target.value > currentDate1) {
        setDate2(e.target.value);
        setIsValidDate2(true);
      } else {
        setIsValidDate2(false);
      }
    }
  }

  //Функция валидации полей
  function validateFields(hotel, p1, p2, d1, d2) {
    if (hotel == "") {
      id_hotel = "all";
    } else {
      id_hotel = currentIDHotel;
    }

    if (p1 == "") {
      validP1 = false;
      setIsValidPerson1(false);
    } else {
      validP1 = true;
      setIsValidPerson1(true);
    }

    if (p2 == "") {
      validP2 = false;
      setIsValidPerson2(false);
    } else {
      validP2 = true;
      setIsValidPerson2(true);
    }

    if (d1 == "") {
      validD1 = false;
      setIsValidDate1(false);
    } else {
      validD1 = true;
      setIsValidDate1(true);
    }

    if (d2 == "") {
      validD2 = false;
      setIsValidDate2(false);
    } else {
      validD2 = true;
      setIsValidDate2(true);
    }
  }

  //Функция подбора списка апартаментов
  function outputBooking(hotel, p1, p2, d1, d2) {
    //Проверяем, все ли поля заполненны
    validateFields(hotel, p1, p2, d1, d2);

    //Если все поля заполненны
    if (validP1 && validP2 && validD1 && validD2) {
      //Вызываем функцию по загрузке из базы данных записей всех существующих бронирований и всех апартаментов
      dispatch(findBooking(id_hotel, p1, p2, d1, d2));

      for (let i = 0; i < allFindBooking.length; i++) {
        for (let j = 0; j < allExBooking.length; j++) {
          if (allFindBooking[i]._id == allExBooking[j].id_room) {
            i = allFindBooking.indexOf(allFindBooking[i]);

            if (i >= 0) {
              allFindBooking.splice(i, 1);
            }
          }
        }
      }

      date1 = new Date(currentDate1);
      date2 = new Date(currentDate2);
      dateDayCount = Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));

      let bookingOption = [date1, date2, dateDayCount];

      dispatch(setFreeBooking(allFindBooking));
      dispatch(setIsBookingTrue());
      dispatch(setBokingOption(bookingOption));
    }
  }

  return (
    <div className="row align-item-start">
      <div className="col-lg-12">
        {/* Список отелей */}
        <div className="row">
          <div className="col-sm-6">
            <label className="col-form-label">Отель:</label>
          </div>
          <div className="col-sm-6">
            <select className="form-select" aria-label="Default select example" onChange={(b) => changeHandlerHotelList(b)}>
              <option value={0}>Все отели</option>
              {allHotelsList.map((allHotels) => (
                <option key={allHotels._id.toString()} value={allHotels._id.toString()}>
                  {" "}
                  {allHotels.name.toString()}
                </option>
              ))}
            </select>
            <ToastContainer />
          </div>
        </div>
        <br />

        {/* Дата зазеда */}
        <div className="row">
          <div className="col-sm-6">
            <label className="col-form-label">Дата заезда:</label>
          </div>
          <div className="col-sm-6">
            <input onChange={(e) => changeHandlerD1(e)} type="date" id="date" name="date" placeholder="Дата" required className={isValidDate1 ? "form-control" : "form-control invalid"} />
          </div>
        </div>
        <br />

        {/* Дата выезда */}
        <div className="row">
          <div className="col-sm-6">
            <label className="col-form-label">Дата выезда:</label>
          </div>
          <div className="col-sm-6">
            <input onChange={(e) => changeHandlerD2(e)} type="date" id="date" name="date" placeholder="Дата" required className={isValidDate2 ? "form-control" : "form-control invalid"} />
          </div>
        </div>
        <br />

        {/* Кол-во взрослых */}
        <div className="row">
          <div className="col-sm-6">
            <label className="col-form-label">Кол-во взрослых:</label>
          </div>
          <div className="col-sm-6">
            <Input value={currentPerson1} setValue={setPerson1} type="text" className={isValidPerson1 ? "form-control" : "form-control invalid"} />
          </div>
        </div>
        <br />

        {/* Кол-во детей */}
        <div className="row">
          <div className="col-sm-6">
            <label className="col-form-label">Кол-во детей:</label>
          </div>
          <div className="col-sm-6">
            <Input value={currentPerson2} setValue={setPerson2} type="text" className={isValidPerson2 ? "form-control" : "form-control invalid"} />
          </div>
        </div>
        <br />

        {/* Кнопка: подобрать номер */}
        <div className="row">
          <div className="col-sm-6 d-grid gap-2"></div>
          <div className="col-sm-6 d-grid gap-2">
            <button className="btn btn-primary" type="button" id="button_auth" onClick={() => outputBooking(currentIDHotel, currentPerson1, currentPerson2, currentDate1, currentDate2)}>
              Подобрать апартаменты
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelSelect;
