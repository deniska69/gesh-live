const SET_ALLNEWS = "SET_ALLNEWS";

const defaultState = {
  listNews: [],
};

export default function newsReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_ALLNEWS:
      return {
        ...state,
        listNews: action.payload,
      };
    default:
      return state;
  }
}
export const setAllNews = (news) => ({ type: SET_ALLNEWS, payload: news });
