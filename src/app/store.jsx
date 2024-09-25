import { configureStore,combineReducers } from "@reduxjs/toolkit";
import userReducer from "../features/current/currentUserSlice";
import darkModeReducer from '../features/darkmode/darkmodeSlice'
import {persistReducer,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER} from "redux-persist";
import storage from 'redux-persist/lib/storage'
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer=combineReducers({
  user:userReducer,
  darkMode:darkModeReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor=persistStore(store)