import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useCalculator } from '../../hooks/useCalculator';
import { styles } from './styles';

const Calculator = ({ theme }) => {
    const {
        displayValue,
        operator,
        firstValue,
        history,
        handleNumberPress,
        handleOperatorPress,
        handleEqual,
        handleClear,
    } = useCalculator();

    const renderButton = (text, onPress, buttonStyle = {}, textStyle = {}) => (
        <TouchableOpacity
            style={[
                styles.button,
                { backgroundColor: theme.button },
                buttonStyle,
            ]}
            onPress={onPress}
        >
            <Text style={[styles.buttonText, { color: theme.text }, textStyle]}>
                {text}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={[styles.display, { backgroundColor: theme.display }]}>
                <Text style={[styles.displayText, { color: theme.text }]}>
                    {displayValue}
                </Text>
                {operator && (
                    <Text style={[styles.operatorText, { color: theme.secondaryText }]}>
                        {firstValue} {operator}
                    </Text>
                )}
            </View>

            <View style={styles.buttonContainer}>
                <View style={styles.row}>
                    {renderButton('C', handleClear, { backgroundColor: theme.function })}
                    {renderButton('±', () => { }, { backgroundColor: theme.function })}
                    {renderButton('%', () => { }, { backgroundColor: theme.function })}
                    {renderButton('÷', () => handleOperatorPress('÷'), { backgroundColor: theme.operator })}
                </View>

                <View style={styles.row}>
                    {renderButton('7', () => handleNumberPress(7))}
                    {renderButton('8', () => handleNumberPress(8))}
                    {renderButton('9', () => handleNumberPress(9))}
                    {renderButton('×', () => handleOperatorPress('×'), { backgroundColor: theme.operator })}
                </View>

                <View style={styles.row}>
                    {renderButton('4', () => handleNumberPress(4))}
                    {renderButton('5', () => handleNumberPress(5))}
                    {renderButton('6', () => handleNumberPress(6))}
                    {renderButton('-', () => handleOperatorPress('-'), { backgroundColor: theme.operator })}
                </View>

                <View style={styles.row}>
                    {renderButton('1', () => handleNumberPress(1))}
                    {renderButton('2', () => handleNumberPress(2))}
                    {renderButton('3', () => handleNumberPress(3))}
                    {renderButton('+', () => handleOperatorPress('+'), { backgroundColor: theme.operator })}
                </View>

                <View style={styles.row}>
                    {renderButton('0', () => handleNumberPress(0), styles.zeroButton)}
                    {renderButton('.', () => handleNumberPress('.'))}
                    {renderButton('=', handleEqual, { backgroundColor: theme.operator })}
                </View>
            </View>
        </View>
    );
};

export default Calculator; 