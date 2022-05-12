import React, { useState } from "react";
import Input from "../../utils/input/Input";
import TextArea from "../../utils/input/TextArea";
import { feedback } from "../../actions/feedback";

const Feedback = () => {
  //Переменные значения которых, мы получаем со страницы:
  const [text, setText] = useState(""); //Текст
  const [email, setEmail] = useState(""); //Email
  const [phone, setPhone] = useState(""); //Телефон

  //Функция регистрации претензии
  function sendFeedback() {
    //Проверяем, заполенны ли поля
    // eslint-disable-next-line
    if (text != "" && email != "" && phone != "") {
      //Вызываем функцию отправки запроса
      feedback(text, email, phone);
    } else {
      alert("Заполненны не все поля!");
    }
  }

  return (
    <div className="modal fade" id="feedbackModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Оставьте отзыв
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="exampleFormControlTextarea1" className="form-label">
                Введите, что вас интересует?
              </label>
              <TextArea value={text} setValue={setText} className={"form-control"} type="text" rows={8} />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Укажите ваш Email.
              </label>
              <Input value={email} setValue={setEmail} type="text" className={"form-control"} placeholder="name@example.com" />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Укажите ваш телефон
              </label>
              <Input value={phone} setValue={setPhone} type="text" className={"form-control"} placeholder="+7 (___) ___-__-__" />
            </div>

            <div className="d-grid gap-2 d-md-blockr overflow-hidden">
              <button className="btn btn-primary" type="submit" onClick={() => sendFeedback()} data-bs-dismiss="modal">
                Отправить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
