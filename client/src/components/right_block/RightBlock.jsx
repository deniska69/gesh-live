import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../actions/users";
import { useEffect } from "react";
import Cabinet from "../cabinet/cabinet";
import Booking from "../booking/booking";
import AdminPanel from "../adminpanel/adminpanel";
import News from "../news/news";
import Events from "../events/events";
import Home from "../home/home";
import Elevator from "../elevator/elevator";
import Food from "../food/food";
import Mountain from "../mountain/mountain";
import Weather from "../weather/weather";
import History from "../history/history";
import Gallery from "../gallery/gallery";
import Press from "../press/press";
import ConfirmBooking from "../confirmBooking/confirmBooking";
import Hotel from "../hotel/hotel";
// eslint-disable-next-line
import Error from "../error/error";

function RightBlock() {
  //Получаем из редюсера состояние: авторизован ли пользователь
  const isAuth = useSelector((state) => state.user.isAuth);
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const dispatch = useDispatch();

  //Пробуем получить токен
  const token = localStorage.getItem("token");

  //Если токен найден, то производим авторизацию (сделано для того, чтобы лишний раз не вызывать запрос авторизации к серверу)
  if (token) {
    // eslint-disable-next-line
    useEffect(() => {
      dispatch(auth());
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  }

  return (
    <div className="container-fluid" id="content">
      <div className="row" id="contentRow">
        <BrowserRouter>
          {isAuth && (
            <Switch>
              <Route path="/cabinet" component={Cabinet} />
              <Route path="/booking" component={Booking} />
              {isAdmin && (
                <Switch>
                  <Route path="/adminpanel" component={AdminPanel} />
                </Switch>
              )}
            </Switch>
          )}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/news" component={News} />
            <Route path="/events" component={Events} />
            <Route path="/elevator" component={Elevator} />
            <Route path="/food" component={Food} />
            <Route path="/mountain" component={Mountain} />
            <Route path="/weather" component={Weather} />
            <Route path="/history" component={History} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/press" component={Press} />
            <Route path="/confirmBooking/:idBooking/:idRoom" component={ConfirmBooking} />
            <Route path="/hotels/:urlHotel" component={Hotel} />
            {/* <Route path="*" component={Error} /> */}
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default RightBlock;
