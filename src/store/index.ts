import adventuresReducer from "./adventures/adventureSlice";
import rootSaga from "./rootSaga";
import scoreReducer from "./score/scoreSlice";
import shopReducer from "./shop/shopSlice";
import userReducer from "./user/userSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
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
    adventures: adventuresReducer,
  }),
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
