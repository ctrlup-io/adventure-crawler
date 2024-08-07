import { getBackpack, updateBackpack, signIn } from "../../api";
import type { User } from "../../api/types";
import type { UserState } from "./types";
import { set, reset, register, selectUser, setBackpack } from "./userSlice";
import { type PayloadAction } from "@reduxjs/toolkit";
import { call, put, select, takeEvery, takeLatest } from "redux-saga/effects";

function* logInSaga(action: PayloadAction<User>) {
  try {
    yield put(set(action.payload));
    yield call(signIn, action.payload);
    yield put(register());
  } catch (error) {
    yield put(reset());
  }
}

function* fetchBackpackSaga() {
  try {
    const { name, password }: UserState = yield select(selectUser);
    const items: string[] = yield call(getBackpack, {
      name,
      password,
    } as User);
    yield put(setBackpack(items));
  } catch (error) {
    yield;
  }
}

function* equipSaga(action: PayloadAction<string>) {
  try {
    const { name, password, backpack }: UserState = yield select(selectUser);
    const items = [...new Set([...backpack, action.payload])];
    yield put(setBackpack(items));
    yield call(updateBackpack, { name, password } as User, items);
  } catch (error) {
    yield;
  }
}

function* disarmSaga(action: PayloadAction<string>) {
  try {
    const { name, password, backpack }: UserState = yield select(selectUser);
    const items = backpack.filter((item) => item != action.payload);
    yield put(setBackpack(items));
    yield call(updateBackpack, { name, password } as User, items);
  } catch (error) {
    yield;
  }
}

function* disarmAllSaga() {
  try {
    const { name, password }: UserState = yield select(selectUser);
    yield put(setBackpack([]));
    yield call(updateBackpack, { name, password } as User, []);
  } catch (error) {
    yield;
  }
}

export default function* userSaga() {
  yield takeLatest("user/logIn", logInSaga);
  yield takeEvery("user/backpack/equip", equipSaga);
  yield takeEvery("user/backpack/disarm", disarmSaga);
  yield takeLatest("user/backpack/disarmAll", disarmAllSaga);
  yield takeLatest("user/backpack/fetch", fetchBackpackSaga);
}
