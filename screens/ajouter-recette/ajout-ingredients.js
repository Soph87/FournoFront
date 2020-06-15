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

function Ingredients({ navigation, addIngredient, ingredientsToDisplay }) {
    const [aDesIngredients, setADesIngredients] = useState(false);
    const [ingredients, setIngredients] = useState(ingredientsToDisplay);


    useEffect(() => {
        if(ingredientsToDisplay.length >= 2) {
            setADesIngredients(true);
        } else {
            setADesIngredients(false);
        }
    }, [ingredientsToDisplay])



    const handleEditing = (key, value, index) => {
        if(value.length >= 1) {
            addIngredient(value);
            const test = [...ingredients];
            test.push(value);
            setIngredients(test);
        }
    }

    const handleSUpp = index => {
         
    }

    let ingredientsListe = ingredients.map((ingre, index) => {
        return(
            <Input 
                key={ingre} 
                valueRedux={ingre} 
                placeholder='3 oeufs, 100g de beurre...' 
                handleEditingParent={handleEditing} 
                keyName='affichePoubelle'
                index= {index}
                handleSuppParent = {handleSUpp}
            />
        )
    })

    const handleValider = () => {
        navigation.navigate('Etapes')
    }

    const handleBack = () => {
        navigation.goBack()
    }

    return (
            <SafeAreaView style={styles.global}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{flex: 1}}>
                        <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS == "ios" ? "padding" : "height"}>
                            <View style={styles.header}>
                                <FlecheRetour width={30} height={30} onPress={() => handleBack()} />
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
function mapStateToProps(state) {
    return {
        ingredientsToDisplay: state.recetteAjout.ingredients
    }
}

function mapDispatchToProps(dispatch){
    return {
        addIngredient: function(ingredient){
            dispatch({type: 'ajoutIngredient', ingredient})
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
) (Ingredients);