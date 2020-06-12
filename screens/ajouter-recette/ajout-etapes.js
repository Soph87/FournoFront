import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableWithoutFeedback, Keyboard, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
//Redux
import { connect } from 'react-redux';
//Composants
import Input from '../../components/inputs-ajout';
//Images SVG
import FlecheRetour from '../../assets/images/icones/fleche-retour.svg';
import Home from '../../assets/images/icones/home.svg';

function Etapes({ navigation, sendEtapes }) {
    const [aDesEtapes, setADesEtapes] = useState(false)
    const [etapes, setetapes] = useState(['']);

    useEffect(() => {
        if(etapes.length >= 2) {
            setADesEtapes(true);
        } else {
            setADesEtapes(false);
        }
    }, [etapes])

    const handleEditing = (key, value, index) => {
        if(value.length >= 1 && index === etapes.length-1) {
            let newetapes = [...etapes];
            newetapes.push(value)
            setetapes(newetapes);
        } else {
            let newetapes = [...etapes];
            newetapes.splice(index, 1, value)
        }
    }

    const handleSUpp = index => {
        let etapesSupp = [...etapes];
        etapesSupp.splice(index, 1);
        setetapes(etapesSupp) 
    }

    let etapesListe = etapes.map((ingre, index) => {
        return(
            <Input 
                key={ingre} 
                value={ingre} 
                placeholder='Couper les légumes et mélanger...' 
                handleEditingParent={handleEditing} 
                keyName='affichePoubelle'
                index= {index}
                handleSuppParent = {handleSUpp}
            />
        )
    })

    const handleValider = () => {
        const etapesFinal = etapes;
        etapesFinal.shift();
        sendEtapes(etapesFinal);
        navigation.navigate('Photo')
    }

    return (
            <SafeAreaView style={styles.global}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{flex: 1}}>
                        <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS == "ios" ? "padding" : "height"}>
                            <View style={styles.header}>
                                <FlecheRetour width={30} height={30} onPress={() => navigation.goBack()} />
                                <Text style={styles.titre}>Etapes de la recette</Text>
                                <Home width={30} height={30} onPress={() => navigation.navigate('Accueil')} />
                            </View>
                            <ScrollView contentContainerStyle={{flex: 1, paddingBottom: 20}}>
                                <View style={styles.inputContainer}>
                                    {etapesListe}
                                </View>
                            </ScrollView>
                        </KeyboardAvoidingView>
                        <View style={styles.bottomNav}>
                            <Button 
                                onPress={() => handleValider()}
                                type='solid'
                                title='Valider' 
                                buttonStyle={styles.validerBtn} 
                                titleStyle={{fontFamily: "BarlowCondensed-SemiBold", fontSize: 20, color: '#FF5A5D'}}
                                disabled = {!aDesEtapes}
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
        justifyContent: 'flex-end'
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


function mapDispatchToProps(dispatch){
    return {
        sendEtapes: function(etapes){
            dispatch({type: 'ajoutEtapes', etapes})
        },
    }
}

export default connect(
    null,
    mapDispatchToProps
) (Etapes);