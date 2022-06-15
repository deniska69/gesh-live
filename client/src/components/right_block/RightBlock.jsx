import React from 'react';
// eslint-disable-next-line
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../../actions/users';
import { useEffect } from 'react';
import Cabinet from '../cabinet/cabinet';
import Booking from '../booking/booking';
import AdminPanel from '../adminpanel/adminpanel';
import News from '../news/news';
import Events from '../events/events';
import Home from '../home/home';
import Elevator from '../elevator/elevator';
import Food from '../food/food';
import Mountain from '../mountain/mountain';
import Weather from '../weather/weather';
import History from '../history/history';
import Gallery from '../gallery/gallery';
import Press from '../press/press';
import ConfirmBooking from '../confirmBooking/confirmBooking';
import Hotel from '../hotel/hotel';
// eslint-disable-next-line
import Error from '../error/error';

function RightBlock() {
  //Получаем из редюсера состояние: авторизован ли пользователь
  const isAuth = useSelector(state => state.user.isAuth);
  const isAdmin = useSelector(state => state.user.isAdmin);
  const dispatch = useDispatch();

  //Пробуем получить токен
  const token = localStorage.getItem('token');

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
        {isAuth && (
          <Routes>
            <Route path="/cabinet" element={Cabinet} />
            <Route path="/booking" element={Booking} />
            {isAdmin && (
              <Routes>
                <Route path="/adminpanel" element={AdminPanel} />
              </Routes>
            )}
          </Routes>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/events" element={<Events />} />
          <Route path="/elevator" element={<Elevator />} />
          <Route path="/food" element={<Food />} />
          <Route path="/mountain" element={<Mountain />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/history" element={<History />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/press" element={<Press />} />
          <Route path="/confirmBooking/:idBooking/:idRoom" element={<ConfirmBooking />} />
          <Route path="/hotels/:urlHotel" element={<Hotel />} />
          {/* <Route path="*" component={Error} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default RightBlock;
