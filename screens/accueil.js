import React, { useState } from 'react';
import { Text, View, Keyboard, StyleSheet, Image, KeyboardAvoidingView, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import { Input, Button, Overlay } from 'react-native-elements';
import Burger from '../assets/images/icones/burger.svg';
import Loupe from '../assets/images/icones/loupe.svg';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';


function Accueil({ navigation, prenomToDisplay, sendCategoryToRedux }) {
    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    var sendToList = (category) => {
        sendCategoryToRedux(category)
        navigation.navigate('ListePlats')
    }

    var RedirectManuellement = () => {
        navigation.navigate('AjoutCategorie');
        setVisible(false)
    }

    var RedirectURL = () => {
        navigation.navigate('AjoutURL');
        setVisible(false)
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#FF5A5D" }} behavior={Platform.OS == "ios" ? "padding" : "height"}>
            <SafeAreaView style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.global}>
                        <View style={{ paddingHorizontal: 15, paddingTop: 10 }}>
                            <Burger width={30} height={30} onPress={() => { navigation.navigate('Menu') }} />
                        </View>
                        <View style={styles.titreContainer} >
                            <Image
                                source={require('../assets/images/logo-caca.png')}
                                style={{ margin: 10, height: 80 }}
                                resizeMode='contain'
                            />
                            <Text style={styles.sousTitre}>Bonjour {prenomToDisplay}, quelle recette allez-vous préparer aujourd'hui ?</Text>
                        </View>
                        <View style={{ backgroundColor: 'white', paddingHorizontal: 15 }}>
                            <View style={styles.catContainer}>

                                <View style={styles.categories} >
                                    <TouchableOpacity onPress={() => sendToList("entrees")}>
                                        <Image
                                            source={require('../assets/images/categories/entrees.png')}
                                            style={{ width: '100%' }}
                                            resizeMode='contain'

                                        />
                                        <Text style={styles.texteCat}>Entrées</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.catmilieu}>
                                    <TouchableOpacity onPress={() => sendToList("plats")}>
                                        <Image
                                            source={require('../assets/images/categories/Plat.png')}
                                            style={{ width: '100%' }}
                                            resizeMode='contain'

                                        />
                                        <Text style={styles.texteCat}>Plats</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.categories} >
                                    <TouchableOpacity onPress={() => sendToList("desserts")}>
                                        <Image
                                            source={require('../assets/images/categories/Dessert.png')}
                                            style={{ width: '100%' }}
                                            resizeMode='contain'
                                            onPress={() => { sendToList("desserts") }}
                                        />
                                        <Text style={styles.texteCat}>Dessert</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
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
                                />
                                <Button
                                    icon={<Loupe width={30} height={30} />}
                                    buttonStyle={styles.inputButton}
                                    containerStyle={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
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

                        <Overlay isVisible={visible}
                            onBackdropPress={toggleOverlay}
                            transparent={true}
                        >
                            <Text style={styles.popUpQuestion}>Comment voulez-vous importer votre recette ?</Text>
                            <Button
                                onPress={() => RedirectManuellement()}
                                title='Manuellement'
                                titleStyle={{ fontFamily: "BarlowCondensed-Medium", fontSize: 20 }}
                                containerStyle={{ alignItems: 'center', marginBottom: 15 }}
                                buttonStyle={{ backgroundColor: "#FF5A5D", width: '80%' }}
                            />
                            <Button
                                onPress={() => RedirectURL()}
                                title='Avec une URL Marmiton'
                                titleStyle={{ fontFamily: "BarlowCondensed-Medium", fontSize: 20 }}
                                containerStyle={{ alignItems: 'center', marginBottom: 15 }}
                                buttonStyle={{ backgroundColor: "#FF5A5D", width: '80%' }}
                            />
                        </Overlay>


                    </View>


                </TouchableWithoutFeedback>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    global: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    titreContainer: {
        //flex: 0.7, 
        paddingHorizontal: 20,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    sousTitre: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        fontFamily: "BarlowCondensed-SemiBold",
        marginBottom: 80
    },
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
    ajoutRecetteBtn: {
        backgroundColor: "#FF5A5D",
        borderRadius: 150,
        paddingHorizontal: 30,
    },
    // Overlay
    popUpQuestion: {
        fontFamily: "BarlowCondensed-SemiBold",
        fontSize: 20,
        paddingHorizontal: 40,
        marginVertical: 15,
        textAlign: 'center',
    },

});


function mapStateToProps(state) {
    return {
        prenomToDisplay: state.prenom
    }
}

function mapDispatchToProps(dispatch) {
    return {
        sendCategoryToRedux: function (category) {
            dispatch({ type: 'selectCat', category })
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Accueil)