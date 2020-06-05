import React, { useEffect, useState } from 'react';
import { Text, View, Keyboard, StyleSheet, Image, KeyboardAvoidingView, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Burger from '../assets/images/burger.svg';
import Loupe from '../assets/images/loupe.svg'
import { connect } from 'react-redux'
import FlecheRetour from '../assets/images/fleche-retour.svg'
import { ScrollView } from 'react-native-gesture-handler';


function Catgeories({ navigation }) {

    const [categoryList, setCategoryList] = useState([])

    useEffect(() => {
        

        var retrieveCategories = async () => {

           
                let response = await fetch('https://protected-anchorage-65968.herokuapp.com/users/getCategories')

                response = await response.json()
    
                let copyTab = [...categoryList]
                for (let i = 0; i < response.categories.length; i++) {
                    copyTab.push(response.categories[i])
                }
                setCategoryList(copyTab)
    
            }
    
            retrieveCategories()
            


    }, [])



    let categoryMap = categoryList.map((cat, i) => {
    let image;
        switch(cat.nom){
            case "entrees" : image = require('../assets/images/entrees.png');
            break;
            case "plats" : image = require('../assets/images/entrees.png');
            break;
            case "desserts" : image = require('../assets/images/entrees.png');
            break;
            case "salades" : image = require('../assets/images/entrees.png');
            break;
            case "soupes" : image = require('../assets/images/entrees.png');
            break;
            case "volailles" : image = require('../assets/images/entrees.png');
            break;
            case "sauces" : image = require('../assets/images/entrees.png');
            break;
            case "poissons" : image = require('../assets/images/entrees.png');
            break;
            case "viandes" : image = require('../assets/images/entrees.png');
            break;
            case "legumes" : image = require('../assets/images/entrees.png');
            break;
            case "boulangerie" : image = require('../assets/images/entrees.png');
            break;
            case "gateaux" : image = require('../assets/images/entrees.png');
            break;
            case "confitures" : image = require('../assets/images/entrees.png');
            break;
            case "aperitifs" : image = require('../assets/images/entrees.png');
            break;
            case "boissons" : image = require('../assets/images/entrees.png');
            break;
            case "encas" : image = require('../assets/images/entrees.png');
            break;
            case "pates" : image = require('../assets/images/entrees.png');
            break;
            case "petits-dejeuner" : image = require('../assets/images/entrees.png');
            break;
            case "autres" : image = require('../assets/images/entrees.png');
            break;

        }
        
        return (
            <View style={styles.categories} key={i}>
            <Image
                source={image}
                style={{ width: '100%' }}
                resizeMode='contain'
            />
            <Text style={styles.texteCat}>Entrées</Text>
        </View>
        )
    })


    return (
        <View style={{ flex: 1, backgroundColor: "#FF5A5D" }}>

            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ paddingHorizontal: 15 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <View>
                            <FlecheRetour width={30} height={30} fill={"white"} onPress={() => { navigation.navigate('Accueil') }} />
                        </View>
                        <View>
                            <Text style={styles.titre}> Choisir une catégorie </Text>
                        </View>
                        <View>
                        </View>
                    </View>
                    <ScrollView>
                        <View style={{ marginTop: 20, flex: 1, flexDirection: "row", justifyContent: "center", flexWrap: "wrap" }}>
                                {categoryMap}
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({

    titre: {
        fontFamily: "BarlowCondensed-SemiBold",
        fontSize: 20,
        color: "white"
    },
    catContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        marginTop: 5
    },
    categories: {
        backgroundColor: '#FFC830',
        padding: 10,
        borderRadius: 8,
        flex: 1,
        maxWidth: 115,
        margin: 5,
        flexBasis: "30%"
    },
    catmilieu: {
        backgroundColor: '#FFC830',
        padding: 10,
        borderRadius: 8,
        flex: 1,
        //marginHorizontal: 15,
        maxWidth: 115
    },
    texteCat: {
        textAlign: 'center',
        color: '#DB0A5B',
        marginTop: 0,
        fontFamily: "BarlowCondensed-SemiBold",
        fontSize: 20
    },
});



export default Catgeories