import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
//Redux
import { connect } from 'react-redux';
//Composants
import Input from '../../components/inputs-ajout';
//Images SVG
import FlecheRetour from '../../assets/images/icones/fleche-retour.svg';
import Home from '../../assets/images/icones/home.svg';

function Preparation({ navigation, sendPrepa, infosToDisplay }) {
    const [prepa, setPrepa] = useState('');
    const [cuisson, setCuisson] = useState('');
    const [quantite, setQuantite] = useState('');

    const handleEditing = (key, value) => {
        if(key === 'prepa') {
            setPrepa(value);
        } else if (key === 'cuisson') {
            setCuisson(value);
        } else {
            setQuantite(value)
        }
    }

    const handleValider = () => {
        sendPrepa({preparation: prepa, cuisson: cuisson, personne: quantite})
        navigation.navigate('Ingredients');
    }


    return (
        <SafeAreaView style={styles.global}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{flex: 1}}>
                    <View style={styles.header}>
                        <FlecheRetour width={30} height={30} onPress={() => navigation.goBack()} />
                        <Text style={styles.titre}>Infos recette</Text>
                        <Home width={30} height={30} onPress={() => navigation.navigate('Accueil')} />
                    </View>
                    <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.inputContainer}>
                        <Input 
                            keyName='prepa' 
                            placeholder='10 min' 
                            label='Temps de préparation (optionnel)' 
                            handleEditingParent={handleEditing} 
                            valueRedux={infosToDisplay.preparation}
                        />
                        <Input 
                            keyName='cuisson' 
                            placeholder='30 min' 
                            label='Temps de cuisson (optionnel)' 
                            handleEditingParent={handleEditing}
                            valueRedux={infosToDisplay.cuisson}
                        />
                        <Input 
                            keyName='quantite' 
                            placeholder='4 personnes' 
                            label='Quantité (optionnel)' 
                            handleEditingParent={handleEditing} 
                            valueRedux={infosToDisplay.personne}
                        />
                    </KeyboardAvoidingView>
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
        infosToDisplay: state.recetteAjout.prepa
    }
}

function mapDispatchToProps(dispatch){
    return {
        sendPrepa: function(prepa){
            dispatch({type: 'ajoutPrepa', prepa})
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (Preparation);