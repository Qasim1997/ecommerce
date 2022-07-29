import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import counterReducer from '../features/counter/counterSlice'
import userReducer from '../features/Auth/AuthSlice'
import pageReducer from '../features/Page Reload/PageSlice'
import { apiurl } from '../services/apiurl'
import searchReducer from '../features/search/searchSlice'
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}
const persistedReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [apiurl.reducerPath]: apiurl.reducer,
    searchField: searchReducer,
    counter: counterReducer,
    user: persistedReducer,
    page: pageReducer,
  },  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiurl.middleware),
})

