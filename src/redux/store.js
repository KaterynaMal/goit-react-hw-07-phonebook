import { contactsReducer } from './Contacts/contactsReducer';
import { configureStore } from '@reduxjs/toolkit';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const contactsConfig = {
  key: 'contacts',
  storage,
  whitelist: ['contacts'],
  // blacklist: ['filter'],- або які не записувати в локальне сховище
};

export const store = configureStore({
  reducer: {
    contacts: persistReducer(contactsConfig, contactsReducer) ,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// -----------------------------------------------------
// import { combineReducers, createStore } from 'redux';
// import { devToolsEnhancer } from "@redux-devtools/extension";

// const rootReducer = combineReducers({
//     contacts: contactsReducer
// })

// const enhancer = devToolsEnhancer();
// export const store = createStore(rootReducer, enhancer);
