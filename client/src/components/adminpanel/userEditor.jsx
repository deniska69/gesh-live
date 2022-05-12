import React, { useEffect, useState } from "react";
import Input from "../../utils/input/Input";
import { useSelector, useDispatch } from "react-redux";
import { allUser, updateProfile, blockProfile, deleteAvatar } from "../../actions/users";
import { API_URL } from "../../config";
import avatarDefault from "../../assets/img/avatar.png";
import { toastView } from "../App";
import AddUser from "./addUser";

const UserEditor = () => {
  const dispatch = useDispatch();

  const allUsers = useSelector((state) => state.user.listUsers); //Получаем из редюсера список пользователей
  const [isSelectUser, setIsSelectUser] = useState(false); //Выбран ли пользователь

  //Профиль выбранного пользователя
  const [idSelectUser, setIdSelectUser] = useState(""); //ID выбранного пользователя
  const [emailSelectUser, setEmailSelectUser] = useState(""); //E-mail выбранного пользователя
  const [passwordSelectUser, setPasswordSelectUser] = useState(""); //Пароль выбранного пользователя
  const [nameSelectUser, setNameSelectUser] = useState(""); //Ф.И.О. выбранного пользователя
  const [accessLevelUser, setAccessLevelUser] = useState(""); //Уровень доступа выбранного пользователя
  const [avatarSelectUser, setAvatarSelectUser] = useState(""); //Аватар выбранного пользователя
  const [isExistAvatarSelectUser, setisExistAvatarSelectUser] = useState(false); //Существует на сервере файл изображения аватара выбранного пользователя
  const [isEnableSelectUser, setisEnableSelectUser] = useState(false); //Активен или заблокирован выбранный пользователь

  //Обновлённые данные профиля
  const [emailSelectUserNew, setEmailSelectUserNew] = useState(""); //Новый E-mail выбранного пользователя
  const [passwordSelectUserNew, setPasswordSelectUserNew] = useState(""); //Новый пароль выбранного пользователя
  const [nameSelectUserNew, setNameSelectUserNew] = useState(""); //Новое Ф.И.О. выбранного пользователя
  const [accessLevelUserNew, setAccessLevelUserNew] = useState(""); //Новый уровень доступа выбранного пользователя

  //Функция загрузки списка пользователей
  useEffect(() => {
    dispatch(allUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Функция выбора пользователя из выпадающего списка
  function changeHandlerUserList(e) {
    /* eslint eqeqeq: 0 */
    //Если выбранный элемент из выпадающего списка не равен нулю (т.е. выбран пользователь)
    if (e.target.value != 0) {
      //Получаем данные пользователя из редюсера, хранящего всех пользователей
      allUsers.reduce((res, note) => {
        if (note._id === e.target.value) {
          if (note.avatar != "") {
            //Создаём элемент изображение
            const avatarCheck = new Image();

            //Назначаем URL в объект Image
            avatarCheck.src = `${API_URL + "\\avatars\\" + note.avatar}`;

            //Проверяем ссылку на содержание изображения
            avatarCheck.onload = function () {
              setisExistAvatarSelectUser(true);
            };

            avatarCheck.onerror = function () {
              setisExistAvatarSelectUser(false);
            };
          }

          setIsSelectUser(true); //Подтверждаем выбор пользователя из списка
          setIdSelectUser(note._id); //Получаем ID выбранного пользователя
          setNameSelectUser(note.name); //Получаем Имя выбранного пользователя
          setEmailSelectUser(note.email); //Получаем Email выбранного пользователя
          setPasswordSelectUser(""); //Получаем Пароль выбранного пользователя
          setisEnableSelectUser(note.enable); //Получаем Статус выбранного пользователя
          setAvatarSelectUser(note.avatar); //Получаем Аватар выбранного пользователя
          setAccessLevelUser(note.id_acc); //Получаем Уровень доступа выбранного пользователя

          setNameSelectUserNew(note.name); //Получаем Имя выбранного пользователя
          setEmailSelectUserNew(note.email); //Получаем Email выбранного пользователя
          setAccessLevelUserNew(note.id_acc); //Получаем Уровень доступа выбранного пользователя

          // eslint-disable-next-line
          return;
        } else {
          return res;
        }
      }, {});
    } else {
      //Если выбранный элемент из выпадающего списка равен нулю (т.е. не выбран пользователь)
      setIsSelectUser(false); //Сбрасываем состояние, что выбран пользователь
    }
  }

  //Функция сохранения обновлённых данных профиля пользователя
  function updateProfileNow() {
    if (isSelectUser) {
      let name,
        email,
        password,
        accessLevel = "";

      if (emailSelectUser === emailSelectUserNew && nameSelectUser === nameSelectUserNew && passwordSelectUser === passwordSelectUserNew && accessLevelUser === accessLevelUserNew) {
        return toastView("warning", "Никакие данные не были изменены.");
      } else {
        email = emailSelectUserNew;
        password = passwordSelectUserNew;
        name = nameSelectUserNew;
        accessLevel = accessLevelUserNew;

        if (accessLevel != "") {
          setAccessLevelUser(accessLevel);
        }

        dispatch(updateProfile(idSelectUser, email, password, name, accessLevel));
      }
    } else {
      toastView("warning", "Необходимо выбрать пользователя!");
    }
  }

  //Функция блокировки пользователя
  function blockProfileNow() {
    if (isSelectUser) {
      if (accessLevelUser == 2) {
        return toastView("error", "Нельзя заблокировать/разблокировать Администратора.");
      }

      if (isEnableSelectUser) {
        dispatch(blockProfile(idSelectUser, 0));
        setisEnableSelectUser(false);
      } else {
        dispatch(blockProfile(idSelectUser, 1));
        setisEnableSelectUser(true);
      }
    } else {
      toastView("warning", "Необходимо выбрать пользователя!");
    }
  }

  //Функция удаления аватара пользователя (записи в БД)
  function deleteAvatarNow() {
    dispatch(deleteAvatar(idSelectUser));
    setisExistAvatarSelectUser(false);
  }

  //Функция обработки выбора уровня доступа пользователя
  function changeHandlerAccessLevelAdminPanelEditUser(e) {
    setAccessLevelUserNew(e.target.value);
  }

  return (
    <div className="row align-item-start">
      <div className="row align-item-start">
        {/* Блок выбора пользователя */}
        <div className="col-lg-2">
          <select className="form-select form-select-sm" aria-label="Default select example" onChange={(e) => changeHandlerUserList(e)}>
            <option value={0}>Выберите пользователя...</option>
            {allUsers.map((allUsers) => (
              <option key={allUsers._id.toString()} value={allUsers._id.toString()}>
                {" "}
                {allUsers.name.toString()}
              </option>
            ))}
          </select>
          <br />
          <button className="btn btn-success btn-sm w-100" type="button" data-bs-toggle="modal" data-bs-target="#addUserModal">
            Добавить пользователя
          </button>

          {/* Импортируем модальное окно добавления нового пользователя */}
          <AddUser />
        </div>

        {/* Блок вывода профиля выбранного пользователя*/}
        {isSelectUser && (
          <div className="col-lg-3">
            <div className="row">
              <div className="col-sm-4">
                <label className="form-label form-control-sm">Статус:</label>
              </div>
              <div className="col-sm-8">
                {isEnableSelectUser ? <label className="form-label form-control-sm text-success">Активен</label> : <label className="form-label form-control-sm text-danger">Заблокирован</label>}
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <label className="form-label form-control-sm">ID:</label>
              </div>
              <div className="col-sm-8">
                <label className="form-label form-control-sm">{idSelectUser}</label>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <label className="form-label form-control-sm">Имя:</label>
              </div>
              <div className="col-sm-8">
                <Input className="form-control form-control-sm" value={nameSelectUserNew} setValue={setNameSelectUserNew} type="text" />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-4">
                <label className="form-label form-control-sm">Email: </label>
              </div>
              <div className="col-sm-8">
                <Input className="form-control form-control-sm" value={emailSelectUserNew} setValue={setEmailSelectUserNew} type="text" />
              </div>
            </div>

            <div className="row">
              <div className="col-sm-4">
                <label className="form-label form-control-sm">Пароль:</label>
              </div>
              <div className="col-sm-8">
                <Input className="form-control form-control-sm" value={passwordSelectUserNew} setValue={setPasswordSelectUserNew} type="password" placeholder="********" />
              </div>
            </div>

            <div className="row">
              <div className="col-sm-4">
                <label className="form-label form-control-sm">Доступ:</label>
              </div>
              <div className="col-sm-8">
                <select
                  className="form-select form-select-sm accessLevelAdminPanelEditUser"
                  aria-label=".form-select-sm example"
                  value={accessLevelUserNew}
                  onChange={(e) => changeHandlerAccessLevelAdminPanelEditUser(e)}
                >
                  <option value="1">Обычный пользователь</option>
                  <option value="2">Администратор</option>
                  <option value="3">Менеджер отеля</option>
                </select>
              </div>
            </div>

            <br />

            <div className="row">
              <div className="col">
                <div className="d-grid">
                  <button type="button" className="btn btn-primary btn-sm w-auto" onClick={() => updateProfileNow()}>
                    Сохранить
                  </button>
                </div>
              </div>
              <div className="col">
                <div className="d-grid">
                  {isEnableSelectUser ? (
                    <button type="button" className="btn btn-warning btn-sm btnAdminpanelBlockuser" onClick={() => blockProfileNow()}>
                      Заблокировать
                    </button>
                  ) : (
                    <button type="button" className="btn btn-warning btn-sm btnAdminpanelBlockuser" onClick={() => blockProfileNow()}>
                      Разблокировать
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Блок вывода аватара выбраноного пользователя */}
        {isSelectUser && (
          <div className="col-lg-3">
            <div className="mb-3">
              <label className="form-label">Аватар:</label>
              <br />

              {!isExistAvatarSelectUser ? (
                /* eslint-disable-next-line */
                <img className="rounded avatarAdminPanelProfileUser" src={avatarDefault} />
              ) : (
                <div className="mb-3">
                  {/* eslint-disable-next-line */}
                  <img
                    className="rounded avatarAdminPanelProfileUser"
                    src={`${API_URL + "\\avatars\\" + avatarSelectUser}`}
                    alt={idSelectUser}
                    // eslint-disable-next-line
                    onError={(e) => ((e.target.onerror = null), (e.target.src = avatarDefault))}
                  />
                  <p />
                  <button type="button" className="btn btn-danger btn-sm btnAdminpanelDeleteAvatar" onClick={() => deleteAvatarNow()}>
                    Удалить аватар
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserEditor;
