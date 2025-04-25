import {StyleSheet} from "react-native";
import { theme } from './theme';

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
    heading: {
        fontSize: theme.typography.fontSize.lg,
        fontWeight: theme.typography.fontWeight.bold,
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
});




