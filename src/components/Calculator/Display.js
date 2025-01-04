import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

const Display = React.memo(({
    value,
    operator,
    firstValue,
    theme
}) => (
    <View style={[styles.display, { backgroundColor: theme.display }]}>
        <Text
            style={[styles.displayText, { color: theme.text }]}
            numberOfLines={1}
            adjustsFontSizeToFit
        >
            {value}
        </Text>
        {operator && (
            <Text style={[styles.operatorIndicator, { color: theme.secondaryText }]}>
                {firstValue} {operator}
            </Text>
        )}
    </View>
));

export default Display; 