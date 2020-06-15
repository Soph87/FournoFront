import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
//Redux
import { connect } from 'react-redux';
//Composants
import Input from '../../components/inputs-ajout';
//Images SVG
import FlecheRetour from '../../assets/images/icones/fleche-retour.svg';
import Home from '../../assets/images/icones/home.svg';

function Titre({ navigation, sendTitre, titreToDisplay }) {
    const [inputPlein, setInputPlein] = useState(false);

    useEffect(() => {
        if(titreToDisplay.length > 1) {
            setInputPlein(true);
        }
    }, []);

    const handleEditing = (key, value) => {
        if(value.length > 1) {
            setInputPlein(true);
            sendTitre(value);
        } else {
            setInputPlein(false);
            sendTitre(value);
        }
    }

    const handleValider = () => {
        navigation.navigate('Preparation')
    }


    return (
        <SafeAreaView style={styles.global}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{flex: 1}}>
                    <View style={styles.header}>
                        <FlecheRetour width={30} height={30} onPress={() => navigation.goBack()} />
                        <Text style={styles.titre}>Nom de la recette</Text>
                        <Home width={30} height={30} onPress={() => {navigation.navigate('Accueil');}} />
                    </View>
                    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.inputContainer}>
                        <Input 
                            valueRedux={titreToDisplay} 
                            placeholder='Tarte aux poireaux, charlotte aux fraises...' 
                            label='Nom de la recette' 
                            handleEditingParent={handleEditing}
                            multi={false} 
                        />
                    </KeyboardAvoidingView>
                    <View style={styles.bottomNav}>
                        <Button 
                            onPress={() => handleValider()}
                            type='solid'
                            title='Valider' 
                            buttonStyle={styles.validerBtn} 
                            titleStyle={{fontFamily: "BarlowCondensed-SemiBold", fontSize: 20, color: '#FF5A5D'}}
                            disabled= {!inputPlein}
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

function mapStateToProps(state) {
    return {
        titreToDisplay: state.recetteAjout.titre
    }
}

function mapDispatchToProps(dispatch){
    return {
        sendTitre: function(titre){
            dispatch({type: 'ajoutTitre', titre})
        },
        killRecette: function() {
            dispatch({type: 'killRecette'})
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (Titre);