import React, { useState } from "react";
import Input from "../../utils/input/Input";
import { registration } from "../../actions/users";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="modal fade" id="registerUserModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Регистрация пользователя
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Ф.И.О.
              </label>
              <Input className="form-control" value={name} setValue={setName} type="text" placeholder="Введите Ф.И.О...." />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email-адрес
              </label>
              <Input className="form-control" value={email} setValue={setEmail} type="text" placeholder="Введите email..." />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Пароль
              </label>
              <Input className="form-control" value={password} setValue={setPassword} type="password" placeholder="Введите пароль..." />
            </div>
            <div className="d-grid gap-2 d-md-blockr overflow-hidden">
              <button className="btn btn-primary" type="button" id="button_auth" onClick={() => registration(email, password, name)}>
                Зарегистрироваться
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
