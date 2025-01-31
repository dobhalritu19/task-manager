import { createSlice } from '@reduxjs/toolkit';

// Initial state for tasks
const initialState = {
    tasks: [],
};

// Create a slice with actions and reducers
const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
        updateTask: (state, action) => {
            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
    },
});

// Export the actions and reducer
export const { addTask, deleteTask, updateTask } = tasksSlice.actions;
export default tasksSlice.reducer;
