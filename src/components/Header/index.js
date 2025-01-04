import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';

const Header = ({ onThemePress, theme }) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity
                style={[styles.themeButton, { backgroundColor: theme.function }]}
                onPress={onThemePress}
            >
                <Text style={[styles.themeButtonText, { color: theme.text }]}>🎨</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Header; 