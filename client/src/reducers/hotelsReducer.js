const SET_ONEHOTEL = 'SET_ONEHOTEL';
const SET_ALLHOTELS = 'SET_ALLHOTELS';
const SET_ONEHOTEL_UPDATE_IN_ALLHOTELS = 'SET_ONEHOTEL_UPDATE_IN_ALLHOTELS';

const defaultState = {
  hotelOne: {},
  hotelsAll: [],
};

export default function hotelsReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_ONEHOTEL:
      return {
        ...state,
        hotelOne: action.payload,
      };
    case SET_ALLHOTELS:
      return {
        ...state,
        hotelsAll: action.payload,
      };
    case SET_ONEHOTEL_UPDATE_IN_ALLHOTELS:
      return {
        ...state,
        hotelsAll: state.hotelsAll.map(n => (n._id === action.payload._id ? action.payload : n)),
      };
    default:
      return state;
  }
}

export const setHotelOne = hotelOne => ({ type: SET_ONEHOTEL, payload: hotelOne });
export const setHotelsAll = hotelsAll => ({ type: SET_ALLHOTELS, payload: hotelsAll });
export const setOneHotelUpdateInAllHotels = hotelOneUpdateInAllHotels => ({ type: SET_ONEHOTEL_UPDATE_IN_ALLHOTELS, payload: hotelOneUpdateInAllHotels });
