import React from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { Input, Button, Header, Image } from 'react-native-elements';
import Burger from '../assets/images/burger.svg'



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
            <View>
                <Text>Fourneaux</Text><Text>&Cie</Text>
                <Text>Bonjour Prénom, quelle recette allez-vous préparer aujourd'hui ?</Text>
            </View>
            <View>
                <View style={{display:'flex', flexDirection: 'row'}}>
                    <View>
                        <Image
                            source={require('../assets/images/entrees.png')}
                            style={{ width: '25%', height: 'auto' }}
                        />
                        <Text>Entrées</Text>
                    </View>
                    <View>
                        <Image
                            source={require('../assets/images/entrees.png')}
                            style={{ width: '25%', height: 'auto' }}
                        />
                        <Text>Entrées</Text>
                    </View>
                    <View>
                        <Image
                            source={require('../assets/images/entrees.png')}
                            style={{ width: '25%', height: 'auto' }}
                        />
                        <Text>Entrées</Text>
                    </View>
                </View>
                <Text onPress={() => navigation.navigate('ListePlats')}>+ de catégories</Text>
            </View>
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