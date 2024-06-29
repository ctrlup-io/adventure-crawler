import rootSaga from "./rootSaga";
import scoreReducer from "./score/scoreSlice";
import shopReducer from "./shop/shopSlice";
import userReducer from "./user/userSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "redux-saga";

const persistConfig = {
  key: "root",
  storage,
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    user: userReducer,
    score: scoreReducer,
    shop: shopReducer,
  }),
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
