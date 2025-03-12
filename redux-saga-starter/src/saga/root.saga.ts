import { all } from "redux-saga/effects";
import counterSaga from "./counter.saga";
import userSaga from "./user.saga";
import blogSaga from "./blog.saga";
import authSaga from "./auth.saga";

function* RootSaga() {
  console.log("RootSaga");
  yield all([counterSaga(), userSaga(), blogSaga(), authSaga()]);
}

export default RootSaga;
