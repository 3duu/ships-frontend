import {StyleSheet} from "react-native";
import { theme } from './theme';

const buttonBase = {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
};

export const globalStyles = StyleSheet.create({
    title: {
        fontSize: 22,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    label: {
        marginTop: 16,
        marginBottom: 8,
        fontWeight: '600',
    },
    input: {
        padding: 12,
        backgroundColor: '#eee',
        borderRadius: 8,
    },
    row: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 12,
    },
    option: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    selected: {
        backgroundColor: '#dceeff',
        borderColor: '#1f45ef',
    },
    footer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    screen: {
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingHorizontal: theme.spacing.md,
        paddingTop: theme.spacing.lg,
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading1: {
        fontSize: theme.typography.fontSize.lg,
        /*fontWeight: theme.typography.fontWeight.bold,*/
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
    },
    text: {
        fontSize: theme.typography.fontSize.md,
        color: theme.colors.text,
    },
    link: {
        textDecorationLine: 'underline',
        color: theme.colors.orange,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        paddingTop: 60,
    },
    register: {
        color: '#fff',
        marginTop: 10,
        textAlign: 'center',
    },
    bg: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        padding: 24,
        paddingBottom: 48,
        backgroundColor: 'rgba(0,0,0,0.4)', // Optional: keeps content readable
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'flex-end',
    },
    bottom: {
        padding: 24,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    button: {
        backgroundColor: theme.colors.primary,
        paddingVertical: buttonBase.paddingVertical,
        paddingHorizontal: buttonBase.paddingHorizontal,
        borderRadius: buttonBase.borderRadius,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    buttonDynamic: {
        paddingVertical: buttonBase.paddingVertical,
        paddingHorizontal: buttonBase.paddingHorizontal,
        borderRadius: buttonBase.borderRadius,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    disabledButton: {
        backgroundColor: theme.colors.gray,
    },
    enabledButton: {
        backgroundColor: theme.colors.primary,
    },
    disabledText: {
        color: '#666666',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    activeDot: {
        backgroundColor: theme.colors.primary,
    },
    inactiveDot: {
        backgroundColor: theme.colors.gray,
    },
    stepIndicatorContainer: {
        position: 'absolute',
        top: 60,
        width: '100%',
        alignItems: 'center',
        zIndex: 2,
    },
    formContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 120, // so form doesn't overlap with step dots
    },
    dateButton: {
        backgroundColor: '#fff',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 16,
    },
    dateButtonText: {
        color: '#999',
    },
    optionSelected: {
        backgroundColor: '#dceeff',
        borderColor: '#1f45ef',
        borderWidth: 1,
    },
    scrollContent: {
        padding: 24,
        flexGrow: 1,
    }
});




