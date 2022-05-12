const SET_USER = "SET_USER";
const LOGOUT = "LOGOUT";
const SET_ADMIN = "SET_ADMIN";
const SET_ALLUSER = "SET_ALLUSER";
const SET_ONEUSER = "SET_ONEUSER";

const defaultState = {
  currentUser: {},
  isAuth: false,
  isAdmin: false,
  listUsers: [],
};

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
        isAuth: true,
      };
    case SET_ADMIN:
      return {
        ...state,
        isAdmin: true,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        currentUser: {},
        isAuth: false,
        idAdmin: false,
        listUsers: [],
      };
    case SET_ONEUSER:
      return {
        ...state,
        listUsers: state.listUsers.map((n) => (n._id === action.payload._id ? action.payload : n)),
      };
    case SET_ALLUSER:
      return {
        ...state,
        listUsers: action.payload,
      };
    default:
      return state;
  }
}

export const setUser = (user) => ({ type: SET_USER, payload: user });
export const setOneUser = (userOne) => ({ type: SET_ONEUSER, payload: userOne });
export const setAllUser = (users) => ({ type: SET_ALLUSER, payload: users });
export const setUserAdmin = () => ({ type: SET_ADMIN });
export const logout = () => ({ type: LOGOUT });

//export const addFile = (userOne) => ({ type: SET_ONEUSER, payload: userOne });
