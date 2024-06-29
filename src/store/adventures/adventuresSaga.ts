import { exploreAdventure, getAdventures } from "../../api";
import type { Log, User } from "../../api/types";
import type { UserState } from "../user/types";
import { insertLog, selectUser } from "../user/userSlice";
import { set, reset } from "./adventureSlice";
import type { Adventure } from "./types";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects";

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
    console.log(error);
    yield;
  }
}

export default function* adventuresSaga() {
  yield takeLatest("adventures/fetch", fetchSaga);
  yield takeEvery("adventures/explore", exploreSaga);
}
