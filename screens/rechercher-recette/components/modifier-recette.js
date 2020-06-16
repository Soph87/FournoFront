import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, ImageBackground, Text, SafeAreaView, Dimensions } from 'react-native';
import { Input, Button, Overlay } from 'react-native-elements';
//Images SVG
import AppareilPhoto from '../../../assets/images/icones/photo.svg';
import Poubelle from '../../../assets/images/icones/poubelle.svg';
import Photo from '../../../assets/images/icones/appareil-photo.svg';
import FlecheRetour from '../../../assets/images/icones/fleche-retour.svg';
import Ajouter from '../../../assets/images/icones/ajouter.svg';
//Components
import PhotoCamera from '../../rechercher-recette/components/photo';
import CatCard from '../../../components/cat-card';
//Redux
import { connect } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';


function ModifierRecette({ navigation, token, recetteToDisplay, clicRetourParent, photoToDisplay, killPhotoRedux, sendPhoto }) {

    const [photo, setPhoto] = useState(false)
    const [titre, setTitre] = useState(recetteToDisplay.titre)
    const [ingredients, setIngredients] = useState(recetteToDisplay.ingredients)
    const [cuisson, setCuisson] = useState(recetteToDisplay.preparation[0].cuisson)
    const [total, setTotal] = useState(recetteToDisplay.preparation[0].total)
    const [preparation, setPreparation] = useState(recetteToDisplay.preparation[0].preparation)
    const [quantite, setQuantite] = useState(recetteToDisplay.preparation[0].quantite)
    const [etapes, setEtapes] = useState(recetteToDisplay.etapes)
    const [category, setCategory] = useState(recetteToDisplay.category)
    const [overlayVisible, setOverlayVisible] = useState(false)
    const [hasAlbumPermission, setHasAlbumPermission] = useState(ImagePicker.getCameraPermissionsAsync())
    const [noPhoto, setNoPhoto] = useState(false)
    const [suppOverlayVisible, setSuppOverlayVisible] = useState(false)
    const [overlayMessage, setOverlayMessage] = useState("")

    //Cette fonction va gérer le fait d'appuyer sur le picto album pour aller choisir une photo
    var getPhotoFromAlbum = async () => {
        if (hasAlbumPermission) {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            //console.log(result);
            //Si l'user n'a pas appuyé sur cancel alors on envoie la photo redux pour l'afficher
            if (!result.cancelled) {
                sendPhoto(result.uri)
                setNoPhoto(false)

            }
            //console.log(result.uri)
        } else {
            (async () => {
                //if (Constants.platform.ios) {
                //On demande la permission d'acceder a l'album
                const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
                //On gère le cas ou la perosnne ne permets pas d'acceder a l'album
                if (status !== 'granted') {
                    alert('Oups!! Nous avons besoin de votre permission pour accéder à vos photos!');
                }
                //On mets à jour la permission pour pouvoir l'utiliser plus tard
                setHasAlbumPermission(status === "granted")
                //}
            })();
        }

        //Si on a la permission, alors on créée une variable qui sera égale à la photo qu'on va chercher dans l'album

    }
    //Ici on gère le cas ou la personne clique sur le picto poubelle pour effacer la photo
    var deletePhoto = () => {
        //On envoie au reducer une photo vide
        sendPhoto("")
        //on mets l'état noPhoto a vrai qui nous permettra ensuite de montrer la bonne photo
        //Etant donné que la png à afficher s'utilise en require, on doit passer par un état
        setNoPhoto(true)
    }
    // Ici on gère quelle photo devra s'afficher. 
    var imageDeRecette;
    //Si photoToDisplay est vide, cela veut dire qu'aucune photo n'a été envoyé a redux(pas de prise de photo ni de photo choisie depuis  l'album)
    if (photoToDisplay === "") {
        //Donc on prends l'image qui vient de la recette
        imageDeRecette = recetteToDisplay.image
    } else {
        //Sinon on prends la photo de redux
        imageDeRecette = photoToDisplay
    }
    //Ici on va gérer le faite de pas de photo à afficher. Etant donné que le png "pas de photo" s'utilise en mode require, on doit obligatoirement
    //passer par un état, s'il est vrai, alors on utilise le require
    var imageToShow;
    if (noPhoto || imageDeRecette === "") {
        imageToShow = <ImageBackground source={require('../../../assets/images/no-photo.png')} style={{ width: '100%', height: 200, marginTop: 25, flex: 1, justifyContent: "flex-end" }}>
            <View style={{ backgroundColor: "white", opacity: 0.7, height: 50, width: "100%", alignItems: "center", flexDirection: "row", justifyContent: "center" }}>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around" }}>
                    <AppareilPhoto width={30} height={30} onPress={() => { setPhoto(true) }} />
                    <Photo width={30} height={30} onPress={() => getPhotoFromAlbum()} />
                    <Poubelle width={30} height={30} onPress={() => deletePhoto()} />
                </View>
            </View>
        </ImageBackground>
        //Sinon on utilise l'imageDeRecette ( qui sera soit l'image de redux soit l'image de la recette enregistrée)
    } else {
        imageToShow = <ImageBackground source={{ uri: imageDeRecette }} style={{ width: '100%', height: 200, marginTop: 25, flex: 1, justifyContent: "flex-end" }}>
            <View style={{ backgroundColor: "white", opacity: 0.7, height: 50, width: "100%", alignItems: "center", flexDirection: "row", justifyContent: "center" }}>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around" }}>
                    <AppareilPhoto width={30} height={30} onPress={() => { setPhoto(true) }} />
                    <Photo width={30} height={30} onPress={() => getPhotoFromAlbum()} />
                    <Poubelle width={30} height={30} onPress={() => deletePhoto()} />
                </View>
            </View>
        </ImageBackground>
    }

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



    var cancelPhoto = () => {
        setPhoto(false)
    }

    var clickRetour = () => {
        clicRetourParent()
    }

    var photoSaved = () => {
        setNoPhoto(false)
    }

    var validerRecette = async () => {
        var recette = recetteToDisplay;
        recette.titre = titre
        recette.ingredients = ingredients
        recette.preparation[0].preparation = preparation
        recette.preparation[0].cuisson = cuisson
        recette.preparation[0].quantite = quantite
        recette.preparation[0].total = total
        recette.etapes = etapes
        recette.category = category
        //Ici il faut qu'on sache si on sauvegarde la nouvelle photo qui est dans redux
        if (photoToDisplay != "") {
            recette.image = photoToDisplay
        } else {
            //Ou si dans le cas ou noPhoto est vrai (donc qu'il a appuyé sur la poubelle pour ne plus avoir de photo)
            //Si c'est le cas on envoie un string vide à la DB
            if (noPhoto) {
                recette.image = ""
            }
            //Dans tout les autres cas, on envoie rien, ce qui veut dire qu'il va garder l'image qui état deja presente à l'origine
        }



        var body = JSON.stringify(recette)

        var response = await fetch("https://protected-anchorage-65968.herokuapp.com/updateRecette", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body,

        })
        if (response) {
            killPhotoRedux()
            navigation.navigate("ListePlats")
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

    var supprimerRecette = async () => {
        var body = {
            id: recetteToDisplay._id,
            token: token
        }

        var bodyToSend = JSON.stringify(body)

        let response = await fetch("https://protected-anchorage-65968.herokuapp.com/users/deleteRecette", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: bodyToSend,
        })
        response = await response.json()

        if (response.result) {
            setOverlayMessage("La recette a bien été supprimée")
            setSuppOverlayVisible(true)
            setTimeout(() => {setOverlayVisible(false); navigation.navigate("Accueil")}, 2000)
            
        } else {
            setOverlayMessage("Quelque chose s'est mal passé")
            setSuppOverlayVisible(true)
            setTimeout(() => setOverlayVisible(false), 2000)
        }
    }

    var ajouterEtap = () => {
        let newEtap = [...etapes]
        newEtap.push("")
        setEtapes(newEtap)
    }

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

    //Affichage des ingédients de la recette
    var ingredientsTable = ingredients.map((ing, i) => {
        return (
            <Input
                onChangeText={text => { updateIngredients(i, text) }}
                inputContainerStyle={styles.input}
                value={ingredients[i]}
                inputStyle={styles.inputTexte}
                rightIcon={<Poubelle height={30} width={30} onPress={() => { deleteIng(i) }} />}
                renderErrorMessage={false}
            />
        )
    })

    //Affichage des étapes de la recette
    var etapesTable = etapes.map((etape, i) => {
        return (
            <Input
                onChangeText={text => { updateEtapes(i, text) }}
                multiline={true}
                inputContainerStyle={styles.input}
                inputStyle={styles.inputTexte}
                value={etapes[i]}
                rightIcon={<Poubelle height={30} width={30} onPress={() => { deleteEtape(i) }} />}
                renderErrorMessage={false}
            />
        )
    })

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

    if (photo) {
        return (
            <PhotoCamera navigation={navigation} clickCancelPhoto={cancelPhoto} photoSaved={photoSaved} />
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
                        {imageToShow}
                        <View style={styles.separateur} />
                        <View>
                            <Text style={styles.sousTitre}>Titre de la recette</Text>
                            <Input
                                inputContainerStyle={styles.input}
                                value={titre}
                                placeholder={recetteToDisplay.titre}
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
                                onChangeText={text => setPreparation(text)}
                                inputContainerStyle={styles.input}
                                value={preparation}
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
                        <Button
                            type='solid'
                            title='Supprimer recette'
                            buttonStyle={styles.boutons}
                            titleStyle={{ fontFamily: "BarlowCondensed-SemiBold", fontSize: 20, color: '#FF5A5D' }}
                            containerStyle={styles.boutonsContainer}
                            onPress={() => supprimerRecette()}
                        />
                    </View>
                    <Overlay isVisible={overlayVisible} onBackdropPress={() => setOverlayVisible(false)} overlayStyle={styles.overlay}>
                        <View style={{ flex: 1 }}>
                            <ScrollView contentContainerStyle={styles.catContainer}>
                                {categoryMap}
                            </ScrollView>
                        </View>
                    </Overlay>
                    <Overlay isVisible={suppOverlayVisible}>
                        <View>
                            <Text>
                                {overlayMessage}
                            </Text>
                        </View>
                    </Overlay>
                </SafeAreaView>
            </View>
        )
    }
}
//Définition de la hauteur de l'overlay à 80% de la hauteur de l'écran :
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
    },
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
            dispatch({ type: "addPhoto", photo })
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModifierRecette)