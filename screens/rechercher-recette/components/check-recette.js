import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, ImageBackground, Text, SafeAreaView, Dimensions} from 'react-native';
import { Input, Button, Overlay } from 'react-native-elements'
import AppareilPhoto from '../../../assets/images/icones/photo.svg'
import Poubelle from '../../../assets/images/icones/poubelle.svg'
import Photo from '../../../assets/images/icones/appareil-photo.svg'
import FlecheRetour from '../../../assets/images/icones/fleche-retour.svg'
import Ajouter from '../../../assets/images/icones/ajouter.svg'
import { connect } from 'react-redux';

//Components
import PhotoCamera from '../../rechercher-recette/components/photo';
import CatCard from '../../../components/cat-card';


function CheckRecette({ navigation, marmitonToDisplay, clicRetourParent, photoToDisplay, killPhotoRedux, sendCategories, suppCategorie, categoriesToDisplay}) {

    const [photo, setPhoto] = useState(false)
    const [photoMarmit, setPhotoMarmit] = useState(marmitonToDisplay.recette.image)
    const [titre, setTitre] = useState(marmitonToDisplay.recette.titre)
    const [ingredients, setIngredients] = useState(marmitonToDisplay.recette.ingredients)
    const [cuisson, setCuisson] = useState(marmitonToDisplay.recette.preparation[0].cuisson)
    const [total, setTotal] = useState(marmitonToDisplay.recette.preparation[0].total)
    const [prep, setPrep] = useState(marmitonToDisplay.recette.preparation[0].preparation)
    const [quantite, setQuantite] = useState(marmitonToDisplay.recette.preparation[0].quantite)
    const [etapes, setEtapes] = useState(marmitonToDisplay.recette.etapes)
    const [categories, setCategories] = useState([])
    const [categoriesList, setCategoriesList] = useState([])
    const [listeCat, setListeCat] = useState([])
    const [estSelectionne, setEstSelectionne] = useState(false)
    const [overlayVisible, setOverlayVisible] = useState(false)

    
    let listeCategories = [
        { titre: 'Entrées', image: require('../../../assets/images/categories/entrees.png') },
        { titre: 'Plats', image: require('../../../assets/images/categories/Plat.png') },
        { titre: 'Desserts', image: require('../../../assets/images/categories/Dessert.png') },
        { titre: 'Petits-déj', image: require('../../../assets/images/categories/Petit-dej.png') },
        { titre: 'Salades', image: require('../../../assets/images/categories/Salade.png') },
        { titre: 'Soupes', image: require('../../../assets/images/categories/Soupe.png') },
        { titre: 'Viandes', image: require('../../../assets/images/categories/Viande.png') },
        { titre: 'Volailles', image: require('../../../assets/images/categories/Volaille.png') },
        { titre: 'Poissons', image: require('../../../assets/images/categories/Poisson.png') },
        { titre: 'Légumes', image: require('../../../assets/images/categories/Legumes.png') },
        { titre: 'Pâtes', image: require('../../../assets/images/categories/Pates.png') },
        { titre: 'Sauces', image: require('../../../assets/images/categories/Sauce.png') },
        { titre: 'Gâteaux', image: require('../../../assets/images/categories/Gateaux.png') },
        { titre: 'En-cas', image: require('../../../assets/images/categories/En-cas.png') },
        { titre: 'Confitures', image: require('../../../assets/images/categories/Confiture.png') },
        { titre: 'Boulangerie', image: require('../../../assets/images/categories/Boulangerie.png') },
        { titre: 'Apéritifs', image: require('../../../assets/images/categories/Apero.png') },
        { titre: 'Boissons', image: require('../../../assets/images/categories/Boisson.png') },
        { titre: 'Autres', image: require('../../../assets/images/categories/Autre.png') },
    ]

    //Affichage des Cards de catégorie

    const handlePress = (catName) => {
    let catChoisies = [...listeCat];
    if(catChoisies.indexOf(catName) === -1) {
        catChoisies.push(catName);
        sendCategories(catName);
    } else {
        let index = catChoisies.indexOf(catName);
        catChoisies.splice(index, 1);
        suppCategorie(catName);
    }
    
    setListeCat(catChoisies);
    };

    let categoryMap = listeCategories.map((cat) => {
        return (
            <CatCard key={cat.titre} titre={cat.titre} image={cat.image} maxwidth={115} handlePressParent={handlePress}/>
        )
    });

    var categoriesMarmiton = categoriesList.map((cat, i) => {
        return (
            <View style={styles.catRound}>
                <Text style={styles.categoriesDisplay}>{cat}</Text>
            </View>
        )
    })

    useEffect(() => {
        if(listeCat.length >= 1) {
            setEstSelectionne(true);
        } else {
            setEstSelectionne(false)
        }
    }, [listeCat])

    // Ajouter catégories à la recette
    var ajoutCategories = () => {
        setCategoriesList(categoriesToDisplay)
        setCategories(categoriesToDisplay);
        setOverlayVisible(false)
    }
    

    var cancelPhoto = () => {
        setPhoto(false)
    }

    var clickRetour = () => {
        clicRetourParent()
    }

    
    var validerRecette = async () => {
        
        var recette = marmitonToDisplay.recette
        recette.titre = titre
        recette.etapes = etapes
        recette.ingredients = ingredients
        recette.image = photoMarmit
        recette.url = marmitonToDisplay.recette.url
        recette.preparation[0].preparation = prep
        recette.preparation[0].cuisson = cuisson
        recette.preparation[0].total = total
        recette.preparation[0].quantite = quantite
        recette.category = categoriesList


        var body = JSON.stringify(recette)

        var response = await fetch("https://protected-anchorage-65968.herokuapp.com/users/saveRecette", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body,

        })

        response = response.json();

        if (response) {
            killPhotoRedux()
            navigation.navigate("Accueil")
        }

    }

    var updateIngredients = (index, text) => {
        let newIng = [...ingredients]
        newIng[index] = text
        setIngredients(newIng)
    }

    var updateEtapes = (index, text) => {
        let newEtapes = [...etapes]
        newEtapes[index] = text
        setEtapes(newEtapes)
    }

    var deleteIng = (index) => {
        let newIng = [...ingredients]
        newIng.splice(index, 1)
        setIngredients(newIng)
    }

    var deleteEtape = (index) => {
        let newEtap = [...etapes]
        newEtap.splice(index, 1)
        setEtapes(newEtap)
    }

    var ajouterIng = () => {
        let newIng = [...ingredients]
        newIng.push("")
        setIngredients(newIng)
    }

    var ajouterEtap = () => {
        let newEtap = [...etapes]
        newEtap.push("")
        setEtapes(newEtap)
    }

    var ingredientsTable = ingredients.map((ing, i) => {
        return (
            <Input onChangeText={text => { updateIngredients(i, text) }} inputContainerStyle={styles.input} value={ingredients[i]} rightIcon={<Poubelle height={30} width={30} onPress={() => { deleteIng(i) }} />}></Input>
        )
    })

    var etapesTable = etapes.map((etape, i) => {
        return (
            <Input onChangeText={text => { updateEtapes(i, text) }} multiline={true} inputContainerStyle={styles.input} inputStyle={{ fontFamily: "BarlowCondensed-Regular", fontSize: 20, padding: 10 }} value={etapes[i]} rightIcon={<Poubelle height={30} width={30} onPress={() => { deleteEtape(i) }} />}></Input>
        )
    })

    if (photo) {
        return (
            <PhotoCamera navigation={navigation} clickCancelPhoto={cancelPhoto} />
        )
    } else {
     

        return (

            <View style={{ flex: 1, backgroundColor: "#FF5A5B" }}>
            <SafeAreaView style={{ flex: 1 }}>

                <View style={styles.header}>
                    <FlecheRetour width={30} height={30} onPress={() => { clickRetour() }} />
                    <Text style={styles.headerTitre}> Modifier la recette </Text>
                    <View width={30} height={30} />
                </View>

                <ScrollView style={{ flex: 1, width: "100%" }}>
                    <ImageBackground source={{ uri: photoMarmit }} style={{ width: '100%', height: 200, marginTop: 25, flex: 1, justifyContent: "flex-end" }}>
                        <View style={{ backgroundColor: "white", opacity: 0.7, height: 50, width: "100%", alignItems: "center", flexDirection: "row", justifyContent: "center" }}>
                            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around" }}>
                                <AppareilPhoto width={30} height={30} onPress={() => { setPhoto(true) }} />
                                <Photo width={30} height={30} />
                                <Poubelle width={30} height={30} />
                            </View>
                        </View>
                    </ImageBackground>
                    <View style={styles.separateur} />
                    <View>
                        <Text style={styles.sousTitre}>Titre de la recette</Text>
                        <Input 
                            inputContainerStyle={styles.input} 
                            value={titre} 
                            rightIcon={<Poubelle height={30} width={30} />} onChangeText={text => setTitre(text)}
                            renderErrorMessage={false}
                            inputStyle={styles.inputTexte}
                        />
                    </View>
                    <View style={styles.separateur} />
                    <View>
                        <Text style={styles.sousTitre}>Catégories</Text>
                        <View style={styles.catDisplayContainer}>
                            {categoriesMarmiton}
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <Button
                                type='solid'
                                title='Ajouter des catégories'
                                buttonStyle={styles.boutons}
                                titleStyle={{ fontFamily: "BarlowCondensed-SemiBold", fontSize: 20, color: '#FF5A5D' }}
                                raised
                                onPress={() => setOverlayVisible(true)}
                            />
                        </View>
                    </View>
                    <View style={styles.separateur} />
                    <View>
                        <Text style={styles.sousTitre}>Préparation</Text>
                        <Input 
                            onChangeText={text => setPrep(text)} 
                            inputContainerStyle={styles.input} 
                            value={prep} 
                            rightIcon={<Poubelle height={30} width={30} onPress={() => setPreparation("")} />}
                            label='Temps de préparation'
                            renderErrorMessage={false}
                            inputStyle={styles.inputTexte}
                            labelStyle={styles.label}
                        />
                        <Input 
                            onChangeText={text => setCuisson(text)} 
                            inputContainerStyle={styles.input} 
                            value={cuisson} 
                            rightIcon={<Poubelle height={30} width={30} onPress={() => setCuisson("")} />}
                            label='Temps de cuisson'
                            renderErrorMessage={false}
                            inputStyle={styles.inputTexte}
                            labelStyle={styles.label}
                        />
                        <Input 
                            onChangeText={text => setQuantite(text)} 
                            inputContainerStyle={styles.input} 
                            value={quantite} 
                            rightIcon={<Poubelle height={30} width={30} onPress={() => setQuantite("")} />}
                            label='Quantité'
                            renderErrorMessage={false}
                            inputStyle={styles.inputTexte}
                            labelStyle={styles.label}
                        />
                    </View>
                    <View style={styles.separateur} />
                    <View>
                        <Text style={styles.sousTitre}>Ingrédients</Text>
                        {ingredientsTable}
                        <View style={{ alignItems: "center" }}>
                            <Ajouter height={30} width={30} onPress={() => ajouterIng()} />
                            <Text style={{ color: "white", fontFamily: "BarlowCondensed-Regular", fontSize: 20 }}>Ajouter un ingrédient</Text>
                        </View>
                    </View>
                    <View style={styles.separateur} />
                    <View>
                        <Text style={styles.sousTitre}>Etapes</Text>
                        {etapesTable}
                        <View style={{ alignItems: "center" }}>
                            <Ajouter height={30} width={30} onPress={() => ajouterEtap()} />
                            <Text style={{ color: "white", fontFamily: "BarlowCondensed-Regular", fontSize: 20 }}>Ajouter un étape</Text>
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.bottomNavContainer}>
                    <Button
                        type='solid'
                        title='Valider'
                        buttonStyle={styles.boutons}
                        titleStyle={{ fontFamily: "BarlowCondensed-SemiBold", fontSize: 20, color: '#FF5A5D' }}
                        containerStyle= {styles.boutonsContainer}
                        onPress={() => validerRecette()}
                    />
                </View>
                <Overlay isVisible={overlayVisible} onBackdropPress={() => setOverlayVisible(false)} overlayStyle={styles.overlay}>
                    <ScrollView contentContainerStyle={styles.catContainer}>
                        {categoryMap}
                    </ScrollView>
                    <Button 
                        onPress={() => ajoutCategories() }
                        type='solid'
                        title='Valider' 
                        buttonStyle={styles.validerBtn} 
                        titleStyle={{fontFamily: "BarlowCondensed-SemiBold", fontSize: 20, color: '#FF5A5D'}}
                        containerStyle = {styles.btnPosition}
                        disabled = {!estSelectionne}
                        raised
                    />
                </Overlay>
            </SafeAreaView>
        </View>
        )
    }
}

