import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    bottomBarStyle: {
        borderTopColor: 'lightgrey',
        borderTopWidth: 1,
    },
    topBarStyle: {
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1,
    },
    barsStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'snow',
        height: 36,
        paddingLeft: 10,
        paddingRight: 10,
    },
    itemRowStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        height: 50,
    },
    radioStyle: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: 20,
        height: 20,
        marginRight: 7,
        borderColor: 'grey',
        borderRadius: 20,
        borderWidth: 2,
    },
    radioActiveStyle: {
        backgroundColor: 'green',
        borderWidth: 2,
        borderColor: 'lightgrey',
    },
    itemTextStyle: {
        fontSize: 18,
        textAlign: 'justify',
    },
});

module.exports = styles;
