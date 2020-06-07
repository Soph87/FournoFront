import React from 'react'
import { View, StyleSheet, ScrollView, Image, ImageBackground, Text, SafeAreaView } from 'react-native';
import { Input, Button, Header, Card, ListItem, Avatar} from 'react-native-elements';
import FlecheRetour from '../../assets/images/icones/fleche-retour.svg'

function ListePlats({navigation}) {

    // const recettesListe = [
    //     {
    //     titre: 'Délicieuse tarte aux fraises',
    //     photo: require('../../assets/images/tarte.jpg')
    //     },
    //     {
    //     titre: 'Quiche lorraine',
    //     photo: require('../../assets/images/tarte.jpg')
    //     },
    //     {
    //     titre: 'Tarte maison aux poireaux et aux lardons',
    //     photo: require('../../assets/images/tarte.jpg')
    //     },
    //     {
    //     titre: 'Tarte citron meringuée',
    //     photo: require('../../assets/images/tarte.jpg')
    //     },
    //     {
    //     titre: 'Tarte au chocolat',
    //     photo: require('../../assets/images/tarte.jpg')
    //     }
    //    ]


    return (
        <View style={styles.global}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <FlecheRetour width={30} height={30} fill={"white"} onPress={() => { navigation.navigate('Accueil') }} />
                    <Text style={styles.titre}> Choisir une recette </Text>
                    <View />
                </View>
                <ScrollView style={{flex: 1, width: "100%"}}>
                    <View style={styles.cards}>
                        <View style={{width: 84, height: 60}}>
                            <Image source={require('../../assets/images/tarte.jpg')} style={styles.cardImages}/>
                        </View>
                        <Text style={styles.cardTexte}>
                            Tarte à la praline
                        </Text> 
                    </View>

                    <View style={styles.cards}>
                        <View style={{width: 84, height: 60}}>
                            <Image source={require('../../assets/images/tarte.jpg')} style={styles.cardImages}/>
                        </View>
                        <Text style={styles.cardTexte}>
                            Tarte aux 3 chocolats
                        </Text> 
                    </View>

                    <View style={styles.cards}>
                        <View style={{width: 84, height: 60}}>
                            <Image source={require('../../assets/images/tarte.jpg')} style={styles.cardImages}/>
                        </View>
                        <Text style={styles.cardTexte}>
                            Tarte citron meringuée (oui j'aime le sucre !)
                        </Text> 
                    </View>
                        {/* <View containerStyle={{borderRadius: 50}}>
                            <ListItem containerStyle={{marginHorizontal: 15, height: 60, borderRadius: 8, marginVertical:5, backgroundColor: "#dffde9", padding:0}}
                                titleStyle={{fontFamily: "BarlowCondensed-Regular", fontSize: 20, marginRight: 15}}
                                title="Délicieuse tarte aux fraises"

                                leftAvatar={{source: require('../../assets/images/tarte.jpg'), width:84, height: 60, borderRadius: 8}}
                                imageProps={{width: 84, height: 60, border:50}}
                                avatarStyle={{backgroundColor: "#e056fd", borderWidth: 2, borderTopLeftRadius: 21}}               
                            />
                        </View> */}
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    global: {
        flex: 1, 
        backgroundColor: "#FF5A5D",
        padding: 15
    },
    //Header
    titre: {
        fontFamily: "BarlowCondensed-SemiBold",
        fontSize: 20,
        color: "white"
    },
    //Liste des plats
    cards: {
        flex: 1, 
        flexDirection: 'row', 
        borderRadius: 8, 
        backgroundColor: "white", 
        marginTop: 10
    },
    cardImages: {
        width: 84, 
        height: 60, 
        borderBottomLeftRadius: 8, 
        borderTopLeftRadius: 8
    },
    cardTexte: {
        flex: 1, 
        width: "80%", 
        height: 60, 
        paddingHorizontal: 10,
        fontFamily: "BarlowCondensed-Regular", 
        justifyContent: "center", 
        color: "#666666", 
        fontSize: 20, 
    }
});


export default ListePlats;