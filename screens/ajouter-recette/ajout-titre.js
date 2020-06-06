import React from 'react';
import { View, Text } from 'react-native';

function Titre({navigation}) {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Page pour ajouter un titre à la recette</Text>
        </View>
    )
}


export default Titre;