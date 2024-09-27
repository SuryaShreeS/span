// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import employeeReducer from './employeeSlice'; // Import your employee slice

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, employeeReducer);

const store = configureStore({
  reducer: {
    employee: persistedReducer,
  },
});

// Create persistor
const persistor = persistStore(store);

// Export both store and persistor
export { store, persistor };
