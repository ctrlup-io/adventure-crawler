import { getScore } from "../../api";
import type { Score, User } from "../../api/types";
import type { UserState } from "../user/types";
import { selectUser } from "../user/userSlice";
import { set, reset } from "./scoreSlice";
import { call, put, select, takeLatest } from "redux-saga/effects";

function* fetchSaga() {
  try {
    const { name, password }: UserState = yield select(selectUser);
    const score: Score = yield call(getScore, { name, password } as User);
    yield put(set(score));
  } catch (error) {
    yield put(reset());
  }
}

export default function* scoreSaga() {
  yield takeLatest("score/fetch", fetchSaga);
}
