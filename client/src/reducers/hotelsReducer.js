const SET_HOTEL = "SET_HOTEL";
const SET_ONEHOTEL = "SET_ONEHOTEL";
const SET_ALLHOTELS = "SET_ALLHOTELS";

const defaultState = {
  currentHotel: {},
  listHotels: [],
};

export default function hotelsReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_HOTEL:
      return {
        ...state,
        currentHotel: action.payload,
      };
    case SET_ONEHOTEL:
      return {
        ...state,
        listHotels: state.listHotels.map((n) => (n._id === action.payload._id ? action.payload : n)),
      };
    case SET_ALLHOTELS:
      return {
        ...state,
        listHotels: action.payload,
      };
    default:
      return state;
  }
}
export const setHotel = (hotel) => ({ type: SET_HOTEL, payload: hotel });
export const setOneHotel = (hotelOne) => ({ type: SET_ONEHOTEL, payload: hotelOne });
export const setAllHotels = (hotels) => ({ type: SET_ALLHOTELS, payload: hotels });
