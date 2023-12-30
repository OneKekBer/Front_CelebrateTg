import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice'
import { combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web



const rootReducer = combineReducers({ auth: authReducer })


const persistConfig = {
   key: 'root',
   storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
   let store = configureStore({
      reducer: persistedReducer,
      devTools: true
   })
   let persistor = persistStore(store)
   return { store, persistor }
}