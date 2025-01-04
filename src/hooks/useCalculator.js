import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setDisplayValue,
    setOperator,
    setFirstValue,
    setWaitingForOperand,
    addToHistory,
    clearCalculator,
} from '../store/calculatorSlice';

export const useCalculator = () => {
    const dispatch = useDispatch();
    const { displayValue, operator, firstValue, waitingForOperand, history } = useSelector(
        (state) => state.calculator
    );

    // Sayı formatlama fonksiyonu - uzun sayıları destekleyecek şekilde güncellendi
    const formatNumber = (num) => {
        if (num === 'Error') return num;

        // Bilimsel gösterimden normal gösterime çevir
        let normalizedNum = typeof num === 'number' ? num.toString() : num;
        if (normalizedNum.includes('e')) {
            normalizedNum = Number(normalizedNum).toLocaleString('fullwide', { useGrouping: false });
        }

        let [integer, decimal] = normalizedNum.split('.');

        // Binlik ayırıcıları ekle
        integer = integer.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        if (decimal) {
            return `${integer},${decimal}`;
        }
        return integer;
    };

    const handleNumberPress = useCallback(
        (num) => {
            // Maksimum 16 basamağa izin ver (nokta hariç)
            const currentValue = waitingForOperand ? '' : displayValue;
            const newValue = currentValue + num.toString();
            const digitCount = newValue.replace(/[.,]/g, '').length;

            if (num === '.' && displayValue.includes('.')) return;
            if (digitCount > 16) return; // Maksimum basamak kontrolü

            if (waitingForOperand) {
                dispatch(setDisplayValue(num === '.' ? '0.' : num.toString()));
                dispatch(setWaitingForOperand(false));
            } else {
                const newDisplayValue = displayValue === '0' && num !== '.'
                    ? num.toString()
                    : displayValue + num;
                dispatch(setDisplayValue(newDisplayValue));
            }
        },
        [displayValue, waitingForOperand, dispatch]
    );

    const handleOperatorPress = useCallback(
        (op) => {
            if (operator && !waitingForOperand) {
                handleEqual();
            } else {
                dispatch(setFirstValue(displayValue));
            }
            dispatch(setOperator(op));
            dispatch(setWaitingForOperand(true));
        },
        [operator, waitingForOperand, displayValue, dispatch]
    );

    const handleEqual = useCallback(() => {
        if (!operator || waitingForOperand) return;

        const first = parseFloat(firstValue.replace(/\./g, '').replace(',', '.'));
        const second = parseFloat(displayValue.replace(/\./g, '').replace(',', '.'));
        let result = 0;

        switch (operator) {
            case '+':
                result = first + second;
                break;
            case '-':
                result = first - second;
                break;
            case '×':
                result = first * second;
                break;
            case '÷':
                result = second !== 0 ? first / second : 'Error';
                break;
        }

        // Sonucu formatla - tüm ondalık basamakları koru
        const formattedResult = typeof result === 'number'
            ? formatNumber(result.toString())
            : result;

        const calculation = `${formatNumber(first)} ${operator} ${formatNumber(second)}`;
        dispatch(addToHistory({ calculation, result: formattedResult }));
        dispatch(setDisplayValue(formattedResult));
        dispatch(setOperator(null));
        dispatch(setFirstValue(''));
        dispatch(setWaitingForOperand(true));
    }, [operator, waitingForOperand, firstValue, displayValue, dispatch]);

    const handleClear = useCallback(() => {
        dispatch(clearCalculator());
    }, [dispatch]);

    return {
        displayValue: formatNumber(displayValue),
        operator,
        firstValue: formatNumber(firstValue),
        history,
        handleNumberPress,
        handleOperatorPress,
        handleEqual,
        handleClear,
    };
}; 