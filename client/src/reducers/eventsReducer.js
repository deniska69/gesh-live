const SET_ALLEVENTS = "SET_ALLEVENTS"

const defaultState = {
    listEvents: []
}

export default function eventsReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_ALLEVENTS:
            return {
                ...state,
                listEvents: action.payload
            }
        default:
            return state
    }
}
export const setAllEvents = events => ({ type: SET_ALLEVENTS, payload: events })