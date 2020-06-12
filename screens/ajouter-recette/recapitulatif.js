import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux'
import CheckRecette from '../rechercher-recette/components/check-recette'
// import ModifierRecette from './components/modifier-recette';


function Recapitulatif({navigation, marmitonToDisplay}) {
// console.log('debut')
// console.log(marmitonToDisplay.recette.preparation)
    return (

        <CheckRecette marmitonToDisplay={marmitonToDisplay} navigation={navigation} />

        // <View style={{flex:1}}>
        //     <Text> Nom : {marmitonToDisplay.recette.nom}</Text>
        //     <Text> Ingrédients : {marmitonToDisplay.recette.ingredients}</Text>
        //     <Text> Nombre de personnes : {marmitonToDisplay.recette.nbPers}</Text>
        //     <Text> Preparation : {marmitonToDisplay.recette.preparation}</Text>
        //     <Text> Temps cuisson : {marmitonToDisplay.recette.temps.cuisson}</Text>
        //     <Text> Temps préparation : {marmitonToDisplay.recette.temps.preparation}</Text>
        //     <Text> Temps total : {marmitonToDisplay.recette.temps.total}</Text>
        // </View>
    )
}


function mapStateToProps(state) {
    return {
        marmitonToDisplay: state.newRecette
    }
}


export default connect(
    mapStateToProps,
    null
)(Recapitulatif)