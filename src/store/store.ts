import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { encryptTransform } from 'redux-persist-transform-encrypt';

import authReducer from './features/auth/authSlide';
import gameReducer from './features/singleplayer/gameSlide';
import settingReducer from './features/singleplayer/settingSlide';

// Mã hoá dữ liệu khi lưu Redux persist
const encryptor = encryptTransform({
  secretKey: 'my-super-secret-key',
  onError: function (error) {
    console.log('Encryption Error:', error);
  },
});

// Kết hợp reducer cho singleplayer
const singleplayerReducer = combineReducers({
  game: gameReducer,
  settings: settingReducer,
});

// Kết hợp tất cả reducers
const rootReducer = combineReducers({
  auth: authReducer,
  singleplayer: singleplayerReducer,
});

// Config Redux persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'singleplayer'],
  transforms: [encryptor],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const getStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

  const persistor = persistStore(store);

  return { store, persistor };
};

// Singleton (xài cho Provider & lib dùng chung)
let storeInstance: ReturnType<typeof getStore> | null = null;

export const getStoreInstance = () => {
  if (!storeInstance) {
    storeInstance = getStore();
  }
  return storeInstance;
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof getStore>['store']['dispatch'];
