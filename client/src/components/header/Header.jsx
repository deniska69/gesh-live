import React from "react";
import "./header.css";
import key from "./key.svg";
import pencil from "./pencil.svg";
import Registration from "../registration/registration";
import Authorization from "../login/login";
import { useDispatch, useSelector } from "react-redux";
import { setUserCurrentAuthIsLogout } from "../../reducers/userReducer";
import avatarDefault from "../../assets/img/avatar.png";
import { API_URL } from "../../config";
import Feedback from "./feedback";

const Header = () => {
  const isAuth = useSelector((state) => state.user.isAuth);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);
  const name = currentUser.name;
  let avatar = currentUser.avatar ? `${API_URL + "\\avatars\\" + currentUser.avatar}` : avatarDefault;

  return (
    <div className="container-fluid" id="header">
      <div className="row">
        {/* Модальное окно: выбор языка */}
        <div className="col-lg-1" id="nawbar_items">
          {/* eslint-disable-next-line */}
          <a href="#" data-bs-toggle="modal" data-bs-target="#languageModal" id="nawbar_items_a">
            Ru
          </a>
          <div className="modal fade" id="languageModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Выберите язык / Choose language
                  </h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                      English
                    </label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                      Русский язык
                    </label>
                  </div>
                  <br />
                  <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
                    Выбрать / Choose
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Модальное окно: вход в личный кабинет */}
        <div className="col-lg-2" id="nawbar_items">
          {/* eslint-disable-next-line */}
          {isAuth && (
            /* eslint-disable-next-line */
            <a href="#" id="nawbar_items_a" data-bs-toggle="dropdown" aria-expanded="false">
              {/* eslint-disable-next-line */}
              <img className="rounded" src={avatar} id="nawbar_items_icons" alt="nawbar_items_icons" onError={(e) => ((e.target.onerror = null), (e.target.src = avatarDefault))} />
              {name}
            </a>
          )}
          {isAuth && (
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li>
                <a className="dropdown-item" href="/cabinet">
                  Личный кабинет
                </a>
              </li>
              {isAdmin && (
                <li>
                  <a className="dropdown-item" href="/adminpanel">
                    Панель администратора
                  </a>
                </li>
              )}
              <li>
                <a className="dropdown-item" href="/booking">
                  Бронирование
                </a>
              </li>
              {/* eslint-disable-next-line */}
              <li>
                {/* eslint-disable-next-line */}
                <a className="dropdown-item" href="" onClick={() => dispatch(setUserCurrentAuthIsLogout())}>
                  Выход
                </a>
              </li>
            </ul>
          )}

          {/* eslint-disable-next-line */}
          {!isAuth && <img src={key} id="nawbar_items_icons" />}
          {/* eslint-disable-next-line */}
          {!isAuth && (
            <a href="/cabinet" data-bs-toggle="modal" data-bs-target="#enterCabinetModal" id="nawbar_items_a">
              Личный кабинет
            </a>
          )}
          {!isAuth && <Authorization />}
        </div>

        {/* Модальное окно: регистрация пользователя */}
        {!isAuth && <Registration />}

        {/* Модальное окно: форма обратной свзяи */}
        <div className="col-lg-3 offset-lg-6" id="nawbar_items">
          {/* eslint-disable-next-line */}
          <img src={pencil} id="nawbar_items_icons" />
          {/* eslint-disable-next-line */}
          <a href="#" data-bs-toggle="modal" data-bs-target="#feedbackModal" id="nawbar_items_a">
            Оставьте отзыв
          </a>

          <Feedback />
        </div>
      </div>
    </div>
  );
};

export default Header;
