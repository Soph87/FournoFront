import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableWithoutFeedback, Keyboard, TouchableHighlight } from 'react-native';
import { Button } from 'react-native-elements';
import Input from './components/inputs-ajout';
import FlecheRetour from '../../assets/images/icones/fleche-retour.svg';
import Home from '../../assets/images/icones/home.svg';

function Titre({ navigation }) {
    function test(){
        console.log('press')
    }
    return (
        <SafeAreaView style={styles.global}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{flex: 1}}>

                    <View style={styles.header}>
                        <FlecheRetour width={30} height={30} onPress={() => navigation.goBack()} />
                        <Text style={styles.titre}> Nom de la recette </Text>
                        <Home width={30} height={30} onPress={() => navigation.navigate('Accueil')} />
                    </View>
                    
                    <View style={styles.inputContainer}>
                        <Input placeholder='Tarte aux poireaux, charlotte aux fraises...' label='Nom de la recette' />
                    </View>
                    <View style={styles.bottomNav}>
                        <Button 
                            onPress={() => handleValider()}
                            type='solid'
                            title='Valider' 
                            buttonStyle={styles.validerBtn} 
                            titleStyle={{fontFamily: "BarlowCondensed-SemiBold", fontSize: 20, color: '#FF5A5D'}}
                            disabled
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
        justifyContent: 'center', 
        alignItems: 'center', 
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

export default Titre;