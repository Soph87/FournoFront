import React, { useState } from 'react';
import { connect } from 'react-redux'
import CheckRecette from '../rechercher-recette/components/check-recette'
// import ModifierRecette from './components/modifier-recette';


function Recapitulatif({navigation, marmitonToDisplay}) {

    return (
        <CheckRecette marmitonToDisplay={marmitonToDisplay} navigation={navigation} />
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