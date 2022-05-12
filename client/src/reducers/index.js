import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import userReducer from "./userReducer";
import hotelsReducer from "./hotelsReducer";
import roomsReducer from "./roomsReducer";
import bookingReducer from "./bookingReducer";
import "bootstrap";
import newsReducer from "./newsReducer";
import eventsReducer from "./eventsReducer";
import weatherReducer from "./weatherReducer";

const rootReducer = combineReducers({
  user: userReducer,
  hotel: hotelsReducer,
  room: roomsReducer,
  booking: bookingReducer,
  news: newsReducer,
  events: eventsReducer,
  weather: weatherReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
