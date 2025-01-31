import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';

// Configure the Redux store using Redux Toolkit's configureStore
const store = configureStore({
    reducer: {
        tasks: tasksReducer, // Add the tasks slice here
    },
});

export default store;
