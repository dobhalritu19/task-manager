// import { configureStore } from '@reduxjs/toolkit';
// import tasksReducer from './tasksSlice';

// // Configure the Redux store using Redux Toolkit's configureStore
// const store = configureStore({
//     reducer: {
//         tasks: tasksReducer, // Add the tasks slice here
//     },
// });

// export default store;


import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import tasksReducer from './tasksSlice';

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, tasksReducer);

const store = configureStore({
    reducer: {
        tasks: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);
export default store;
