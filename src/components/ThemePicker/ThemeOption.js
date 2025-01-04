import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const ThemeOption = ({ theme, themeKey, isSelected, onSelect }) => {
    return (
        <TouchableOpacity
            style={[
                styles.container,
                { backgroundColor: theme.background },
                isSelected && { borderColor: theme.operator, borderWidth: 2 }
            ]}
            onPress={() => onSelect(themeKey)}
        >
            <Text style={[styles.text, { color: theme.text }]}>
                {theme.name}
            </Text>
            <View style={styles.previewContainer}>
                <View style={[styles.previewDot, { backgroundColor: theme.operator }]} />
                <View style={[styles.previewDot, { backgroundColor: theme.button }]} />
                <View style={[styles.previewDot, { backgroundColor: theme.function }]} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    text: {
        fontSize: 18,
        fontWeight: '500',
    },
    previewContainer: {
        flexDirection: 'row',
        gap: 5,
    },
    previewDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginHorizontal: 2,
    },
});

export default React.memo(ThemeOption); 