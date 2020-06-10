import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, Image, ImageBackground, Text, SafeAreaView } from 'react-native';
import { Input, Button, Header, Card, ListItem, Avatar } from 'react-native-elements';
import FlecheRetour from '../../assets/images/icones/fleche-retour.svg'
import { connect } from 'react-redux'
import { TouchableOpacity } from 'react-native-gesture-handler';


function ListePlats({ navigation, catToDisplay, sendRecette }) {

    const [recettes, setRecettes] = useState([])

    useEffect(() => {

        var retrieveRecettes = async () => {
            var response = await fetch(`https://protected-anchorage-65968.herokuapp.com/getRecette?category=${catToDisplay}`)
            response = await response.json()
            setRecettes(response.recettes)
        }

        retrieveRecettes()

    }, [])

    var clickRecette = (recette) => {
        sendRecette(recette)
        navigation.navigate('Recette')
    }


    var recettesTab = recettes.map((recette, i) => {

        return (
            <TouchableOpacity onPress={() => clickRecette(recette)}>
            < View style={styles.cards} >
                <View style={{ width: 84, height: 60 }}>
                    
                    <Image source={require('../../assets/images/tarte.jpg')} style={styles.cardImages} />
                   
                </View>
                
                <Text style={styles.cardTexte}>
                    {recette.titre}
            </Text>
            
            </View >
            </TouchableOpacity>
        )
    })



    return (
        <View style={styles.global}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <FlecheRetour width={30} height={30} fill={"white"} onPress={() => { navigation.navigate('ListeCategories') }} />
                    <Text style={styles.titre}> Choisir une recette </Text>
                    <View />
                </View>
                <ScrollView style={{ flex: 1, width: "100%" }}>

                {recettesTab}

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
        width: "90%",
        height: 60,
        paddingHorizontal: 10,
        fontFamily: "BarlowCondensed-Regular",
        justifyContent: "center",
        color: "#666666",
        fontSize: 20,

    }
});


function mapStateToProps(state) {
    return {
        catToDisplay: state.category
    }
}

function mapDispatchToProps(dispatch){
    return {
        sendRecette: function(recette){
            dispatch({type: 'selectRecette', recette})
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListePlats)