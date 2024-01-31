import { contactsReducer } from './Contacts/contactsSlice';
import { configureStore } from '@reduxjs/toolkit';
import { filterReducer } from './Filter/filterSlice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: filterReducer,
  },
});

// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// const configStore = {
//   key: 'contacts',
//   storage,
//   whitelist: ['contacts'],
//   // blacklist: ['filter'],- або які не записувати в локальне сховище
// };

//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// export const persistor = persistStore(store);

// -----------------------------------------------------
// import { combineReducers, createStore } from 'redux';
// import { devToolsEnhancer } from "@redux-devtools/extension";

// const rootReducer = combineReducers({
//     contacts: contactsReducer
// })

// const enhancer = devToolsEnhancer();
// export const store = createStore(rootReducer, enhancer);
