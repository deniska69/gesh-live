import React, { useState } from "react";
import Input from "../../utils/input/Input";
import { registration } from "../../actions/users";

const AddUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [id_acc, setId_acc] = useState("");

  //Функция отправки запроса на регистрацию
  function addUserNow() {
    registration(email, password, name, id_acc);
  }

  //Функция выбора пользователя из выпадающего списка
  function changeHandlerAccessLevel(e) {
    setId_acc(e.target.value);
  }

  return (
    <div className="modal fade" id="addUserModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h6 className="modal-title" id="exampleModalLabel">
              Добавление нового пользователя:
            </h6>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-sm-2">
                <label className="form-label form-control-sm">Имя:</label>
              </div>
              <div className="col-sm-10">
                <Input className="form-control form-control-sm" value={name} setValue={setName} />
              </div>
            </div>

            <div className="row">
              <div className="col-sm-2">
                <label className="form-label form-control-sm">Email:</label>
              </div>
              <div className="col-sm-10" autoComplete="off">
                <form action="">
                  <Input className="form-control form-control-sm" value={email} setValue={setEmail} type="text" />
                </form>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-2">
                <label className="form-label form-control-sm">Пароль:</label>
              </div>
              <div className="col-sm-10" autoComplete="off">
                <form action="">
                  <Input className="form-control form-control-sm" value={password} setValue={setPassword} type="password" />
                </form>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-2">
                <label className="form-label form-control-sm">Доступ:</label>
              </div>
              <div className="col-sm-10">
                <select className="form-select form-select-sm accessLevelAdminPanelAddNewUser" aria-label=".form-select-sm example" onChange={(e) => changeHandlerAccessLevel(e)}>
                  <option value="0">Выберите уровень доступа...</option>
                  <option value="1">Обычный пользователь</option>
                  <option value="2">Администратор</option>
                  <option value="3">Менеджер отеля</option>
                </select>
              </div>
            </div>

            <div className="d-grid gap-2 d-md-blockr overflow-hidden">
              <button className="btn btn-success btn-sm" type="button" onClick={() => addUserNow()}>
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
