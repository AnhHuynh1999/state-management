import { call, fork, take } from "redux-saga/effects";
import { loginPending, logout } from "../redux/user/user.slide";
import { ILogin } from "../type/backend";
import { PayloadAction } from "@reduxjs/toolkit";

const authorize = (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("login success");
      if (email === "baoanh@gmail.com" && password === "123456") {
        localStorage.setItem("access_token", "baoanhit");
        resolve("Logged in successfully");
      } else {
        reject("Invalid email or password");
      }
    }, 5000);
  });
};

function* authSaga() {
  console.log("authSaga");
  while (true) {
    const action: PayloadAction<ILogin> = yield take(loginPending);

    // yield call(authorize, action.payload.email, action.payload.password);
    yield fork(authorize, action.payload.email, action.payload.password); // sử dụng tiến trình chạy song song
    yield take(logout);

    // if (token) {
    //   yield call(applyMiddleware.storeItem, { token });
    //   yield take("LOGOUT");
    //   yield call(Api.clearItem, "token");
    // }
  }
}
export default authSaga;
