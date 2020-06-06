import React from 'react'
import { View, StyleSheet, ScrollView, Image, ImageBackground, Text } from 'react-native';
import { Input, Button, Header, Card, ListItem, Avatar} from 'react-native-elements';
import FlecheRetour from '../../assets/images/fleche-retour.svg'

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
            <Header
                barStyle="light-content"
                containerStyle={{ backgroundColor: '#FF5A5D', borderBottomWidth: 0 }}
                centerComponent={{ text: 'Catégorie Plats', style: { color: '#fff', fontSize: 27 } }}
                titleStyle={{fontFamily: "BarlowCondensed-SemiBold", fontSize: 27}}
            >
                <FlecheRetour width={30} height={30} fill={"white"} onPress={() => navigation.navigate('Accueil')} />
            </Header>
                
            <ScrollView style={{flex: 1, width: "100%"}}>

                <View style={{flex: 1, flexDirection: 'row', borderRadius: 8, backgroundColor: "white", marginLeft: 15, marginRight: 15, marginTop: 10}}>
                    <View style={{width: 84, height: 60}}>
                        <Image source={require('../../assets/images/tarte.jpg')} style={{width: 84, height: 60, borderBottomLeftRadius: 8, borderTopLeftRadius: 8}}/>
                    </View>
                    <View style={{width: "80%", height: 60, paddingHorizontal: 10}}>
                        <Text style={{flex: 1, fontFamily: "BarlowCondensed-Regular", justifyContent: "center", color: "#666666", fontSize: 20, marginRight: 15}}>
                            Tarte à la praline
                        </Text> 
                    </View>
                </View>

                <View style={{flex: 1, flexDirection: 'row', borderRadius: 8, backgroundColor: "white", marginLeft: 15, marginRight: 15, marginTop: 10}}>
                    <View style={{width: 84, height: 60}}>
                        <Image source={require('../../assets/images/tarte.jpg')} style={{width: 84, height: 60, borderBottomLeftRadius: 8, borderTopLeftRadius: 8}}/>
                    </View>
                    <View style={{width: "80%", height: 60, paddingHorizontal: 10}}>
                        <Text style={{flex: 1, fontFamily: "BarlowCondensed-Regular", justifyContent: "center", color: "#666666", fontSize: 20, marginRight: 15}}>
                            Tarte aux 3 chocolats
                        </Text> 
                    </View>
                </View>

                <View style={{flex: 1, flexDirection: 'row', borderRadius: 8, backgroundColor: "white", marginLeft: 15, marginRight: 15, marginTop: 10}}>
                    <View style={{width: 84, height: 60}}>
                        <Image source={require('../../assets/images/tarte.jpg')} style={{width: 84, height: 60, borderBottomLeftRadius: 8, borderTopLeftRadius: 8}}/>
                    </View>
                    <View style={{width: "80%", height: 60, paddingHorizontal: 10}}>
                        <Text style={{flex: 1, fontFamily: "BarlowCondensed-Regular", justifyContent: "center", color: "#666666", fontSize: 20, marginRight: 15}}>
                            Tarte citron meringuée (oui j'aime le sucre !)
                        </Text> 
                    </View>
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
        </View>
    )
}

const styles = StyleSheet.create({
    global: {
        backgroundColor: "#FF5A5D",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export default ListePlats;