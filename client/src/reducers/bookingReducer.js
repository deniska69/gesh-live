const SET_EXBOOKING = "SET_EXBOOKING"
const SET_FINDBOOKING = "SET_FINDBOOKING"
const SET_FREEBOOKING = "SET_FREEBOOKING"
const SET_ISBOOKING_TRUE = "SET_ISBOOKING_TRUE"
const SET_ISBOOKING_FALSE = "SET_ISBOOKING_FALSE"
const SET_OPTIONS = "SET_OPTIONS"
const SET_HISTORY = "SET_HISTORY"
const SET_NEWBOOKING = "SET_NEWBOOKING"

const SET_ONEBOOKING = "SET_ONEBOOKING"

const defaultState = {
    listExBooking: [],
    listFindBooking: [],
    listFreeBooking: [],
    isBooking: false,
    options: [],
    history: [],
    id_booking: "",
    oneBooking: {}
}

export default function bookingReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_EXBOOKING:
            return {
                ...state,
                listExBooking: action.payload
            }
        case SET_FINDBOOKING:
            return {
                ...state,
                listFindBooking: action.payload
            }
        case SET_FREEBOOKING:
            return {
                ...state,
                listFreeBooking: action.payload
            }
        case SET_ISBOOKING_TRUE:
            return {
                ...state,
                isBooking: true
            }
        case SET_ISBOOKING_FALSE:
            return {
                ...state,
                isBooking: false
            }
        case SET_OPTIONS:
            return {
                ...state,
                options: action.payload
            }
        case SET_HISTORY:
            return {
                ...state,
                history: action.payload
            }
        case SET_NEWBOOKING:
            return {
                ...state,
                id_booking: action.payload
            }
        case SET_ONEBOOKING:
            return {
                ...state,
                oneBooking: action.payload
            }
        default:
            return state
    }
}

export const setExBooking = exBooking => ({ type: SET_EXBOOKING, payload: exBooking })
export const setFindBooking = findBooking => ({ type: SET_FINDBOOKING, payload: findBooking })
export const setFreeBooking = freedBooking => ({ type: SET_FREEBOOKING, payload: freedBooking })

export const setIsBookingTrue = () => ({ type: SET_ISBOOKING_TRUE })
export const setIsBookingFalse = () => ({ type: SET_ISBOOKING_FALSE })

export const setBokingOption = options => ({ type: SET_OPTIONS, payload: options })
export const setHistory = historyBooking => ({ type: SET_HISTORY, payload: historyBooking })

export const setOneBooking = booking => ({ type: SET_ONEBOOKING, payload: booking })