import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, Image, Text, SafeAreaView } from 'react-native';
import FlecheRetour from '../../assets/images/icones/fleche-retour.svg';
import { connect } from 'react-redux';
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
        fontSize: 27,
        color: "white"
    },
    //Liste des plats
    cards: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 8,
        backgroundColor: "white",
        marginTop: 10,
        alignItems: "center"
    },
    cardImages: {
        width: 84,
        height: 60,
        borderBottomLeftRadius: 8,
        borderTopLeftRadius: 8
    },
    cardTexte: {
        flex: 1,
        width: "100%",
        paddingHorizontal: 10,
        fontFamily: "BarlowCondensed-Regular",
        color: "#666666",
        fontSize: 20,
        alignItems: "center",
        justifyContent: "center"

    }
});


function mapStateToProps(state) {
    return {
        catToDisplay: state.category
    }
}

function mapDispatchToProps(dispatch) {
    return {
        sendRecette: function (recette) {
            dispatch({ type: 'selectRecette', recette })
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ListePlats)