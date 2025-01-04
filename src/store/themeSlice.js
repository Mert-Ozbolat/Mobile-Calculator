import { createSlice } from '@reduxjs/toolkit';
import { themes } from '../constants/themes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_STORAGE_KEY = '@calculator_theme';

const initialState = {
    currentTheme: 'dark',
    isThemePickerVisible: false,
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        setCurrentTheme: (state, action) => {
            state.currentTheme = action.payload;
            // Theme'i AsyncStorage'a kaydet
            AsyncStorage.setItem(THEME_STORAGE_KEY, action.payload);
        },
        setThemePickerVisibility: (state, action) => {
            state.isThemePickerVisible = action.payload;
        },
        initializeTheme: (state, action) => {
            state.currentTheme = action.payload;
        },
    },
});

export const { setCurrentTheme, setThemePickerVisibility, initializeTheme } = themeSlice.actions;

export const selectTheme = (state) => themes[state.theme.currentTheme];
export const selectCurrentTheme = (state) => state.theme.currentTheme;
export const selectIsThemePickerVisible = (state) => state.theme.isThemePickerVisible;

// Kaydedilmiş temayı yükle
export const loadSavedTheme = () => async (dispatch) => {
    try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme !== null) {
            dispatch(initializeTheme(savedTheme));
        }
    } catch (error) {
        console.log('Error loading theme:', error);
    }
};

export default themeSlice.reducer; 