import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    // Header styles
    headerStyle: {
        backgroundColor: '#B42203',
    },
    headerTitleStyle: {
        fontWeight: 'bold',
        color: '#f4f4f4',
    },
    // Body
    body: {
        margin: 15,
        alignItems: 'center',
        fontFamily: 'Raleway'
    },
    // Form
    inputField: {
        fontSize: 20,
        fontFamily: 'Raleway',
        height: 65,
    },
    iconSelectionField: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        margin: 20,
        fontFamily: 'Raleway',
    },
    iconSectionTitle: {
        width: '100%',
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 20
    },
    iconSelectionItem: {
        margin: 15,
        fontSize: 30,
    },
    iconSelectionButtons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        margin: 30
    },
    iconSelectionButton: {
        height: 50,
        margin: 10
    },
});
