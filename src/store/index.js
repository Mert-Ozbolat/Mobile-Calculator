import { configureStore } from '@reduxjs/toolkit';
import calculatorReducer from './calculatorSlice';
import themeReducer from './themeSlice';

export const store = configureStore({
    reducer: {
        calculator: calculatorReducer,
        theme: themeReducer,
    },
}); 