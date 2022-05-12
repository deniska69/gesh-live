const SET_ROOM = "SET_ROOM"
const SET_ONEROOM = "SET_ONEROOM"
const SET_ALLROOMS = "SET_ALLROOMS"

const defaultState = {
    currentRoom: {},
    listRooms: []
}

export default function roomsReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_ROOM:
            return {
                ...state,
                currentRoom: action.payload
            }
        case SET_ONEROOM: 
            return {
                ...state, 
                listRooms: [...state.listRooms, action.payload]
            }
        case SET_ALLROOMS:
            return {
                ...state,
                listRooms: action.payload
            }
        default:
            return state
    }
}
export const setRoom= room => ({ type: SET_ROOM, payload: room })
export const setOneRoom = (roomOne) => ({type: SET_ONEROOM, payload: roomOne})
export const setAllRooms = rooms => ({ type: SET_ALLROOMS, payload: rooms })