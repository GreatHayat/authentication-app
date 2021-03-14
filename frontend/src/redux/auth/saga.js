import { takeLatest, call, put, all, fork } from "redux-saga/effects";
import actions from "./actions";
import { authService } from "./services";

export function* getUsers() {
  yield takeLatest(actions.GET_USERS, function* (payload) {
    try {
      const res = yield call(authService.getUsers);
      yield put(actions.getUsersSuccess(res.data));
    } catch (error) {
      yield put(actions.getUsersFailed(error.response));
    }
  });
}

export default function* authSaga() {
  yield all([fork(getUsers)]);
}
