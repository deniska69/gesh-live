// const SET_HOTEL = "SET_HOTEL";
// const SET_UPDATEONEHOTEL = "SET_UPDATEONEHOTEL";
const SET_ONEHOTEL = "SET_ONEHOTEL";
const SET_ALLHOTELS = "SET_ALLHOTELS";
// const SET_ONEHOTEL = "SET_ONEHOTEL";
// const SET_GALLERYHOTEL = "SET_GALLERYHOTEL";
// const SET_ONEHOTEL_FROM_ALLHOTELS = "SET_ONEHOTEL_FROM_ALLHOTELS";

const defaultState = {
  // currentHotel: {},
  // listHotels: [],
  // oneHotel: {},
  // listGallery: [],
  hotelOne: {},
  hotelsAll: [],
};

export default function hotelsReducer(state = defaultState, action) {
  switch (action.type) {
    // case SET_HOTEL:
    //   return {
    //     ...state,
    //     currentHotel: action.payload,
    //   };
    case SET_ONEHOTEL:
      return {
        ...state,
        hotelOne: action.payload,
      };
    // case SET_UPDATEONEHOTEL:
    //   return {
    //     ...state,
    //     listHotels: state.listHotels.map((n) => (n._id === action.payload._id ? action.payload : n)),
    //   };
    case SET_ALLHOTELS:
      return {
        ...state,
        hotelsAll: action.payload,
      };
    // case SET_ONEHOTEL:
    //   return {
    //     ...state,
    //     oneHotel: action.payload,
    //   };
    // case SET_GALLERYHOTEL:
    //   return {
    //     ...state,
    //     listGallery: action.payload,
    //   };
    // case SET_ONEHOTEL_FROM_ALLHOTELS:
    //   return {
    //     ...state,
    //     oneHotel: state.listHotels.filter((n) => n._id === action.payload._id),
    //   };
    default:
      return state;
  }
}
// export const setHotel = (hotel) => ({ type: SET_HOTEL, payload: hotel });
// export const setOneHotelUpdate = (hotelOneUpdate) => ({ type: SET_UPDATEONEHOTEL, payload: hotelOneUpdate });
export const setHotelOne = (hotelOne) => ({ type: SET_ONEHOTEL, payload: hotelOne });
export const setHotelsAll = (hotelsAll) => ({ type: SET_ALLHOTELS, payload: hotelsAll });
// export const setOneHotel = (hotelOne) => ({ type: SET_ONEHOTEL, payload: hotelOne });
// export const setGalleryHotels = (hotelsGallery) => ({ type: SET_GALLERYHOTEL, payload: hotelsGallery });
// export const setOneHotelFromAllHotels = (hotelOneFromAllHotels) => ({ type: SET_ONEHOTEL_FROM_ALLHOTELS, payload: hotelOneFromAllHotels });
