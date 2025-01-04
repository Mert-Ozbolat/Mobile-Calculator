import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './src/store';
import { selectTheme, selectCurrentTheme, selectIsThemePickerVisible, setThemePickerVisibility, loadSavedTheme } from './src/store/themeSlice';
import { loadSavedHistory } from './src/store/calculatorSlice';
import Header from './src/components/Header';
import Calculator from './src/components/Calculator';
import ThemePicker from './src/components/ThemePicker';
import Splash from './src/components/Splash';

const styles = {
  container: {
    flex: 1,
  }
};

const CalculatorApp = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const currentTheme = useSelector(selectCurrentTheme);
  const isThemePickerVisible = useSelector(selectIsThemePickerVisible);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    dispatch(loadSavedTheme());
    dispatch(loadSavedHistory());
  }, [dispatch]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={currentTheme === 'light' ? 'dark' : 'light'} />

      {showSplash ? (
        <Splash onFinish={() => setShowSplash(false)} />
      ) : (
        <>
          <Header
            onThemePress={() => dispatch(setThemePickerVisibility(true))}
            theme={theme}
          />

          <ThemePicker
            visible={isThemePickerVisible}
            onClose={() => dispatch(setThemePickerVisibility(false))}
            currentTheme={currentTheme}
            theme={theme}
          />

          <Calculator theme={theme} />
        </>
      )}
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <CalculatorApp />
    </Provider>
  );
}
