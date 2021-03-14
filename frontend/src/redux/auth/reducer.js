import actions from "./actions";

const initialState = {
  loading_users: false,
  users: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_USERS:
      return {
        ...state,
        loading_users: true,
      };

    case actions.GET_USERS_SUCCESS:
      return {
        ...state,
        loading_users: false,
        users: action.data,
      };

    case actions.GET_USERS_FAILED:
      return {
        ...state,
        loading_users: false,
      };

    default:
      return state;
  }
};

export default authReducer;
