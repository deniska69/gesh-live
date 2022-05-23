import React from "react";
import "./error.css";

const Error = () => {
  return (
    <div className="card" id="card_error">
      <div className="card-body">
        <div className="row">
          <h5>Ошибка 404 - Такой страницы не существует!</h5>
          <br />
          <br />
          <br />
          <a className="btn btn-primary" href="/" role="button" id="btnError404GoToHome">
            Вернуться на главную страницу
          </a>
        </div>
      </div>
    </div>
  );
};

export default Error;
