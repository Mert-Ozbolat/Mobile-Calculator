import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const BUTTON_SIZE = width * 0.2;

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },
    display: {
        flex: 0.3,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        padding: 20,
        marginBottom: 20,
    },
    displayText: {
        fontSize: 64,
        fontWeight: '300',
    },
    operatorText: {
        fontSize: 24,
        fontWeight: '400',
        marginTop: 10,
    },
    buttonContainer: {
        flex: 0.7,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    button: {
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        borderRadius: BUTTON_SIZE / 2,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        fontSize: 30,
        fontWeight: '500',
    },
    zeroButton: {
        width: BUTTON_SIZE * 2 + 10,
        alignItems: 'flex-start',
        paddingLeft: 30,
    },
}); 