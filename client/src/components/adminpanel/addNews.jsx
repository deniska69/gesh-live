import React, { useState } from "react";
import Input from "../../utils/input/Input";
import { uploadAttachmentNews } from "../../actions/news";
import { addNews } from "../../actions/news";
import { useDispatch } from "react-redux";
const Uuid = require("uuid");

const AddNews = () => {
  const dispatch = useDispatch();

  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [date, setDate] = useState("");

  //Переменная для хранения вложения
  let file;

  function addNewsNow() {
    var attachmentName;

    //Если пользователь приложил файл
    /* eslint eqeqeq: 0 */
    if (file != null) {
      //Генерируем уникальное имя будущего файла
      attachmentName = Uuid.v4() + ".jpg";

      //Вызываем функцию для загрузки файла на сервер и передаём ей в параметры: (файл, сгенерированное имя)
      dispatch(uploadAttachmentNews(file, attachmentName));
    } else {
      attachmentName = "";
    }

    //Проверяем, заполенны ли поля
    if (text1 != "" && text2 != "" && date != "") {
      console.log(attachmentName);

      //Вызываем функцию внесения претензии в базу данных, и передаём ей в параметры:(Ф.И.О., личный счёт, текст обращения, сгенерированное имя файла)
      addNews(text1, text2, date, attachmentName);
    } else {
      alert("Заполненны не все поля!");
    }

    setText1("");
    setText2("");
    setDate("");
  }

  //Функция выбора файла и занесения его в переменную
  function changeHandler(e) {
    file = e.target.files[0];
  }

  return (
    <div className="modal fade" id="addNewsModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Добавление нового события
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Название:</label>
              <Input className="form-control" value={text1} setValue={setText1} placeholder="Введите Название..." />
            </div>
            <div className="mb-3">
              <label className="form-label">Описание:</label>
              <Input className="form-control" value={text2} setValue={setText2} placeholder="Введите Описание..." />
            </div>
            <div className="mb-3">
              <label className="form-label">Доп.текст:</label>
              <Input className="form-control" value={date} setValue={setDate} placeholder="Введите доп.текст..." />
            </div>
            <div className="mb-3">
              <p />
              <label className="form-label">Загрузите изображение:</label>
              <input accept="image/*" onChange={(e) => changeHandler(e)} type="file" className="form-control" />
            </div>
            <div className="d-grid gap-2 d-md-blockr overflow-hidden">
              <button className="btn btn-primary" type="button" id="button_auth" onClick={() => addNewsNow()}>
                Сохранить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNews;
