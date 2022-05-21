const SET_USER_CURRENT_AUTH = "SET_USER_CURRENT_AUTH";
const SET_USER_CURRENT_AUTH_IS_LOGOUT = "SET_USER_CURRENT_AUTH_IS_LOGOUT";
const SET_USER_CURRENT_AUTH_IS_ADMIN = "SET_USER_CURRENT_AUTH_IS_ADMIN";
const SET_USER_ONE_LIST = "SET_USER_ONE_LIST";
const SET_USER_ALL_LIST = "SET_USER_ALL_LIST";
const SET_USER_UPDATE_ONE_IN_ALL_LIST = "SET_USER_UPDATE_ONE_IN_ALL_LIST";

const defaultState = {
  currentUser: {},
  isAuth: false,
  isAdmin: false,
  listUsers: [],
  oneUser: {},
};

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_USER_CURRENT_AUTH:
      return {
        ...state,
        currentUser: action.payload,
        isAuth: true,
      };
    case SET_USER_CURRENT_AUTH_IS_ADMIN:
      return {
        ...state,
        isAdmin: true,
      };
    case SET_USER_CURRENT_AUTH_IS_LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        currentUser: {},
        isAuth: false,
        idAdmin: false,
        listUsers: [],
      };
    case SET_USER_ONE_LIST:
      return {
        ...state,
        oneUser: action.payload,
      };
    case SET_USER_ALL_LIST:
      return {
        ...state,
        listUsers: action.payload,
      };
    case SET_USER_UPDATE_ONE_IN_ALL_LIST:
      return {
        ...state,
        listUsers: state.listUsers.map((n) => (n._id === action.payload._id ? action.payload : n)),
      };

    default:
      return state;
  }
}

export const setUserCurrentAuth = (userCurrentAuth) => ({ type: SET_USER_CURRENT_AUTH, payload: userCurrentAuth });
export const setUserCurrentAuthIsAdmin = () => ({ type: SET_USER_CURRENT_AUTH_IS_ADMIN });
export const setUserCurrentAuthIsLogout = () => ({ type: SET_USER_CURRENT_AUTH_IS_LOGOUT });
export const setUserOneList = (usersOneList) => ({ type: SET_USER_ALL_LIST, payload: usersOneList });
export const setUserAllList = (usersAllList) => ({ type: SET_USER_ALL_LIST, payload: usersAllList });
export const setUserUpdateOneInAllList = (userUpdateOneInAllList) => ({ type: SET_USER_UPDATE_ONE_IN_ALL_LIST, payload: userUpdateOneInAllList });

//export const addFile = (userOne) => ({ type: SET_ONEUSER, payload: userOne });
