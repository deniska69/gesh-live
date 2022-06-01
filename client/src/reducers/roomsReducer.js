const SET_ONEROOM = 'SET_ONEROOM';
const SET_ALLROOMS = 'SET_ALLROOMS';
const SET_ONEROOM_UPDATE_IN_ALLROOMS = 'SET_ONEROOM_UPDATE_IN_ALLROOMS';

const defaultState = {
  roomOne: {},
  roomsAll: [],
};

export default function roomsReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_ONEROOM:
      return {
        ...state,
        roomOne: action.payload,
      };
    case SET_ALLROOMS:
      return {
        ...state,
        roomsAll: action.payload,
      };
    case SET_ONEROOM_UPDATE_IN_ALLROOMS:
      return {
        ...state,
        roomsAll: state.roomsAll.map(n => (n._id === action.payload._id ? action.payload : n)),
      };
    default:
      return state;
  }
}
export const setRoomOne = roomOne => ({ type: SET_ONEROOM, payload: roomOne });
export const setRoomsAll = roomsAll => ({ type: SET_ALLROOMS, payload: roomsAll });
export const setOneRoomUpdateInAllRooms = roomOneUpdateInAllRooms => ({ type: SET_ONEROOM_UPDATE_IN_ALLROOMS, payload: roomOneUpdateInAllRooms });
