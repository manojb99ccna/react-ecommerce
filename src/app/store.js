import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { combineReducers } from '@reduxjs/toolkit'
 
import useCartReducer from '../features/useCartSlice'
import useWishlistReducer from '../features/useWishlistSlice'
import useUserSlice from '../features/useUserSlice'

import storage from 'redux-persist/lib/storage'

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['apiProductSlice'],
}

export const rootReducers = combineReducers({
  cart: useCartReducer ,
  wishList: useWishlistReducer,
  user: useUserSlice  
})

const persistedReducer = persistReducer(persistConfig, rootReducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

setupListeners(store.dispatch)

export default store
