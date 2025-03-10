import { call, put, takeEvery } from "redux-saga/effects";
import {
  fetchUserFailed,
  fetchUserPending,
  fetchUserSuccess,
} from "../redux/user/user.slide";
import { IUser } from "../type/backend";

const fetchUser = async () => {
  const res = await fetch("http://localhost:8000/users");
  return res.json();
};
function* handleFetchUser() {
  console.log("Fetching user...");
  try {
    const users: IUser[] = yield call(fetchUser);
    yield put(fetchUserSuccess(users));
  } catch (error) {
    yield put(fetchUserFailed());
  }
}
function* userSaga() {
  console.log(">> Running userSaga");
  yield takeEvery(fetchUserPending, handleFetchUser);
}

export default userSaga;
