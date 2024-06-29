import { exploreAdventure, getAdventures } from "../../api";
import type { Log, User } from "../../api/types";
import type { UserState } from "../user/types";
import { insertLog, selectUser } from "../user/userSlice";
import { set, reset, selectAdventures } from "./adventureSlice";
import type { Adventure, AdventureState } from "./types";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  all,
  call,
  put,
  select,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";

function* fetchSaga() {
  try {
    const { name, password }: UserState = yield select(selectUser);
    const items: Adventure[] = yield call(getAdventures, {
      name,
      password,
    } as User);
    yield put(set(items));
  } catch (error) {
    yield put(reset());
  }
}

function* exploreSaga(action: PayloadAction<string>) {
  try {
    const { name, password }: UserState = yield select(selectUser);
    const log: Log = yield call(
      exploreAdventure,
      { name, password } as User,
      action.payload,
    );
    yield put(
      insertLog({
        ...log,
        adventure: action.payload,
        createdAt: new Date().toUTCString(),
      }),
    );
  } catch (error) {
    yield;
  }
}

function* exploreAllSaga() {
  try {
    const adventures: AdventureState = yield select(selectAdventures);
    yield all(
      adventures.map((adventure) =>
        put({ type: "adventures/explore", payload: adventure.name }),
      ),
    );
  } catch (error) {
    yield;
  }
}

export default function* adventuresSaga() {
  yield takeLatest("adventures/fetch", fetchSaga);
  yield takeEvery("adventures/explore", exploreSaga);
  yield takeLatest("adventures/exploreAll", exploreAllSaga);
}
