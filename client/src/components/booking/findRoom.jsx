import React, { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import "./findRoom.css";
import { booking } from "../../actions/bookings";

const FindRoom = () => {
  //Получаем ID авторизованного пользователя
  const currentUser = useSelector((state) => state.user.currentUser);
  const idUser = currentUser.id;

  //Получаем из редюсера:
  const allFindBooking = useSelector((state) => state.booking.listFreeBooking); //Список названий всех отелей
  const bookingOptions = useSelector((state) => state.booking.options); //Количество дней проживания

  //Переменные для работы с модальным окном
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  // eslint-disable-next-line
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  // eslint-disable-next-line
  const handleShow2 = () => setShow2(true);

  //Переменные для передачи в модальное окно
  const [currentRoom, setCurrentRoom] = useState("");
  const [currentHotel, setCurrentHotel] = useState("");
  // eslint-disable-next-line
  let typePay; //Переменная для хранения типа оплаты

  //Переменные для хранения выбора отеля для отображения соответствующей кнопки
  const [isPayHotel, setIsPayHotel] = useState(false);
  const [isPayCard, setIsPayCard] = useState(false);

  //Фнукция вызова модального окна выбора оплаты
  function showModal(idRoom) {
    setIsPayHotel(false);
    setIsPayCard(false);

    // eslint-disable-next-line
    let room = allFindBooking.find((rooms) => rooms._id == idRoom);
    setCurrentRoom(room);
    let hotel = room.hotel;
    setCurrentHotel(hotel[0]);

    setShow(true);
  }

  //Фнукция вызова модального окна выбора оплаты
  function showModal2() {
    setShow(false);
    setShow2(true);
  }

  //Функция обработки выбора типа оплаты
  function changeTypePay(event) {
    typePay = event.target.value;

    // eslint-disable-next-line
    if (typePay == "hotel") {
      setIsPayHotel(true);
      setIsPayCard(false);
    }

    // eslint-disable-next-line
    if (typePay == "card") {
      setIsPayCard(true);
      setIsPayHotel(false);
    }
  }

  //Функция записи бронирования в базу данных
  function setBooking() {
    booking(idUser, currentHotel._id, currentRoom._id, currentRoom.person1, currentRoom.person2, bookingOptions[0], bookingOptions[1], currentRoom.price * bookingOptions[2], new Date(), currentHotel.name, currentRoom.name, currentUser.email);
  }

  return (
    <div className="row align-item-start">
      <div className="col-lg-12">
        <div className="row">
          <h5>Мы подобрали для вас следующие варианты:</h5>
          <p />
        </div>

        {/* Вывод списка подобранных апартаментов */}
        <div className="row">
          {allFindBooking.map(({ _id, name, person1, person2, price, hotel }) => (
            <div key={_id.toString()} className="col-sm-4 card_otstup">
              <div className="card">
                <div className="card-body cardRoom" onClick={() => showModal(_id)}>
                  <h5 className="card-title">{name.toString()}</h5>

                  {hotel.map((hotel) => (
                    <h6 key={hotel._id} className="card-subtitle mb-2 text-muted">
                      {hotel.name}
                    </h6>
                  ))}

                  <p className="card-text">
                    Взрослые: {person1}
                    <br></br>
                    Дети: {person2}
                    <br></br>
                    Цена (сутки): {price} (руб.)
                  </p>

                  <h6 className="card-text">
                    Цена ({bookingOptions[2]} дней): {price * bookingOptions[2]} (руб.)
                  </h6>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Модальное окно выбора вида оплаты*/}
        <Modal size="lg" show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Вы выбрали следующие условия проживания:</Modal.Title>
            <button type="button" className="btn-close" onClick={handleClose} />
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col">
                <h5 className="card-subtitle mb-2">{currentHotel.name}</h5>
                <p className="card-text">{currentHotel.description}</p>
              </div>

              <div className="col left_line">
                <h5 className="card-subtitle mb-2">{currentRoom.name}</h5>
                <p className="card-text">
                  Взрослые: {currentRoom.person1}
                  <br></br>
                  Дети: {currentRoom.person2}
                  <br></br>
                  Цена (сутки): {currentRoom.price} (руб.)
                </p>
                <h6 className="card-text">
                  Цена ({bookingOptions[2]} дней): {currentRoom.price * bookingOptions[2]} (руб.)
                </h6>

                <br />
                <h5 className="card-subtitle mb-2">Выберите способ оплаты:</h5>
                <div onChange={changeTypePay.bind(this)}>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="hotel" />
                    <label className="form-check-label">Оплатить в отеле</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="card" />
                    <label className="form-check-label">Оплатить картой на сайте</label>
                  </div>
                </div>

                <br />
                {isPayHotel && (
                  <button className="btn btn-success " type="button" id="button_auth" onClick={() => setBooking()}>
                    Забронировать
                  </button>
                )}
                {isPayCard && (
                  <button className="btn btn-primary" type="button" id="button_auth" onClick={() => showModal2()}>
                    Перейти к оплате
                  </button>
                )}
              </div>
            </div>
          </Modal.Body>
        </Modal>

        {/* Модальное окно выбора вида оплаты*/}
        <Modal size="lg" show={show2} onHide={handleClose2}>
          <Modal.Header>
            <Modal.Title>Оплата бронирования</Modal.Title>
            <button type="button" className="btn-close" onClick={handleClose2} />
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-lg-7">
                <div className="card">
                  <div className="card-body">
                    <label className="form-label">Номер карты:</label>
                    <input className="form-control" type="text" placeholder="0000 0000 0000 0000" />
                    <br />

                    <div className="row g-3">
                      <div className="col-md-3 col-sm-3 col-xs-3">
                        <label className="form-label">Месяц:</label>
                        <input className="form-control" type="text" placeholder="ММ" />
                      </div>
                      <div className="col-md-3 col-sm-3 col-xs-3">
                        <label className="form-label">Год:</label>
                        <input className="form-control" type="text" placeholder="ГГГГ" />
                      </div>
                      <div className="col-md-3 col-sm-3 col-xs-3">
                        <label className="form-label">CCV:</label>
                        <input className="form-control" type="text" placeholder="CCV" />
                      </div>
                    </div>
                    <br />

                    <label className="form-label">ИМЯ ФАМИЛИЯ:</label>
                    <input className="form-control" type="text" placeholder="ИМЯ ФАМИЛИЯ" />
                  </div>
                </div>
              </div>

              <div className="col-lg-5 left_line">
                <h5 className="card-subtitle mb-2">{currentRoom.name}</h5>
                <h5 className="card-subtitle mb-2 text-muted">{currentHotel.name}</h5>
                <p className="card-text">
                  Взрослые: {currentRoom.person1}
                  <br></br>
                  Дети: {currentRoom.person2}
                  <br></br>
                  Цена (сутки): {currentRoom.price} (руб.)
                </p>
                <h6 className="card-text">
                  Цена ({bookingOptions[2]} дней): {currentRoom.price * bookingOptions[2]} (руб.)
                </h6>

                <br />

                <button className="btn btn-success " type="button" id="button_auth" onClick={() => setBooking()}>
                  Оплатить
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default FindRoom;
