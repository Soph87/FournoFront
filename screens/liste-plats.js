import React from 'react'
import { Text, View, StyleSheet } from 'react-native';


function Accueil({navigation}) {
   

    return (
        <View style={styles.global}>
            <Text>Coucou je suis la la page de la liste des plats</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    global: {
        backgroundColor: "#FF5A5D",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});


export default Accueil;