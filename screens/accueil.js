import React, { useState, useEffect } from 'react';
import { Text, View, Keyboard, StyleSheet, Image, KeyboardAvoidingView, SafeAreaView, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { Input, Button, Overlay } from 'react-native-elements';
//Images SVG
import Burger from '../assets/images/icones/burger.svg';
import Loupe from '../assets/images/icones/loupe.svg';
import Logo from '../assets/images/logo-fourno.svg';
//Redux
import { connect } from 'react-redux';
//Pas besoin ?
import { TouchableOpacity } from 'react-native-gesture-handler';
import CatPref from '../components/categoriesPref'
import PlaceHolderAccueil from '../components/PlaceHolderAccueil'


function Accueil({ navigation, catPref, prenomToDisplay, sendCategoryToRedux, sendSearchToRedux, token, sendCatPref, killRecette }) {

    const [visible, setVisible] = useState(false);
    const [recherche, setRecherche] = useState("");
    const [cat1, setCat1] = useState("")
    const [cat2, setCat2] = useState("")
    const [cat3, setCat3] = useState("")
    const [dataFetched, setDataFetched] = useState(false)


    useEffect(() => {
        var retrieveCategoryPref = async () => {
            let response = await fetch('http://192.168.1.23:3000/users/getCatPref?token=' + token)

            response = await response.json()

            setCat1(response.categoriesPref[0])
            setCat2(response.categoriesPref[1])
            setCat3(response.categoriesPref[2])
            setDataFetched(true)
        }
        retrieveCategoryPref()
        // sendCatPref(cat1)
        //sendCatPref(cat2)
        //sendCatPref(cat3)
        
    }, [])



    killRecette()

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    var sendToList = (category) => {
        sendCategoryToRedux(category);
        navigation.navigate('ListePlats');
    }

    var RedirectManuellement = () => {
        navigation.navigate('AjoutCategorie');
        setVisible(false);
    }

    var RedirectURL = () => {
        navigation.navigate('AjoutURL');
        setVisible(false);
    }

    var searchRecette = () => {
        sendSearchToRedux(recherche);
        navigation.navigate("ListeRecherche");
    }

    if (catPref.length != 0) {
        var categoryPref = <CatPref category1={catPref[0]} category2={catPref[1]} category3={catPref[2]} sendToList={sendToList} />
    } else {
        var categoryPref = <CatPref category1={cat1} category2={cat2} category3={cat3} sendToList={sendToList} />

    }
if(!dataFetched){
    return (
        <PlaceHolderAccueil />
    )
} else {

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#FF5A5D" }} behavior={Platform.OS == "ios" ? "padding" : "height"}>
            <SafeAreaView style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.global}>
                        <View style={{ paddingHorizontal: 15, paddingTop: 10 }}>
                            <Burger width={30} height={30} onPress={() => { navigation.navigate('Menu') }} />
                        </View>
                        <View style={styles.titreContainer} >
                            <View style={{ alignItems: 'center' }}>
                                <View style={styles.logoContainer}>
                                    <Logo height='100%' width='100%' />
                                </View>
                            </View>
                            <Text style={styles.sousTitre}>Bonjour {prenomToDisplay}, quelle recette allez-vous préparer aujourd'hui ?</Text>
                        </View>
                    
                        <View style={{ backgroundColor: 'white', paddingHorizontal: 15 }}>

                            {categoryPref}

                            <View style={{ borderBottomWidth: 2, borderBottomColor: '#FF5A5D', alignItems: 'flex-end' }}>
                                <Text onPress={() => navigation.navigate('ListeCategories')} style={styles.lienVert}>+ de catégories</Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <Input
                                    inputContainerStyle={styles.input}
                                    renderErrorMessage={false}
                                    placeholder='Chercher une recette par mot clé'
                                    containerStyle={{ paddingHorizontal: 0 }}
                                    inputStyle={{ fontFamily: "BarlowCondensed-Regular", fontSize: 20 }}
                                    onChangeText={text => setRecherche(text)}
                                />
                                <Button
                                    icon={<Loupe width={30} height={30} />}
                                    buttonStyle={styles.inputButton}
                                    containerStyle={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                                    onPress={() => searchRecette()}
                                />
                            </View>
                            <View style={{ alignItems: 'center', marginBottom: 20 }}>
                                <Button
                                    onPress={toggleOverlay}
                                    title='Ajouter une recette'
                                    buttonStyle={styles.ajoutRecetteBtn}
                                    titleStyle={{ fontFamily: "BarlowCondensed-SemiBold", fontSize: 20 }}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1, backgroundColor: 'white' }} />

                        <Overlay
                            isVisible={visible}
                            onBackdropPress={toggleOverlay}
                            transparent={true}
                        >
                            <View>
                                <Text style={styles.popUpQuestion}>Comment voulez-vous importer votre recette ?</Text>
                                <View style={{ alignItems: "center", marginBottom: 15 }}>
                                    <Button
                                        onPress={() => RedirectManuellement()}
                                        title='Manuellement'
                                        titleStyle={{ fontFamily: "BarlowCondensed-Medium", fontSize: 20 }}
                                        buttonStyle={styles.ajoutRecetteBtn}
                                    />
                                </View>
                                <View style={{ alignItems: "center", marginBottom: 10 }}>
                                    <Button
                                        onPress={() => RedirectURL()}
                                        title='Depuis Internet'
                                        titleStyle={{ fontFamily: "BarlowCondensed-Medium", fontSize: 20 }}
                                        buttonStyle={styles.ajoutRecetteBtn}
                                    />
                                </View>
                            </View>
                        </Overlay>
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )

}
}

