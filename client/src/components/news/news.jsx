import React, { useEffect } from "react";
import "./news.css";
import { useDispatch, useSelector } from "react-redux";
import { allNews } from "../../actions/news";
import attachmentDefault from "../../assets/img/attachment.png";
import { API_URL } from "../../config";

const News = () => {
  const dispatch = useDispatch();

  //Вызов функции для получения всех записей претензий из базы данных
  useEffect(() => {
    dispatch(allNews());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listNews = useSelector((state) => state.news.listNews); //Заносим в переменную все записи претензий из редюсера

  return (
    <div className="card" id="card_news">
      <div className="card-body">
        <div className="row">
          <h3>Новости Шерегеша</h3>
          <br />
          <br />

          {listNews.map(({ _id, text1, text2, date, cover }) => (
            <div key={_id.toString()} className="col-sm-12">
              <div className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-4">
                    {/* eslint-disable-next-line */}
                    <img src={cover ? `${API_URL + "\\news\\" + cover}` : attachmentDefault} alt={_id.toString()} id="attachment_img" />
                  </div>

                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{text1}</h5>
                      <p className="card-text">{text2}</p>
                      <p className="card-text">
                        <small className="text-muted">{date}</small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
