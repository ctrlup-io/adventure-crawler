import { getItems } from "../../api";
import type { Item, User } from "../../api/types";
import { UserState } from "../user/types";
import { selectUser } from "../user/userSlice";
import { set, reset } from "./shopSlice";
import { call, put, select, takeLatest } from "redux-saga/effects";

function* fetchSaga() {
  try {
    const { name, password }: UserState = yield select(selectUser);
    const items: Item[] = yield call(getItems, { name, password } as User);
    yield put(set(items));
    yield put({ type: "user/backpack/fetch" });
  } catch (error) {
    yield put(reset());
  }
}

export default function* shopSaga() {
  yield takeLatest("shop/fetch", fetchSaga);
}
