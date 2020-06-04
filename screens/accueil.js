import React from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { Input, Button, Header } from 'react-native-elements';
import Burger from '../assets/burger.svg'



function Accueil({navigation}) {
   

    return (
        <View style={styles.global}>
            <Header
                centerComponent={{ style: { color: '#fff' } }}
                barStyle="light-content"
                containerStyle={{backgroundColor: '#FF5A5D', borderBottomWidth:0}}
            >
                <Burger width={30} height={30} />
            </Header>
            <Text>Page accueil</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    global: {
        backgroundColor: "#FF5A5D",
        flex: 1,
        justifyContent: "space-between"
    }
});


export default Accueil;