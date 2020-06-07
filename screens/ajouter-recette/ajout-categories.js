import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, SafeAreaView } from 'react-native';
import FlecheRetour from '../../assets/images/icones/fleche-retour.svg'
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
            case "entrees" : image = require('../../assets/images/categories/entrees.png');
            break;
            case "plats" : image = require('../../assets/images/categories/entrees.png');
            break;
            case "desserts" : image = require('../../assets/images/categories/entrees.png');
            break;
            case "salades" : image = require('../../assets/images/categories/entrees.png');
            break;
            case "soupes" : image = require('../../assets/images/categories/entrees.png');
            break;
            case "volailles" : image = require('../../assets/images/categories/entrees.png');
            break;
            case "sauces" : image = require('../../assets/images/categories/entrees.png');
            break;
            case "poissons" : image = require('../../assets/images/categories/entrees.png');
            break;
            case "viandes" : image = require('../../assets/images/categories/entrees.png');
            break;
            case "legumes" : image = require('../../assets/images/categories/entrees.png');
            break;
            case "boulangerie" : image = require('../../assets/images/categories/entrees.png');
            break;
            case "gateaux" : image = require('../../assets/images/categories/entrees.png');
            break;
            case "confitures" : image = require('../../assets/images/categories/entrees.png');
            break;
            case "aperitifs" : image = require('../../assets/images/categories/entrees.png');
            break;
            case "boissons" : image = require('../../assets/images/categories/entrees.png');
            break;
            case "encas" : image = require('../../assets/images/categories/entrees.png');
            break;
            case "pates" : image = require('../../assets/images/categories/entrees.png');
            break;
            case "petits-dejeuner" : image = require('../../assets/images/categories/entrees.png');
            break;
            case "autres" : image = require('../../assets/images/categories/entrees.png');
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
        <View style={styles.global}>
            <SafeAreaView style={{ flex: 1 }}>
                <View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <FlecheRetour width={30} height={30} fill={"white"} onPress={() => { navigation.navigate('Accueil') }} />
                        <Text style={styles.titre}> Choisir une catégorie </Text>
                        <View/>
                    </View>
                    <ScrollView>
                        <View style={styles.catContainer}>
                                {categoryMap}
                        </View>
                    </ScrollView>
                </View>
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
    //header
    titre: {
        fontFamily: "BarlowCondensed-SemiBold",
        fontSize: 20,
        color: "white"
    },
    //Liste des catégories
    catContainer: {
        marginTop: 15,
        marginBottom: 30,
        flexDirection: "row",
        justifyContent: 'space-between', 
        flexWrap: "wrap",
        width: '100%'
    },
    categories: {
        backgroundColor: '#FFC830',
        padding: 10,
        borderRadius: 8,
        width: "33%",
        maxWidth: 120,
        marginBottom: 15
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