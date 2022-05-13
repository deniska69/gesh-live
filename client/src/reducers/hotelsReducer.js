const SET_HOTEL = "SET_HOTEL";
const SET_UPDATEONEHOTEL = "SET_UPDATEONEHOTEL";
const SET_ALLHOTELS = "SET_ALLHOTELS";
const SET_ONEHOTEL = "SET_ONEHOTEL";

const defaultState = {
  currentHotel: {},
  listHotels: [],
  oneHotel: {},
};

export default function hotelsReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_HOTEL:
      return {
        ...state,
        currentHotel: action.payload,
      };
    case SET_UPDATEONEHOTEL:
      return {
        ...state,
        listHotels: state.listHotels.map((n) => (n._id === action.payload._id ? action.payload : n)),
      };
    case SET_ALLHOTELS:
      return {
        ...state,
        listHotels: action.payload,
      };
    case SET_ONEHOTEL:
      return {
        ...state,
        oneHotel: action.payload,
      };
    default:
      return state;
  }
}
export const setHotel = (hotel) => ({ type: SET_HOTEL, payload: hotel });
export const setOneHotelUpdate = (hotelOneUpdate) => ({ type: SET_UPDATEONEHOTEL, payload: hotelOneUpdate });
export const setAllHotels = (hotels) => ({ type: SET_ALLHOTELS, payload: hotels });
export const setOneHotel = (hotelOne) => ({ type: SET_ONEHOTEL, payload: hotelOne });
