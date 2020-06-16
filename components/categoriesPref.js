import React from 'react'
import {StyleSheet, Image, View, TouchableOpacity, Text} from 'react-native'


function CatPref({ category1, category2, category3, sendToList }) {
    var image1;
    var image2;
    var image3;

    switch (category1) {
        case "Entrées": image1 = <Image
            source={require('../assets/images/categories/entrees.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Apéritifs": image1 = <Image
            source={require('../assets/images/categories/Apero.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Autres": image1 = <Image
            source={require('../assets/images/categories/Autre.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Boissons": image1 = <Image
            source={require('../assets/images/categories/Boisson.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Boulangerie": image1 = <Image
            source={require('../assets/images/categories/Boulangerie.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Confitures": image1 = <Image
            source={require('../assets/images/categories/Confiture.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Desserts": image1 = <Image
            source={require('../assets/images/categories/Dessert.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "En-cas": image1 = <Image
            source={require('../assets/images/categories/En-cas.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Gâteaux": image1 = <Image
            source={require('../assets/images/categories/Gateaux.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Légumes": image1 = <Image
            source={require('../assets/images/categories/Legumes.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Pâtes": image1 = <Image
            source={require('../assets/images/categories/Pates.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Petits-déj": image1 = <Image
            source={require('../assets/images/categories/Petit-dej.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Plats": image1 = <Image
            source={require('../assets/images/categories/Plat.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Poissons": image1 = <Image
            source={require('../assets/images/categories/Poisson.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Salades": image1 = <Image
            source={require('../assets/images/categories/Salade.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Sauces": image1 = <Image
            source={require('../assets/images/categories/Sauce.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Soupes": image1 = <Image
            source={require('../assets/images/categories/Soupe.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Viandes": image1 = <Image
            source={require('../assets/images/categories/Viande.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Volailles": image1 = <Image
            source={require('../assets/images/categories/Volaille.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;

    }

    switch (category2) {
        case "Entrées": image2 = <Image
            source={require('../assets/images/categories/entrees.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Apéritifs": image2 = <Image
            source={require('../assets/images/categories/Apero.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Autres": image2 = <Image
            source={require('../assets/images/categories/Autre.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Boissons": image2 = <Image
            source={require('../assets/images/categories/Boisson.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Boulangerie": image2 = <Image
            source={require('../assets/images/categories/Boulangerie.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Confitures": image2 = <Image
            source={require('../assets/images/categories/Confiture.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Desserts": image2 = <Image
            source={require('../assets/images/categories/Dessert.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "En-cas": image2 = <Image
            source={require('../assets/images/categories/En-cas.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Gâteaux": image2 = <Image
            source={require('../assets/images/categories/Gateaux.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Légumes": image2 = <Image
            source={require('../assets/images/categories/Legumes.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Pâtes": image2 = <Image
            source={require('../assets/images/categories/Pates.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Petits-déj": image2 = <Image
            source={require('../assets/images/categories/Petit-dej.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Plats": image2 = <Image
            source={require('../assets/images/categories/Plat.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Poissons": image2 = <Image
            source={require('../assets/images/categories/Poisson.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Salades": image2 = <Image
            source={require('../assets/images/categories/Salade.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Sauces": image2 = <Image
            source={require('../assets/images/categories/Sauce.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Soupes": image2 = <Image
            source={require('../assets/images/categories/Soupe.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Viandes": image2 = <Image
            source={require('../assets/images/categories/Viande.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Volailles": image2 = <Image
            source={require('../assets/images/categories/Volaille.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;

    }

    switch (category3) {
        case "Entrées": image3 = <Image
            source={require('../assets/images/categories/entrees.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Apéritifs": image3 = <Image
            source={require('../assets/images/categories/Apero.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Autres": image3 = <Image
            source={require('../assets/images/categories/Autre.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Boissons": image3 = <Image
            source={require('../assets/images/categories/Boisson.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Boulangerie": image3 = <Image
            source={require('../assets/images/categories/Boulangerie.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Confitures": image3 = <Image
            source={require('../assets/images/categories/Confiture.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Desserts": image3 = <Image
            source={require('../assets/images/categories/Dessert.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "En-cas": image3 = <Image
            source={require('../assets/images/categories/En-cas.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Gâteaux": image3 = <Image
            source={require('../assets/images/categories/Gateaux.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Légumes": image3 = <Image
            source={require('../assets/images/categories/Legumes.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Pâtes": image3 = <Image
            source={require('../assets/images/categories/Pates.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Petits-déj": image3 = <Image
            source={require('../assets/images/categories/Petit-dej.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Plats": image3 = <Image
            source={require('../assets/images/categories/Plat.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Poissons": image3 = <Image
            source={require('../assets/images/categories/Poisson.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Salades": image3 = <Image
            source={require('../assets/images/categories/Salade.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Sauces": image3 = <Image
            source={require('../assets/images/categories/Sauce.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Soupes": image3 = <Image
            source={require('../assets/images/categories/Soupe.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Viandes": image3 = <Image
            source={require('../assets/images/categories/Viande.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;
        case "Volailles": image3 = <Image
            source={require('../assets/images/categories/Volaille.png')}
            style={{ width: '100%' }}
            resizeMode='contain'

        />
        break;

    }

    return (
        <View style={styles.catContainer}>

            <View style={styles.categories} >
                <TouchableOpacity onPress={() => sendToList(category1)}>
                   {image1}
                    <Text style={styles.texteCat}>{category1}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.catmilieu}>
                <TouchableOpacity onPress={() => sendToList(category2)}>
                {image2}
                    <Text style={styles.texteCat}>{category2}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.categories} >
                <TouchableOpacity onPress={() => sendToList(category3)}>
                {image3}
                    <Text style={styles.texteCat}>{category3}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    global: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    //Logo et texte bonjour
    titreContainer: {
        paddingHorizontal: 20,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    //Catégories préférées
    catContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: -55,
        marginBottom: 15
    },
    categories: {
        backgroundColor: '#FFC830',
        padding: 10,
        borderRadius: 8,
        flex: 1,
        maxWidth: 115
    },
    catmilieu: {
        backgroundColor: '#FFC830',
        padding: 10,
        borderRadius: 8,
        flex: 1,
        marginHorizontal: 15,
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

export default CatPref