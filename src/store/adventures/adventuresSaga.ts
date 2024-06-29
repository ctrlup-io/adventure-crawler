import { getAdventures } from "../../api";
import type { User } from "../../api/types";
import type { UserState } from "../user/types";
import { selectUser } from "../user/userSlice";
import { set, reset } from "./adventureSlice";
import type { Adventure } from "./types";
import { call, put, select, takeLatest } from "redux-saga/effects";

function* fetchSaga() {
  try {
    const { name, password }: UserState = yield select(selectUser);
    const items: Adventure[] = yield call(getAdventures, {
      name,
      password,
    } as User);
    yield put(set(items));
    yield put({ type: "adventures/fetch" });
  } catch (error) {
    yield put(reset());
  }
}

export default function* adventuresSaga() {
  yield takeLatest("shop/fetch", fetchSaga);
}
