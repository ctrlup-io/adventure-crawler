import adventuresSaga from "./adventures/adventuresSaga";
import scoreSaga from "./score/scoreSaga";
import shopSaga from "./shop/shopSaga";
import userSaga from "./user/userSaga";
import { all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([userSaga(), scoreSaga(), shopSaga(), adventuresSaga()]);
}
