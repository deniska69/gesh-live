import React, { useCallback, useState, useEffect } from "react";
import Input from "../../utils/input/Input";
import { useDispatch } from "react-redux";
import { login } from "../../actions/users";
import { toastView } from "../App";

const Authorization = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  //Функция обработки нажатия кнопки "Enter" в поле ввода никнейма
  const handleKeyPress = useCallback(
    (e) => {
      //Если нажата клавиша Enter
      if (e.code === "Enter") {
        //Вызываем функцию обработки нажатия кнопки "Войти"
        loginInToTheSite();
      }
    },
    [loginInToTheSite]
  );

  //Хук выполняющийся после отрисовки страницы
  useEffect(() => {
    //Получаем доступ к элементам на странице для ввода эл.почты и пароля
    const inputLoginEmail = document.querySelector(".inputLoginEmail");
    const inputLoginPassword = document.querySelector(".inputLoginPassword");

    //Вешаем на поля для ввода эл.почты и пароля обработчик нажатия кнопки
    inputLoginEmail.addEventListener("keydown", handleKeyPress);
    inputLoginPassword.addEventListener("keydown", handleKeyPress);

    //Удаляем с полей для ввода эл.почты и пароля обработчик нажатия кнопки
    return () => {
      inputLoginEmail.removeEventListener("keydown", handleKeyPress);
      inputLoginPassword.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  //Функция обработки нажатия кнопки "Войти"
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function loginInToTheSite() {
    if (email === "" || password === "") {
      return toastView("warning", "Необходимо вести данные для авторизации.");
    } else {
      dispatch(login(email, password));
    }
  }

  return (
    <div className="modal fade" id="enterCabinetModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Вход в личный кабинет
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email-адрес
              </label>
              <Input className="form-control inputLoginEmail" value={email} setValue={setEmail} type="text" placeholder="Введите email..." />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Пароль
              </label>
              <Input className="form-control inputLoginPassword" value={password} setValue={setPassword} type="password" placeholder="Введите пароль..." />
            </div>
            <div className="d-grid gap-2 d-md-blockr overflow-hidden">
              <button className="btn btn-primary" type="button" id="button_auth" onClick={() => loginInToTheSite()} data-bs-dismiss="modal">
                Войти
              </button>
              <button className="btn btn-success" type="button" id="button_auth" data-bs-toggle="modal" data-bs-target="#registerUserModal" data-bs-dismiss="modal">
                Зарегистрироваться
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authorization;
