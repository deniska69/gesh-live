import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./adminpanel.css";
import UserEditor from "./userEditor";
import HotelEditor from "./hotelEditor";
import NewsEditor from "./newsEditor";
import EventsEditor from "./eventsEditor";
import { WWW_URL } from "../../config";

const AdminPanel = () => {
  //Получаем из редюсера состояние: авторизован ли пользователь
  const isAuth = useSelector((state) => state.user.isAuth);
  const isAdmin = useSelector((state) => state.user.isAdmin);

  //Если пользователь не авторизован и не явлется администратором, то редиректим его на главную страницу
  if (!isAuth && !isAdmin) window.location.href = `${WWW_URL}`;

  const [panelUsers, setPanelUsers] = useState(true);
  const [panelHotelsAndRooms, setPanelHotelsAndRooms] = useState(false);
  const [panelNews, setPanelNews] = useState(false);
  const [panelEvents, setPanelEvents] = useState(false);

  function selectAdminpanel(value) {
    const btnAdminPanelSelectUser = document.querySelector(".btnAdminPanelSelectUser");
    const btnAdminPanelSelectHotelsAndRooms = document.querySelector(".btnAdminPanelSelectHotelsAndRooms");
    const btnAdminPanelSelectNews = document.querySelector(".btnAdminPanelSelectNews");
    const btnAdminPanelSelectEvents = document.querySelector(".btnAdminPanelSelectEvents");

    if (value === "panelUsers") {
      btnAdminPanelSelectUser.classList.remove("btn-outline-primary");
      btnAdminPanelSelectUser.classList.add("btn-primary");

      btnAdminPanelSelectHotelsAndRooms.classList.add("btn-outline-primary");
      btnAdminPanelSelectHotelsAndRooms.classList.remove("btn-primary");

      btnAdminPanelSelectNews.classList.add("btn-outline-primary");
      btnAdminPanelSelectNews.classList.remove("btn-primary");

      btnAdminPanelSelectEvents.classList.add("btn-outline-primary");
      btnAdminPanelSelectEvents.classList.remove("btn-primary");

      setPanelUsers(true);
      setPanelHotelsAndRooms(false);
      setPanelNews(false);
      setPanelEvents(false);
    }

    if (value === "panelHotelsAndRooms") {
      btnAdminPanelSelectUser.classList.add("btn-outline-primary");
      btnAdminPanelSelectUser.classList.remove("btn-primary");

      btnAdminPanelSelectHotelsAndRooms.classList.remove("btn-outline-primary");
      btnAdminPanelSelectHotelsAndRooms.classList.add("btn-primary");

      btnAdminPanelSelectNews.classList.add("btn-outline-primary");
      btnAdminPanelSelectNews.classList.remove("btn-primary");

      btnAdminPanelSelectEvents.classList.add("btn-outline-primary");
      btnAdminPanelSelectEvents.classList.remove("btn-primary");

      setPanelUsers(false);
      setPanelHotelsAndRooms(true);
      setPanelNews(false);
      setPanelEvents(false);
    }

    if (value === "panelNews") {
      btnAdminPanelSelectUser.classList.add("btn-outline-primary");
      btnAdminPanelSelectUser.classList.remove("btn-primary");

      btnAdminPanelSelectHotelsAndRooms.classList.add("btn-outline-primary");
      btnAdminPanelSelectHotelsAndRooms.classList.remove("btn-primary");

      btnAdminPanelSelectNews.classList.remove("btn-outline-primary");
      btnAdminPanelSelectNews.classList.add("btn-primary");

      btnAdminPanelSelectEvents.classList.add("btn-outline-primary");
      btnAdminPanelSelectEvents.classList.remove("btn-primary");

      setPanelUsers(false);
      setPanelHotelsAndRooms(false);
      setPanelNews(true);
      setPanelEvents(false);
    }

    if (value === "panelEvents") {
      btnAdminPanelSelectUser.classList.add("btn-outline-primary");
      btnAdminPanelSelectUser.classList.remove("btn-primary");

      btnAdminPanelSelectHotelsAndRooms.classList.add("btn-outline-primary");
      btnAdminPanelSelectHotelsAndRooms.classList.remove("btn-primary");

      btnAdminPanelSelectNews.classList.add("btn-outline-primary");
      btnAdminPanelSelectNews.classList.remove("btn-primary");

      btnAdminPanelSelectEvents.classList.remove("btn-outline-primary");
      btnAdminPanelSelectEvents.classList.add("btn-primary");

      setPanelUsers(false);
      setPanelHotelsAndRooms(false);
      setPanelNews(false);
      setPanelEvents(true);
    }
  }
  return (
    <div className="card card_adminpanel">
      <div className="card-body">
        <h4>Панель администратора</h4>
        <div className="containerAdminpanelBtnSelect">
          <button type="button" className="btn btn-primary btn-sm btnAdminPanelSelectUser" onClick={() => selectAdminpanel("panelUsers")}>
            Пользователи
          </button>
          <button type="button" className="btn btn-outline-primary btn-sm btnAdminPanelSelectHotelsAndRooms" onClick={() => selectAdminpanel("panelHotelsAndRooms")}>
            Отели и Апартаменты
          </button>
          <button type="button" className="btn btn-outline-primary btn-sm btnAdminPanelSelectNews" onClick={() => selectAdminpanel("panelNews")}>
            Новости
          </button>
          <button type="button" className="btn btn-outline-primary btn-sm btnAdminPanelSelectEvents" onClick={() => selectAdminpanel("panelEvents")}>
            Мероприятия
          </button>
        </div>

        {/* Редактирование пользователей */}
        {panelUsers && (
          <div className="row align-item-start">
            <UserEditor />
          </div>
        )}

        {/* Редактирование отелей + апартаментов*/}
        {panelHotelsAndRooms && (
          <div className="row align-item-start">
            <HotelEditor />
          </div>
        )}

        {/* Редактирование новостей */}
        {panelNews && (
          <div className="row align-item-start">
            <NewsEditor />
          </div>
        )}

        {/* Редактирование мероприятий */}
        {panelEvents && (
          <div className="row align-item-start">
            <EventsEditor />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
