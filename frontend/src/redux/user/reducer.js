import { Map } from "immutable";
import actions from "./actions";

const initialState = new Map({
  register_form_data: {},
  register_form_errors: {},
});

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_REGISTER_FORM_DATA_SUCCESS:
      return state
        .set("register_form_data", Object.assign({}, action.data.form))
        .set("register_form_errors", Object.assign({}, action.data.errors));

    default:
      return state;
  }
};

export default userReducer;