//Définition de la hauteur de l'overlay
const win = Dimensions.get('window');
const height = 80 * win.height / 100

const styles = StyleSheet.create({
    //Header
    header: {
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center", 
        paddingBottom: 10,
        paddingHorizontal: 15
    },
    headerTitre: {
        fontFamily: "BarlowCondensed-SemiBold",
        fontSize: 20,
        color: "white"
    },
    //Main
    sousTitre: {
        fontFamily: "BarlowCondensed-SemiBold",
        fontSize: 20,
        color: "white",
        marginTop: 15,
        marginBottom: 25,
        paddingLeft: 15
    },
    boutonsContainer: {
        marginHorizontal: 5
    },
    boutons: {
        backgroundColor: 'white',
        borderRadius: 150,
        paddingHorizontal: 20,
    },
    input: {
        backgroundColor: "#F0F0F0",
        borderRadius: 8,
        paddingHorizontal: 10,
        borderBottomWidth: 0,
        marginBottom: 10,
        textAlignVertical: 'top',
    },
    inputTexte: {
        fontFamily: "BarlowCondensed-Regular", 
        fontSize: 20, 
        color: "#666666"
    },
    label: {
        color: 'white',
        fontFamily: "BarlowCondensed-SemiBold",
        fontSize: 16,
        marginBottom: 5
    },
    separateur: {
        borderBottomColor: "white",
        borderBottomWidth: 2,
        marginTop: 30,
        marginHorizontal: 15
    },
    //Affichage des catégories
    catDisplayContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 15
    },
    catRound: {
        backgroundColor: '#FFC830',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginLeft: 15,
        borderRadius: 8,
        marginBottom: 10
    },
    categoriesDisplay: {
        color: '#DB0A5B',
        fontSize: 20,
        fontFamily: "BarlowCondensed-SemiBold",
    },
    btnPosition: {
        position: 'absolute',
        bottom: 15,
        left: '50%',
        transform: [{ translateX: -50 }],
    },
    validerBtn: {
        backgroundColor: 'white',
        borderRadius: 150,
        paddingHorizontal: 30,
    },
    //Navigation bas écran
    bottomNavContainer: {
        flexDirection: "row", 
        justifyContent: "center", 
        paddingVertical: 10
    },
    //Overlay catégories
    overlay: {
        height: height,
        width: '95%'
    },
    catContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around', 
        flexWrap: "wrap",
    }
})


function mapStateToProps(state) {
    return {
        photoToDisplay: state.photo,
        categoriesToDisplay: state.ajoutCats
    }
}

function mapDispatchToProps(dispatch){
    return {
        killPhotoRedux: function(){
            dispatch({type: 'killPhoto'})
        },
        sendCategories: function(cat){
            dispatch({type: 'ajoutCat', cat})
        },
        suppCategorie: function(cat){
            dispatch({type: 'suppCat', cat})
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckRecette)

