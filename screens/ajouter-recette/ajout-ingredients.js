import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';

import { connect } from 'react-redux';

import Input from './components/inputs-ajout';
import FlecheRetour from '../../assets/images/icones/fleche-retour.svg';
import Home from '../../assets/images/icones/home.svg';

function Ingredients({ navigation, sendPrepa }) {

    const handleEditing = (key, value) => {
        console.log(typeof value)
        if(value) {
            ingredientsListe.push(<Input placeholder='3 oeufs, 100g de beurre...' handleEditingParent={handleEditing} keyName='affichePoubelle' />)
        }
    }

    const ingredientsListe = [
        <Input placeholder='3 oeufs, 100g de beurre...' handleEditingParent={handleEditing} keyName='affichePoubelle' />
    ]

    

    const handleValider = () => {
        sendPrepa({preparation: prepa, cuisson: cuisson, personne: quantite})
        navigation.navigate('Ingredients');
    }

    console.log(ingredientsListe.length)
    return (
        <SafeAreaView style={styles.global}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{flex: 1}}>

                    <View style={styles.header}>
                        <FlecheRetour width={30} height={30} onPress={() => navigation.goBack()} />
                        <Text style={styles.titre}>Ingrédients</Text>
                        <Home width={30} height={30} onPress={() => navigation.navigate('Accueil')} />
                    </View>
                    <ScrollView>
                        <View style={styles.inputContainer}>
                            {ingredientsListe}
                        </View>
                    </ScrollView>
                    <View style={styles.bottomNav}>
                        <Button 
                            onPress={() => handleValider()}
                            type='solid'
                            title='Valider' 
                            buttonStyle={styles.validerBtn} 
                            titleStyle={{fontFamily: "BarlowCondensed-SemiBold", fontSize: 20, color: '#FF5A5D'}}
                            raised
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
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
    //Input
    inputContainer: {
        flex: 1, 
    },
    //Navigation bas de page
    bottomNav: {
        alignItems: 'center',
        padding: 15
    },
    validerBtn: {
        backgroundColor: 'white',
        borderRadius: 150,
        paddingHorizontal: 30,
    }
});


function mapDispatchToProps(dispatch){
    return {
        sendPrepa: function(prepa){
            dispatch({type: 'ajoutPrepa', prepa})
        },
    }
}

export default connect(
    null,
    mapDispatchToProps
) (Ingredients);