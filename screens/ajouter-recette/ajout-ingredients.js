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

function Ingredients({ navigation, sendIngredients }) {
    const [aDesIngredients, setADesIngredients] = useState(false)
    const [ingredients, setIngredients] = useState(['']);

    useEffect(() => {
        if(ingredients.length >= 2) {
            setADesIngredients(true);
        } else {
            setADesIngredients(false);
        }
    }, [ingredients])

    const handleEditing = (key, value, index) => {
        if(value.length >= 1 && index === ingredients.length-1) {
            let newIngredients = [...ingredients];
            newIngredients.push(value)
            setIngredients(newIngredients);
        } else {
            let newIngredients = [...ingredients];
            newIngredients.splice(index, 1, value)
        }
    }

    const handleSUpp = index => {
        let ingredientsSupp = [...ingredients];
        ingredientsSupp.splice(index, 1);
        setIngredients(ingredientsSupp) 
    }

    let ingredientsListe = ingredients.map((ingre, index) => {
        return(
            <Input 
                key={ingre} 
                value={ingre} 
                placeholder='3 oeufs, 100g de beurre...' 
                handleEditingParent={handleEditing} 
                keyName='affichePoubelle'
                index= {index}
                handleSuppParent = {handleSUpp}
            />
        )
    })

    const handleValider = () => {
        const ingredientsFinal = ingredients;
        ingredientsFinal.shift();
        sendIngredients(ingredientsFinal);
        navigation.navigate('Etapes')
    }

    return (
            <SafeAreaView style={styles.global}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{flex: 1}}>
                        <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS == "ios" ? "padding" : "height"}>
                            <View style={styles.header}>
                                <FlecheRetour width={30} height={30} onPress={() => navigation.goBack()} />
                                <Text style={styles.titre}>Ingrédients</Text>
                                <Home width={30} height={30} onPress={() => navigation.navigate('Accueil')} />
                            </View>
                            <ScrollView contentContainerStyle={{flex: 1, paddingBottom: 20}}>
                                <View style={styles.inputContainer}>
                                    {ingredientsListe}
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
                                disabled = {!aDesIngredients}
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
        sendIngredients: function(ingredients){
            dispatch({type: 'ajoutIngredients', ingredients})
        },
    }
}

export default connect(
    null,
    mapDispatchToProps
) (Ingredients);