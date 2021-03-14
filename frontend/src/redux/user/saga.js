import { takeLatest, call, put, all, fork } from "redux-saga/effects";
import actions from "./actions";

export function* setRegisterFormData() {
  yield takeLatest(actions.SET_REGISTER_FORM_DATA, function* (payload) {
    yield put(actions.setRegisterFormDataSuccess(payload.data));
  });
}

export default function* userSaga() {
  yield all([fork(setRegisterFormData)]);
}
