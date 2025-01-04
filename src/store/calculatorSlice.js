import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_STORAGE_KEY = '@calculator_history';

const initialState = {
    displayValue: '0',
    operator: null,
    firstValue: '',
    waitingForOperand: false,
    history: [],
};

const calculatorSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        setDisplayValue: (state, action) => {
            state.displayValue = action.payload;
        },
        setOperator: (state, action) => {
            state.operator = action.payload;
        },
        setFirstValue: (state, action) => {
            state.firstValue = action.payload;
        },
        setWaitingForOperand: (state, action) => {
            state.waitingForOperand = action.payload;
        },
        addToHistory: (state, action) => {
            state.history = [
                {
                    ...action.payload,
                    id: Date.now(),
                },
                ...state.history,
            ].slice(0, 10);
            // Geçmişi AsyncStorage'a kaydet
            AsyncStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(state.history));
        },
        clearCalculator: (state) => {
            state.displayValue = '0';
            state.operator = null;
            state.firstValue = '';
            state.waitingForOperand = false;
        },
        initializeHistory: (state, action) => {
            state.history = action.payload;
        },
    },
});

export const {
    setDisplayValue,
    setOperator,
    setFirstValue,
    setWaitingForOperand,
    addToHistory,
    clearCalculator,
    initializeHistory,
} = calculatorSlice.actions;

// Kaydedilmiş geçmişi yükle
export const loadSavedHistory = () => async (dispatch) => {
    try {
        const savedHistory = await AsyncStorage.getItem(HISTORY_STORAGE_KEY);
        if (savedHistory !== null) {
            dispatch(initializeHistory(JSON.parse(savedHistory)));
        }
    } catch (error) {
        console.log('Error loading history:', error);
    }
};

export default calculatorSlice.reducer; 