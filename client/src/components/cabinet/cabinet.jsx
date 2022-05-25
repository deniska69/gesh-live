import React, { useEffect, useState } from "react";
import "./cabinet.css";
import { useSelector } from "react-redux";
import Input from "../../utils/input/Input";
import { updateProfile } from "../../actions/users";
import { useDispatch } from "react-redux";
import { uploadAvatar } from "../../actions/users";
import avatarDefault from "../../assets/img/avatar.png";
import { API_URL } from "../../config";
// eslint-disable-next-line
import { allBookings } from "../../actions/bookings";
// eslint-disable-next-line
import StatusBooking from "./statusBooking";
import { toastView } from "../App";

const Cabinet = () => {
  const dispatch = useDispatch();

  //Переменные для хранения данных о пользователе
  const currentUser = useSelector((state) => state.user.currentUser);
  const avatar = currentUser.avatar ? `${API_URL + "\\avatars\\" + currentUser.avatar}` : avatarDefault;
  const userID = currentUser.id; //ID пользователя
  const userID_Acc = currentUser.id_acc; //Уровень доступа пользователя
  const [nameUserNew, setNameUserNew] = useState(currentUser.name); //Новое имя пользователя
  const [emailUserNew, setEmailUserNew] = useState(currentUser.email); //Новый Email пользователя
  const [passwordUserNew, serPasswordUserNew] = useState(""); //Новый пароль пользователя

  useEffect(() => {
    //Записываем данные о пользователе
    dispatch(allBookings(userID)); //Вызов функции для получения истории брионирования
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  //Переменная для хранения истории бронирования
  const historyBooking = useSelector((state) => state.booking.history);

  //Обработка нажатия кнопки "Выбрать изображение" >> ручная инициализация элемента <Input> через вызов метода click()
  function selectAvatarShow() {
    //Получаем доступ к Input-элементу
    const fileInput = document.getElementById("btnSelectAvatarHide");

    //Вручную инициализируем нажатие по элементу
    fileInput.click();
  }

  //Функция загрузки аватара
  function selectAvatarHide(e) {
    const file = e.target.files[0];
    dispatch(uploadAvatar(file));
    e.target.value = "";
  }

  //Функция обновления профиля, принимает параметры: идентификатор пользователя, эл.потча, пароль, ф.и.о
  function updateProfileNow() {
    if (nameUserNew === currentUser.name && emailUserNew === currentUser.email && passwordUserNew === "") {
      return toastView("warning", "Никакие данные не были изменены.");
    } else {
      dispatch(updateProfile(userID, emailUserNew, passwordUserNew, nameUserNew, userID_Acc));
    }
  }

  return (
    <div className="card" id="card_cabinet">
      <div className="card-body">
        <div className="row">
          {/* Профиль пользователя */}
          <div className="col-lg-6">
            <div className="row align-item-start">
              <div className="col">
                <h5 className="bottom_line">Профиль</h5>
                <div className="row">
                  <div className="col-sm-4">
                    <label className="form-label form-control-sm">Имя:</label>
                  </div>
                  <div className="col-sm-8">
                    <Input className="form-control form-control-sm" value={nameUserNew} setValue={setNameUserNew} type="text" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4">
                    <label className="form-label form-control-sm">Email:</label>
                  </div>
                  <div className="col-sm-8">
                    <Input className="form-control form-control-sm" value={emailUserNew} setValue={setEmailUserNew} type="text" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4">
                    <label className="form-label form-control-sm">Пароль:</label>
                  </div>
                  <div className="col-sm-8" autoComplete="off">
                    <form action="">
                      <Input className="form-control form-control-sm" value={passwordUserNew} setValue={serPasswordUserNew} type="password" placeholder="Введите новый пароль" />
                    </form>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-8 offset-sm-4">
                    <input id="btnSelectAvatarHide" accept="image/*" onChange={(e) => selectAvatarHide(e)} type="file" />
                    <button type="button" className="btn btn-primary btn-sm" id="btnSelectAvatarShow" onClick={() => selectAvatarShow()}>
                      Изменить аватар
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-8 offset-sm-4">
                    <button type="button" className="btn btn-success btn-sm" id="btnSaveProfileLK" onClick={() => updateProfileNow()}>
                      Сохранить профиль
                    </button>
                  </div>
                </div>
              </div>

              <div className="col">
                <h5 className="bottom_line">Аватар</h5>
                <p />
                <div className="crop">
                  {/* eslint-disable-next-line */}
                  <img className="rounded" src={avatar} id="avatar_cabinet" alt={userID} onError={(e) => ((e.target.onerror = null), (e.target.src = avatarDefault))} />
                </div>
              </div>
            </div>
          </div>

          {/* История бронирования */}
          <div className="col-lg-6 left_line">
            <div className="row align-item-start">
              <div className="col">
                <h5 className="bottom_line">История бронирования</h5>
                <p />

                {historyBooking.map(({ _id, person1, person2, date1, date2, price, date_add, hotel, room, status }) => (
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
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cabinet;