//Calcul des dimensions du container du logo
const win = Dimensions.get('window');
const logoWidth = 45 * win.width / 100;
const logoHeight = (logoWidth * 300) / 520

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
    logoContainer: {
        width: logoWidth,
        height: logoHeight,
        marginBottom: 10,
        marginTop: 10,
    },
    sousTitre: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        fontFamily: "BarlowCondensed-SemiBold",
        marginBottom: 80
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
    lienVert: {
        color: '#01B393',
        fontSize: 20,
        textDecorationLine: 'underline',
        marginBottom: 15,
        fontFamily: "BarlowCondensed-Regular"
    },
    //Barre de recherche par mot clé
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        paddingHorizontal: 15,
        marginBottom: 30
    },
    input: {
        backgroundColor: "#F0F0F0",
        borderTopLeftRadius: 150,
        borderBottomLeftRadius: 150,
        borderBottomWidth: 0,
        paddingHorizontal: 20,
        height: 46,
    },
    inputButton: {
        backgroundColor: "#F0F0F0",
        borderTopRightRadius: 150,
        borderBottomRightRadius: 150,
        margin: 0,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        padding: 8,
    },
    //Bouton ajout de recette
    ajoutRecetteBtn: {
        backgroundColor: "#FF5A5D",
        borderRadius: 150,
        paddingHorizontal: 30,
    },
    // Overlay
    popUpQuestion: {
        fontFamily: "BarlowCondensed-SemiBold",
        color: '#666666',
        fontSize: 18,
        paddingHorizontal: 40,
        marginVertical: 15,
        textAlign: 'center',
    },

});


function mapStateToProps(state) {
    return {
        prenomToDisplay: state.prenom,
        token: state.token,
        catPref: state.categoryPref,
        isChanged: state.isChanged
    }
}

function mapDispatchToProps(dispatch) {
    return {
        sendCategoryToRedux: function (category) {
            dispatch({ type: 'selectCat', category })
        },
        sendSearchToRedux: function (searchText) {
            dispatch({ type: 'sendSearch', searchText })
        },
        sendCatPref: function (category) {
            dispatch({ type: "addToPref", category })
        },
        killRecette: function() {
            dispatch({type: 'killRecette'})
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Accueil)