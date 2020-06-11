import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import { Button } from 'react-native-elements';

import { connect } from 'react-redux';

import Input from './components/inputs-ajout';
import FlecheRetour from '../../assets/images/icones/fleche-retour.svg';
import Home from '../../assets/images/icones/home.svg';

function Photo({ navigation }) {

    return (
            <SafeAreaView style={styles.global}>
                
            </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    global: {
        flex: 1, 
        backgroundColor: "#FF5A5D",
        paddingHorizontal: 15,
        paddingTop: 30,
        position: 'relative'
    },
    //header
    header: {
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center", 
        padding: 15
    },
    titre: {
        fontFamily: "BarlowCondensed-SemiBold",
        fontSize: 20,
        color: "white"
    },
    //Navigation bas de page
    bottomNav: {
        alignItems: 'center',
        paddingBottom: 15
    },
    validerBtn: {
        backgroundColor: 'white',
        borderRadius: 150,
        paddingHorizontal: 30,
    }
});

export default Photo;