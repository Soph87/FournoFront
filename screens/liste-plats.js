import React from 'react'
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import { Input, Button, Header, Card, ListItem} from 'react-native-elements';
import FlecheRetour from '../assets/images/fleche-retour.svg'

function ListePlats({navigation}) {

    const recettesListe = [
        {
        titre: 'Délicieuse tarte aux fraises',
        photo: require('../assets/images/tarte.jpg')
        },
        {
        titre: 'Quiche lorraine',
        photo: require('../assets/images/tarte.jpg')
        },
        {
        titre: 'Tarte maison aux poireaux et aux lardons',
        photo: require('../assets/images/tarte.jpg')
        },
        {
        titre: 'Tarte citron meringuée',
        photo: require('../assets/images/tarte.jpg')
        },
        {
        titre: 'Tarte au chocolat',
        photo: require('../assets/images/tarte.jpg')
        }
       ]
       
    var recettes = recettesListe.map((recette, i)=> {
        return  <Card key={i} avatar={{uri: recette.photo}} >
                    <Text> {recette.titre} </Text>        
                </Card>
    }
    );
       

    return (
        <View style={styles.global}>
            <Header
                barStyle="light-content"
                containerStyle={{ backgroundColor: '#FF5A5D', borderBottomWidth: 0 }}
                centerComponent={{ text: 'Catégorie Plats', style: { color: '#fff', fontSize: 27 } }}
            >
                <FlecheRetour width={30} height={30} fill={"white"} onPress={() => navigation.navigate('Accueil')} />
            </Header>
                
            <ScrollView style={{flex:1, marginHorizontal: 20}}>

                {recettes}

            </ScrollView>
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


export default ListePlats;