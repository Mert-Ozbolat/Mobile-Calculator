import React, { useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, Animated, ScrollView, Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import { setCurrentTheme } from '../../store/themeSlice';
import { styles } from './styles';
import { themes } from '../../constants/themes';
import ThemeOption from './ThemeOption';
import { Ionicons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

const ThemePicker = ({ visible, onClose, currentTheme, theme }) => {
    const dispatch = useDispatch();
    const translateY = React.useRef(new Animated.Value(-height)).current;

    useEffect(() => {
        if (visible) {
            Animated.spring(translateY, {
                toValue: 0,
                useNativeDriver: true,
                tension: 65,
                friction: 10
            }).start();
        } else {
            Animated.timing(translateY, {
                toValue: -height,
                duration: 250,
                useNativeDriver: true
            }).start();
        }
    }, [visible]);

    const handleThemeSelect = (themeKey) => {
        dispatch(setCurrentTheme(themeKey));
        onClose();
    };

    return (
        <Modal
            transparent
            visible={visible}
            animationType="none"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <Animated.View
                    style={[
                        styles.container,
                        {
                            transform: [{ translateY }],
                            backgroundColor: theme.background
                        }
                    ]}
                >
                    <View style={styles.header}>
                        <View style={styles.headerContent}>
                            <Ionicons
                                name="color-palette"
                                size={24}
                                color={theme.text}
                                style={styles.headerIcon}
                            />
                            <Text style={[styles.title, { color: theme.text }]}>
                                Appearance
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={onClose}
                        >
                            <Ionicons
                                name="close"
                                size={24}
                                color={theme.text}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.divider} />
                    <ScrollView
                        style={styles.list}
                        showsVerticalScrollIndicator={false}
                    >
                        {Object.entries(themes).map(([key, themeOption]) => (
                            <ThemeOption
                                key={key}
                                themeKey={key}
                                theme={themeOption}
                                isSelected={currentTheme === key}
                                onSelect={handleThemeSelect}
                            />
                        ))}
                    </ScrollView>
                </Animated.View>
            </View>
        </Modal>
    );
};

export default React.memo(ThemePicker); 