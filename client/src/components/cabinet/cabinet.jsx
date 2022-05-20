// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import "./cabinet.css";
import { useSelector } from "react-redux";
// eslint-disable-next-line
import Input from "../../utils/input/Input";
// eslint-disable-next-line
import { updateProfile } from "../../actions/users";
import { useDispatch } from "react-redux";
// eslint-disable-next-line
import { uploadAvatar } from "../../actions/users";
import avatarDefault from "../../assets/img/avatar.png";
// eslint-disable-next-line
import { API_URL, WWW_URL } from "../../config";
// eslint-disable-next-line
import { allBookings } from "../../actions/bookings";
// eslint-disable-next-line
import StatusBooking from "./statusBooking";
import { setOneUser } from "../../reducers/userReducer";

const Cabinet = () => {
  // eslint-disable-next-line
  const dispatch = useDispatch();

  //Получаем из редюсера состояние: авторизован ли пользователь
  //const isAuth = useSelector((state) => state.user.isAuth);

  //Если пользователь не авторизован, то редиректим его на главную страницу
  // if (!isAuth) {
  //   window.location.href = `${WWW_URL}`;
  // }

  //console.log("isAuth", isAuth);

  //Переменные для хранения данных о пользователе
  const currentUser = useSelector((state) => state.user.currentUser);
  // const currentName = currentUser.name;
  // const currentEmail = currentUser.email;
  // const currentID = currentUser.id;
  const avatar = currentUser.avatar ? `${API_URL + "\\avatars\\" + currentUser.avatar}` : avatarDefault;

  //State переменные для Input'ов
  const [nameNew, setNameNew] = useState(""); //Имя
  // eslint-disable-next-line
  const [emailNew, setEmailNew] = useState(""); //Email
  // eslint-disable-next-line
  const [passwordNew, setPasswordNew] = useState(""); //Пароль

  useEffect(() => {
    dispatch(setOneUser(currentUser.id));
    // console.log("currentUser.name", currentUser.name);
    // console.log("nameNew", nameNew);
    // console.log("emailNew", emailNew);
    // setNameNew(currentUser.name);
    // setEmailNew(currentUser.email);
    // console.log("currentUser.name", currentUser.name);
    // console.log("nameNew", nameNew);
    // console.log("emailNew", emailNew);
    //displayingUserInformation(currentUser); //Вызов функции вывода данных пользователя в Input'ы
    // eslint-disable-next-line
    //dispatch(allBookings(currentID)); //Вызов функции для получения истории брионирования
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  //Переменная для хранения истории бронирования
  //const historyBooking = useSelector((state) => state.booking.history);

  //Функция загрузки аватара
  // function changeHandler(e) {
  //   const file = e.target.files[0];
  //   dispatch(uploadAvatar(currentID, file));
  //   e.target.value = "";
  // }

  function displayingUserInformation() {
    console.log("currentUser.name", currentUser.name);
    console.log("nameNew", nameNew);
    console.log("emailNew", emailNew);
    // console.log("user", user);
    // console.log("user.name", user.name);
    // console.log("user.email", user.email);
    // console.log("avatarDefault", avatarDefault);
    // console.log("avatar", avatar);
    // console.log("-----------------------------------------------------------");
    // setNameNew(user.name);
    // setEmailNew(user.email);
    // console.log("nameNew", nameNew);
    // console.log("emailNew", emailNew);
  }

  // eslint-disable-next-line
  function _test() {
    // console.log("currentUser", currentUser);
    // console.log("currentName", currentName);
    // console.log("currentEmail", currentEmail);
    // console.log("currentID", currentID);
    // console.log("-----------------------------------------------------------");
    // console.log("emailNew", emailNew);
    // console.log("passwordNew", passwordNew);
    // console.log("nameNew", nameNew);
    // console.log("-----------------------------------------------------------");
    // console.log("currentUser", currentUser);
    // console.log("currentName", currentName);
    // console.log("currentEmail", currentEmail);
    // console.log("currentID", currentID);
    // console.log("currentUser.password", currentUser.password);
  }

  //console.log(currentUser);

  return (
    <div className="card" id="card_cabinet">
      <div className="card-body">
        <div className="row">
          {/* Профиль пользователя */}
          <div className="col-lg-6">
            <div className="row align-item-start">
              <div className="col">
                <h5>Профиль</h5>
                <p />
                <div className="mb-3">
                  <label className="form-label">Имя: {currentUser.name}</label>
                  {/* <Input className="form-control form-control-sm" value={nameNew} setValue={setNameNew} type="text" /> */}
                </div>
                <div className="mb-3">
                  <label className="form-label">Email: {currentUser.email} </label>
                </div>
                {/* <div className="mb-3">
                  <label className="form-label">Ф.И.О.:</label>
                  <Input className="form-control form-control-sm" value={nameNew} setValue={setNameNew} type="text" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email-адрес: </label>
                  <Input className="form-control form-control-sm" value={emailNew} setValue={setEmailNew} type="text" />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Пароль
                  </label>
                  <Input className="form-control form-control-sm" value={passwordNew} setValue={setPasswordNew} type="password" placeholder="********" />
                </div> */}
                <div className="mb-3">
                  {/* <button type="button" className="btn btn-primary btn-sm" onClick={() => updateProfile(currentUser.id, emailNew, passwordNew, nameNew)}>
                    Сохранить профиль
                  </button> */}
                  <button type="button" className="btn btn-primary btn-sm" onClick={() => displayingUserInformation()}>
                    console.log()
                  </button>
                </div>
              </div>

              <div className="col">
                <h5>Аватар</h5>
                <p />
                <div className="crop">
                  {/* eslint-disable-next-line */}
                  <img className="rounded" src={avatar} id="avatar" alt={currentUser.id} onError={(e) => ((e.target.onerror = null), (e.target.src = avatarDefault))} />
                </div>
                <div className="mb-3">
                  <p />
                  <label className="form-label">Загрузить/изменить аватар:</label>
                  {/* <input className="form-control form-control-sm" accept="image/*" onChange={(e) => changeHandler(e)} type="file" /> */}
                </div>
              </div>
            </div>
          </div>

          {/* История бронирования */}
          <div className="col-lg-6 left_line">
            <div className="row align-item-start">
              <div className="col">
                <h5>История бронирования</h5>
                <p />

                {/* {historyBooking.map(({ _id, person1, person2, date1, date2, price, date_add, hotel, room, status }) => (
                  <div key={_id} className="card card_otstup">
                    <div className="card-body card_padding">
                      {room.map((room) => (
                        <h5 key={room._id} className="card-title">
                          {room.name}
                        </h5>
                      ))}

                      {hotel.map((hotel) => (
                        <h6 key={hotel._id} className="card-subtitle mb-2 text-muted">
                          {hotel.name}
                        </h6>
                      ))}

                      <p className="card-text">
                        С: {new Date(date1).toLocaleDateString()} по: {new Date(date2).toLocaleDateString()}
                        <br></br>
                        Взрослые: {person1}
                        <br></br>
                        Дети: {person2}
                        <br></br>
                        Цена: {price} (руб.)
                      </p>

                      <h6 className="card-subtitle mb-2 text-muted">Дата бронирования: {new Date(date_add).toLocaleDateString()}</h6>

                      <StatusBooking status={status} />
                    </div>
                  </div>
                ))} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cabinet;
