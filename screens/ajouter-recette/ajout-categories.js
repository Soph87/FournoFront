import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

import FlecheRetour from '../../assets/images/icones/fleche-retour.svg';
import CatCard from './components/cat-card';


function AjoutCategorie({ navigation }) {
    const [estSelectionne, setEstSelectionne] = useState(false);
    const [listeCat, setListeCat] = useState([]);

    useEffect(() => {
        if(listeCat.length >= 1) {
            setEstSelectionne(true);
        } else {
            setEstSelectionne(false)
        }
    }, [listeCat])

    let categories = [
        {titre: 'Entrées', image: require('../../assets/images/categories/entrees.png')},
        {titre: 'Plats', image: require('../../assets/images/categories/Plat.png')},
        {titre: 'Desserts', image: require('../../assets/images/categories/Dessert.png')},
        {titre: 'Petits-déj', image: require('../../assets/images/categories/Petit-dej.png')},
        {titre: 'Salades', image: require('../../assets/images/categories/Salade.png')},
        {titre: 'Soupes', image: require('../../assets/images/categories/Soupe.png')},
        {titre: 'Viandes', image: require('../../assets/images/categories/Viande.png')},
        {titre: 'Volailles', image: require('../../assets/images/categories/Volaille.png')},
        {titre: 'Poissons', image: require('../../assets/images/categories/Poisson.png')},
        {titre: 'Légumes', image: require('../../assets/images/categories/Legumes.png')},
        {titre: 'Pâtes', image: require('../../assets/images/categories/Pates.png')},
        {titre: 'Sauces', image: require('../../assets/images/categories/Sauce.png')},
        {titre: 'Gâteaux', image: require('../../assets/images/categories/Gateaux.png')},
        {titre: 'En-cas', image: require('../../assets/images/categories/En-cas.png')},
        {titre: 'Confitures', image: require('../../assets/images/categories/Confiture.png')},
        {titre: 'Boulangerie', image: require('../../assets/images/categories/Boulangerie.png')},
        {titre: 'Apéritifs', image: require('../../assets/images/categories/Apero.png')},
        {titre: 'Boissons', image: require('../../assets/images/categories/Boisson.png')},
        {titre: 'Autres', image: require('../../assets/images/categories/Autre.png')},
    ]

    const handlePress = (catName) => {
        let catChoisies = [...listeCat];
        if(catChoisies.indexOf(catName) === -1) {
            catChoisies.push(catName);
        } else {
            let index = catChoisies.indexOf(catName);
            catChoisies.splice(index, 1);
        }
        
        setListeCat(catChoisies);
    } 

    let categoryMap = categories.map((cat) => {
        return (
            <CatCard key={cat.titre} titre={cat.titre} image={cat.image} handlePressParent={handlePress} />
        )
    });


    return (
        <View style={styles.global}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={styles.header}>
                        <FlecheRetour width={30} height={30} onPress={() => { navigation.navigate('Accueil') }} />
                        <Text style={styles.titre}> Choisir une catégorie </Text>
                        <View/>
                    </View>
                    <ScrollView>
                        <View style={styles.catContainer}>
                                {categoryMap}
                        </View>
                    </ScrollView>
                    <Button 
                        onPress={() => navigation.navigate('Titre')}
                        type='solid'
                        title='Valider' 
                        buttonStyle={styles.validerBtn} 
                        titleStyle={{fontFamily: "BarlowCondensed-SemiBold", fontSize: 20, color: '#FF5A5D'}}
                        containerStyle = {styles.btnPosition}
                        disabled = {!estSelectionne}
                        raised
                    />
      
                </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    global: {
        flex: 1, 
        backgroundColor: "#FF5A5D",
        paddingHorizontal: 15,
        paddingTop: 30,
        position: 'relative'
    },
    //header
    header: {
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center", 
        paddingBottom: 10
    },
    titre: {
        fontFamily: "BarlowCondensed-SemiBold",
        fontSize: 20,
        color: "white"
    },
    //Liste des catégories
    catContainer: {
        marginBottom: 70,
        flexDirection: "row",
        justifyContent: 'space-between', 
        flexWrap: "wrap",
        width: '100%'
    },
    //Navigation bas de page
    bottomNav: {
        alignItems: 'center',
        padding: 15
    },
    btnPosition: {
        position: 'absolute',
        bottom: 15,
        left: '50%',
        transform: [{ translateX: '-50%' }],
    },
    validerBtn: {
        backgroundColor: 'white',
        borderRadius: 150,
        paddingHorizontal: 30,
    }
});

export default AjoutCategorie