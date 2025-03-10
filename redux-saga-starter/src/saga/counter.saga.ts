import { delay, put, takeEvery } from "redux-saga/effects";
import {
  decreaseSagaFinish,
  increaseSagaFinish,
} from "../redux/counter/counter.slide";

function* handleIncrease(action: any) {
  console.log("Handling Saga", action);
  //   yield delay(3000);
  //   yield put({
  //     type: "counter/increaseSagaFinish",
  //     payload: {
  //       value: 2,
  //     },
  //   });
  yield put(increaseSagaFinish({ value: 2 }));
}
function* handleDecrease() {
  //   yield put({
  //     type: "counter/decreaseSagaFinish",
  //     payload: {
  //       value: 2,
  //     },
  //   });
  yield put(decreaseSagaFinish({ value: 2 }));
}
function* counterSaga() {
  yield takeEvery("counter/increaseSagaStart", handleIncrease);
  yield takeEvery("counter/decreaseSagaStart", handleDecrease);
}

export default counterSaga;
