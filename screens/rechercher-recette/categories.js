import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, SafeAreaView } from 'react-native';
import FlecheRetour from '../../assets/images/icones/fleche-retour.svg'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {connect} from 'react-redux'

function ListeCategories({ navigation, sendCategoryToRedux }) {

   const categoryList= [
        {
           nom : "entrees",
           image : require('../../assets/images/categories/Entree.png')
        },
        {
            nom : "plats",
            image : require('../../assets/images/categories/Plat.png')
         },
         {
            nom : "desserts",
            image : require('../../assets/images/categories/Dessert.png')
         },
         {
            nom : "salades",
            image : require('../../assets/images/categories/Salade.png')
         },
         {
            nom : "soupes",
            image : require('../../assets/images/categories/Soupe.png')
         },
         {
            nom : "volailles",
            image : require('../../assets/images/categories/Volaille.png')
         },
         {
            nom : "sauces",
            image : require('../../assets/images/categories/Sauce.png')
         },
         {
            nom : "poisson",
            image : require('../../assets/images/categories/Poisson.png')
         },
         {
            nom : "viandes",
            image : require('../../assets/images/categories/Viande.png')
         },
         {
            nom : "legumes",
            image : require('../../assets/images/categories/Legumes.png')
         },
         {
            nom : "boulangerie",
            image : require('../../assets/images/categories/Boulangerie.png')
         },
         {
            nom : "gateaux",
            image : require('../../assets/images/categories/Gateaux.png')
         },
         {
            nom : "confitures",
            image : require('../../assets/images/categories/Confiture.png')
         },
         {
            nom : "aperitifs",
            image : require('../../assets/images/categories/Apero.png')
         },
         {
            nom : "boissons",
            image : require('../../assets/images/categories/Boisson.png')
         },
         {
            nom : "encas",
            image : require('../../assets/images/categories/En-cas.png')
         },
         {
            nom : "pates",
            image : require('../../assets/images/categories/Pates.png')
         },
         {
            nom : "petits-dejeuner",
            image : require('../../assets/images/categories/Petit-dej.png')
         },
         {
            nom : "autres",
            image : require('../../assets/images/categories/Autre.png')
         },
   ]

   var clickCategory = (category) => {

    sendCategoryToRedux(category)
    navigation.navigate('ListePlats')
   }


    let categoryMap = categoryList.map((cat, i) => {
        
        return (
           
            <View style={styles.categories} key={i}>
                 <TouchableOpacity onPress={() => {clickCategory(cat.nom)}}>
                <Image
                
                    source={cat.image}
                    style={{ width: '100%' }}
                    resizeMode='contain'
                    
                />
                <Text style={styles.texteCat} >{cat.nom}</Text>
                </TouchableOpacity>
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

function mapDispatchToProps(dispatch){
    return {
        sendCategoryToRedux: function(category){
            dispatch({type: 'selectCat', category})
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(ListeCategories)