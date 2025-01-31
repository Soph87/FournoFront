import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, ImageBackground, Text, SafeAreaView, Dimensions } from 'react-native';
import { Input, Button, Overlay } from 'react-native-elements'
import AppareilPhoto from '../../../assets/images/icones/photo.svg'
import Poubelle from '../../../assets/images/icones/poubelle.svg'
import Photo from '../../../assets/images/icones/appareil-photo.svg'
import FlecheRetour from '../../../assets/images/icones/fleche-retour.svg'
import Ajouter from '../../../assets/images/icones/ajouter.svg'
import { connect } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
//Components
import PhotoCamera from '../../rechercher-recette/components/photo';
import CatCard from '../../../components/cat-card';
import Home from '../../../assets/images/icones/home.svg'

function CheckRecette({ navigation, marmitonToDisplay, clicRetourParent, photoToDisplay, killPhotoRedux, token, sendPhoto }) {

    const [photo, setPhoto] = useState(false)
    const [photoMarmit, setPhotoMarmit] = useState(marmitonToDisplay.recette.image)
    const [titre, setTitre] = useState(marmitonToDisplay.recette.titre)
    const [ingredients, setIngredients] = useState(marmitonToDisplay.recette.ingredients)
    const [cuisson, setCuisson] = useState(marmitonToDisplay.recette.preparation[0].cuisson)
    const [total, setTotal] = useState(marmitonToDisplay.recette.preparation[0].total)
    const [prep, setPrep] = useState(marmitonToDisplay.recette.preparation[0].preparation)
    const [quantite, setQuantite] = useState(marmitonToDisplay.recette.preparation[0].quantite)
    const [etapes, setEtapes] = useState(marmitonToDisplay.recette.etapes)
    const [category, setCategory] = useState([]);
    //const [categoriesList, setCategoriesList] = useState([])
    const [listeCat, setListeCat] = useState([])
    const [estSelectionne, setEstSelectionne] = useState(false)
    const [overlayVisible, setOverlayVisible] = useState(false)
    const [hasAlbumPermission, setHasAlbumPermission] = useState(null)
    const [noPhoto, setNoPhoto] = useState(false)


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

    useEffect(() => {
        if (listeCat.length >= 1) {
            setEstSelectionne(true);
        } else {
            setEstSelectionne(false)
        }
    }, [listeCat])


    const handlePress = (catName) => {
        let catChoisies = [...listeCat];
        if (catChoisies.indexOf(catName) === -1) {
            catChoisies.push(catName);
            sendCategories(catName);
        } else {
            let index = catChoisies.indexOf(catName);
            catChoisies.splice(index, 1);
            suppCategorie(catName);
        }

        setListeCat(catChoisies);
    };

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
    var photoSaved = () => {
        setNoPhoto(false)
    }

    //Fonction qui va gérer l'appui sur le picto album (regarder la page modifier recette pour plus d'nfos)
    var getPhotoFromAlbum = async () => {
        (async () => {
            //if (Constants.platform.ios) {
            const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
            if (status !== 'granted') {
                alert('Oups!! Nous avons besoin de votre permission pour accéder à vos photos!');
            }
            setHasAlbumPermission(status === "granted")
            //}
        })();

        if (hasAlbumPermission) {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            console.log(result);

            if (!result.cancelled) {
                sendPhoto(result.uri)
                //On donne a photoMarmit la nouvelle valeur, c'est a dire la photo qu'il vient de choisir
                setPhotoMarmit(result.uri)
                setNoPhoto(false)
            }
            console.log(result.uri)
        }
    }

    var deletePhoto = () => {
        sendPhoto("")
        setNoPhoto(true)
    }


    var validerRecette = async () => {

        var recette = marmitonToDisplay.recette
        recette.titre = titre
        recette.etapes = etapes
        recette.ingredients = ingredients
        //Ici on check si l'user a appuyé sur le picto poubelle pour effacer la photo
        //Si c'est le cas on envoie une chaine de caractere vide
        //Sinon on envoie la photoMarmit (qui est soit la photo qui vient de marmiton, soit la photo que l'user a choisi)
        if (noPhoto) {
            recette.image = ""
        } else if (photoToDisplay === "") {
            recette.image = photoMarmit
        } else {
            recette.image = photoToDisplay
        }
        recette.url = marmitonToDisplay.recette.url
        recette.preparation[0].preparation = prep
        recette.preparation[0].cuisson = cuisson
        recette.preparation[0].total = total
        recette.preparation[0].quantite = quantite
        recette.category = category
        recette.token = token

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

    var goToHome = () => {
        navigation.navigate("Accueil")
    }
    var ingredientsTable = ingredients.map((ing, i) => {
        return (
            <Input onChangeText={text => { updateIngredients(i, text) }} inputContainerStyle={styles.input} value={ingredients[i]} rightIcon={<Poubelle height={30} width={30} onPress={() => { deleteIng(i) }} />}></Input>
        )
    })

    //Modifier la liste des catégories de la recette
    const handlePressCat = cat => {
        const newCats = [...category];
        if (newCats.indexOf(cat) === -1) {
            newCats.push(cat);
        } else {
            const index = newCats.indexOf(cat);
            newCats.splice(index, 1);
        }

        setCategory(newCats);
    }


    //Affichage des Cards de catégorie
    let categoryMap = listeCategories.map((cat) => {
        return (
            <CatCard key={cat.titre} titre={cat.titre} image={cat.image} maxwidth={115} catListe={category} handlePressParent={handlePressCat} selection={true} />
        )
    });

    //Affichage des catégories de la recette
    var categories = category.map((cat, i) => {
        return (
            <View style={styles.catRound}>
                <Text style={styles.categoriesDisplay}>{cat}</Text>
            </View>
        )
    })

    var etapesTable = etapes.map((etape, i) => {
        // var msg = messageData.message.replace(/:\)/g, '\u263A');
        // msg = msg.replace(/:\(/g, '\u2639');
        // msg = msg.replace(/:p/g, '\uD83D\uDE1B');

        // var etapeRegex = etape.replace(^[ \t]+|[ \t]+$, "");

        return (
            <Input onChangeText={text => { updateEtapes(i, text) }} multiline={true} inputContainerStyle={styles.input} inputStyle={{ fontFamily: "BarlowCondensed-Regular", fontSize: 20, padding: 10 }} value={etapes[i]} rightIcon={<Poubelle height={30} width={30} onPress={() => { deleteEtape(i) }} />}></Input>
        )
    })

    var imageToDisplay;

    if (photoToDisplay === "") {
        imageToDisplay = photoMarmit
    } else {
        imageToDisplay = photoToDisplay
    }

    var imageToShow;
    if (noPhoto) {
        imageToShow = <ImageBackground source={require('../../../assets/images/no-photo.png')} style={{ width: '100%', height: 200, marginTop: 25, flex: 1, justifyContent: "flex-end" }}>
            <View style={{ backgroundColor: "white", opacity: 0.7, height: 50, width: "100%", alignItems: "center", flexDirection: "row", justifyContent: "center" }}>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around" }}>
                    <AppareilPhoto width={30} height={30} onPress={() => { setPhoto(true) }} />
                    <Photo width={30} height={30} onPress={() => getPhotoFromAlbum()} />
                    <Poubelle width={30} height={30} onPress={() => deletePhoto()} />
                </View>
            </View>
        </ImageBackground>
    } else {
        imageToShow = <ImageBackground source={{ uri: imageToDisplay }} style={{ width: '100%', height: 200, marginTop: 25, flex: 1, justifyContent: "flex-end" }}>
            <View style={{ backgroundColor: "white", opacity: 0.7, height: 50, width: "100%", alignItems: "center", flexDirection: "row", justifyContent: "center" }}>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around" }}>
                    <AppareilPhoto width={30} height={30} onPress={() => { setPhoto(true) }} />
                    <Photo width={30} height={30} onPress={() => getPhotoFromAlbum()} />
                    <Poubelle width={30} height={30} onPress={() => deletePhoto()} />
                </View>
            </View>
        </ImageBackground>
    }

    if (photo) {
        return (
            <PhotoCamera navigation={navigation} clickCancelPhoto={cancelPhoto} photoSaved={photoSaved} />
        )
    } else {


        return (

            <View style={{ flex: 1, backgroundColor: "#FF5A5B" }}>
                <SafeAreaView style={{ flex: 1 }}>

                    <View style={styles.header}>
                        <View width={30} height={30} />
                        <Text style={styles.headerTitre}> Modifier la recette </Text>
                        <Home height={30} width={30} onPress={() => goToHome()} />
                    </View>

                    <ScrollView style={{ flex: 1, width: "100%" }}>
                        {imageToShow}
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
                                {categories}
                            </View>
                            <View style={{ alignItems: "center" }}>
                                <Button
                                    type='solid'
                                    title='Modifier catégories'
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
                            containerStyle={styles.boutonsContainer}
                            onPress={() => validerRecette()}
                        />
                    </View>
                    <Overlay isVisible={overlayVisible} onBackdropPress={() => setOverlayVisible(false)} overlayStyle={styles.overlay}>
                        <ScrollView contentContainerStyle={styles.catContainer}>
                            {categoryMap}
                        </ScrollView>
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
        token: state.token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        killPhotoRedux: function () {
            dispatch({ type: 'killPhoto' })
        },
        sendPhoto: function (photo) {
            dispatch({ type: 'addPhoto', photo })
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckRecette)