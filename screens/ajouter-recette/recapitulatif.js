import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux'
import CheckRecette from '../rechercher-recette/components/check-recette'


function Recapitulatif({navigation, marmitonToDisplay}) {
    const [modifier, setModifier] = useState(false)

    var clickRetour = () => {
        setModifier(false)
    }

    return (

        <CheckRecette marmitonToDisplay={marmitonToDisplay} navigation={navigation} clicRetourParent={clickRetour} />
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