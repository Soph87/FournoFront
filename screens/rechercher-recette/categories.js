import React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
//Components
import CatCard from '../../components/cat-card';
//Images SVG
import FlecheRetour from '../../assets/images/icones/fleche-retour.svg';
//Redux
import {connect} from 'react-redux'

function ListeCategories({ navigation, sendCategoryToRedux }) {

   const categoryList= [
        { titre: 'Entrées', image: require('../../assets/images/categories/entrees.png') },
        { titre: 'Plats', image: require('../../assets/images/categories/Plat.png') },
        { titre: 'Desserts', image: require('../../assets/images/categories/Dessert.png') },
        { titre: 'Petits-déj', image: require('../../assets/images/categories/Petit-dej.png') },
        { titre: 'Salades', image: require('../../assets/images/categories/Salade.png') },
        { titre: 'Soupes', image: require('../../assets/images/categories/Soupe.png') },
        { titre: 'Viandes', image: require('../../assets/images/categories/Viande.png') },
        { titre: 'Volailles', image: require('../../assets/images/categories/Volaille.png') },
        { titre: 'Poissons', image: require('../../assets/images/categories/Poisson.png') },
        { titre: 'Légumes', image: require('../../assets/images/categories/Legumes.png') },
        { titre: 'Pâtes', image: require('../../assets/images/categories/Pates.png') },
        { titre: 'Sauces', image: require('../../assets/images/categories/Sauce.png') },
        { titre: 'Gâteaux', image: require('../../assets/images/categories/Gateaux.png') },
        { titre: 'En-cas', image: require('../../assets/images/categories/En-cas.png') },
        { titre: 'Confitures', image: require('../../assets/images/categories/Confiture.png') },
        { titre: 'Boulangerie', image: require('../../assets/images/categories/Boulangerie.png') },
        { titre: 'Apéritifs', image: require('../../assets/images/categories/Apero.png') },
        { titre: 'Boissons', image: require('../../assets/images/categories/Boisson.png') },
        { titre: 'Autres', image: require('../../assets/images/categories/Autre.png') },
    ]

    const clickCategory = (category) => {
        sendCategoryToRedux(category)
        navigation.navigate('ListePlats')
    }

    /* let categoryMap = categoryList.map((cat, i) => {
        return (
            <View style={styles.categories} key={cat.titre}>
                 <TouchableOpacity onPress={() => {clickCategory(cat.titre)}}>
                <Image
                    source={cat.image}
                    style={{ width: '100%' }}
                    resizeMode='contain'
                />
                <Text style={styles.texteCat} >{cat.titre}</Text>
                </TouchableOpacity>
            </View>
        )
    }) */


    let categoryMap = categoryList.map((cat) => {
        return (
            <CatCard key={cat.titre} titre={cat.titre} image={cat.image} maxwidth={120} handlePressParent={clickCategory} selection={false} />
        )
    });

    return (
        <View style={styles.global}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={styles.header}>
                        <FlecheRetour width={30} height={30} onPress={() => { navigation.navigate('Accueil') }} />
                        <Text style={styles.titre}> Choisir une catégorie </Text>
                        <View width={30} height={30} />
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
        paddingHorizontal: 15,
        paddingTop: 30,
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