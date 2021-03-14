const userActions = {
  SET_REGISTER_FORM_DATA: "SET_REGISTER_FORM_DATA",
  SET_REGISTER_FORM_DATA_SUCCESS: "SET_REGISTER_FORM_DATA_SUCCESS",

  setRegisterFormData: (data) => ({
    type: userActions.SET_REGISTER_FORM_DATA,
    data,
  }),
  setRegisterFormDataSuccess: (data) => ({
    type: userActions.SET_REGISTER_FORM_DATA_SUCCESS,
    data,
  }),
};

export default userActions;
