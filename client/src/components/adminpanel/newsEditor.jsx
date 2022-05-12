import React, { useEffect, useState } from "react";
import Input from "../../utils/input/Input";
import { allNews } from "../../actions/news";
import AddNews from "./addNews";
//import AddEvents from "./addEvents";
import { updateNews } from "../../actions/news";
//import { updateEvents} from "../../actions/user";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const NewsEditor = () => {
  const dispatch = useDispatch();

  // eslint-disable-next-line
  const allNewslist = useSelector((state) => state.news.listNews);

  const [isSelectNews, setIsSelectNews] = useState(false);
  const [currentIDNews, setIDNews] = useState("");
  const [currentText1News, setCurrentText1News] = useState("");
  const [currentText2News, setCurrentText2News] = useState("");
  const [currentDateNews, setDateNews] = useState("");

  useEffect(() => {
    dispatch(allNews());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updateNewsNow() {
    if (isSelectNews) {
      updateNews(currentIDNews, currentText1News, currentText2News, currentDateNews);
    } else {
      alert("Необходимо выбрать отель!");
    }
  }

  function changeHandlerNewsList(e) {
    /* eslint eqeqeq: 0 */
    if (e.target.value != 0) {
      allNewslist.reduce((res, note) => {
        if (note._id === e.target.value) {
          // eslint-disable-next-line
          return setIsSelectNews(true), setIDNews(note._id), setCurrentText1News(note.text1), setCurrentText2News(note.text2), setDateNews(note.date);
        } else {
          return res;
        }
      }, {});
    } else {
      setIsSelectNews(false);
    }
  }

  return (
    <div className="col-lg-6">
      <div className="row align-item-start">
        {/* Выбор новости */}
        <div className="col-lg-6">
          <label className="form-label otstupSelect">Отступ</label>
          <select className="form-select" aria-label="Default select example" onChange={(e) => changeHandlerNewsList(e)}>
            <option value={0}>Выберите новость...</option>
            {allNewslist.map((allNewslist) => (
              <option key={allNewslist._id.toString()} value={allNewslist._id.toString()}>
                {" "}
                {allNewslist.text1.toString()}
              </option>
            ))}
          </select>
          <br />
          <br />
          <div className="d-grid gap-2">
            <button className="btn btn-success" type="button" data-bs-toggle="modal" data-bs-target="#addNewsModal">
              Добавить новую новость
            </button>
          </div>

          {/* Модальное окно добавления нового отеля */}
          <AddNews />
        </div>

        {/* Редактор новости */}
        {isSelectNews && (
          <div className="col-lg-6">
            <div className="mb-3">
              <label className="form-label">Заголовок:</label>
              <Input className="form-control" value={currentText1News} setValue={setCurrentText1News} type="text" />
            </div>
            <div className="mb-3">
              <label className="form-label">Описание:</label>
              {/* <Input value={descriptionHotelNew} setValue={setDescriptionHotel} type="text"  rows="3"/> */}
              {/* <textarea className="form-control" rows="3" value={currentText2News} setValue={setCurrentText2News} /> */}
              <Input className="form-control" value={currentText2News} setValue={setCurrentText2News} type="text" />
            </div>
            <div className="mb-3">
              <label className="form-label">Дата:</label>
              <Input className="form-control" value={currentDateNews} setValue={setDateNews} type="text" />
            </div>
            <div className="mb-3">
              <button type="button" className="btn btn-primary" onClick={() => updateNewsNow()}>
                Сохранить новость
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsEditor;
