import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, FlatList } from 'react-native';
import { connect } from 'react-redux'
import ConsulterRecette from '../rechercher-recette/components/consulter-recette'
import ModifierRecette from './components/modifier-recette';


function Recette({ navigation, recetteToDisplay }) {
    const [modifier, setModifier] = useState(false)

    var clickModifier = () => {
        setModifier(true)
    }

    var clickRetour = () => {
        setModifier(false)
    }

    if (modifier) {
        return (
            <ModifierRecette recetteToDisplay={recetteToDisplay} navigation={navigation} clicRetourParent={clickRetour}/>
        )
    }
    else {
        return (
            <ConsulterRecette recetteToDisplay={recetteToDisplay} navigation={navigation} clickModifierParent={clickModifier} />
        )
    }

}


function mapStateToProps(state) {
    return {
        recetteToDisplay: state.recette
    }
}


export default connect(
    mapStateToProps,
    null
)(Recette)