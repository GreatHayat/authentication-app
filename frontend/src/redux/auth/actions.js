const authActions = {
  GET_USERS: "GET_USERS",
  GET_USERS_SUCCESS: "GET_USERS_SUCCESS",
  GET_USERS_FAILED: "GET_USERS_FAILED",

  getUsers: (data) => ({
    type: authActions.GET_USERS,
    data,
  }),
  getUsersSuccess: (data) => ({
    type: authActions.GET_USERS_SUCCESS,
    data,
  }),
  getUsersFailed: (data) => ({
    type: authActions.GET_USERS_FAILED,
    data,
  }),
};

export default authActions;
