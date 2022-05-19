import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
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
import Error from "../error/error";

function RightBlock() {
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
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/cabinet" component={Cabinet} />
            <Route path="/adminpanel" component={AdminPanel} />
            <Route path="/booking" component={Booking} />
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
            <Route path="*" component={Error} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default RightBlock;
