import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';

const CalculatorButton = React.memo(({
    text,
    onPress,
    style,
    textStyle,
    theme
}) => (
    <TouchableOpacity
        style={[
            styles.buttonBase,
            { backgroundColor: theme.button },
            style,
        ]}
        onPress={onPress}
    >
        <Text style={[styles.buttonText, { color: theme.text }, textStyle]}>
            {text}
        </Text>
    </TouchableOpacity>
));

export default CalculatorButton; 