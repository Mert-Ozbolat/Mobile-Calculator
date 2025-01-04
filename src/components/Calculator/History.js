import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { styles } from './styles';

const History = React.memo(({ history, theme }) => (
    <ScrollView style={styles.historyContainer}>
        {history.map((item) => (
            <View key={item.id} style={styles.historyItem}>
                <Text style={[styles.historyCalculation, { color: theme.secondaryText }]}>
                    {item.calculation}
                </Text>
                <Text style={[styles.historyResult, { color: theme.text }]}>
                    = {item.result}
                </Text>
            </View>
        ))}
    </ScrollView>
));

export default History; 