import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const Splash = ({ onFinish }) => {
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Scale animasyonu
        Animated.spring(scaleAnim, {
            toValue: 1,
            tension: 10,
            friction: 2,
            useNativeDriver: true,
        }).start();

        // Opacity animasyonu
        Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        // Splash screen'i 2.5 saniye sonra kapat
        const timer = setTimeout(() => {
            Animated.parallel([
                Animated.timing(opacityAnim, {
                    toValue: 0,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.spring(scaleAnim, {
                    toValue: 1.5,
                    tension: 40,
                    friction: 3,
                    useNativeDriver: true,
                }),
            ]).start(() => onFinish());
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.content,
                    {
                        transform: [{ scale: scaleAnim }],
                        opacity: opacityAnim,
                    },
                ]}
            >
                <Ionicons name="calculator" size={80} color="#fff" />
                <Text style={styles.title}>Calculator</Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        zIndex: 999,
        width: width,
        height: height,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: '#ffffff',
        fontSize: 32,
        fontWeight: 'bold',
        marginTop: 20,
    },
});

export default Splash; 