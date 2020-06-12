import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, ImageBackground, Text, SafeAreaView} from 'react-native';
import { Input, Button } from 'react-native-elements'
import AppareilPhoto from '../../../assets/images/icones/photo.svg'
import Poubelle from '../../../assets/images/icones/poubelle.svg'
import Photo from '../../../assets/images/icones/appareil-photo.svg'
import FlecheRetour from '../../../assets/images/icones/fleche-retour.svg'
import PoubelleBlanche from '../../../assets/images/icones/poubelleBlanche.svg'
import PhotoCamera from '../../rechercher-recette/components/photo'
import Ajouter from '../../../assets/images/icones/ajouter.svg'
import { connect } from 'react-redux';


function CheckRecette({ navigation, marmitonToDisplay, clicRetourParent, photoToDisplay, killPhotoRedux }) {

    const [photo, setPhoto] = useState(false)
    const [photoMarmit, setPhotoMarmit] = useState(marmitonToDisplay.recette.image)
    const [titre, setTitre] = useState(marmitonToDisplay.recette.titre)
    const [ingredients, setIngredients] = useState(marmitonToDisplay.recette.ingredients)
    const [cuisson, setCuisson] = useState(marmitonToDisplay.recette.preparation.cuisson)
    const [total, setTotal] = useState(marmitonToDisplay.recette.preparation.total)
    const [preparation, setPreparation] = useState(marmitonToDisplay.recette.preparation.preparation)
    const [quantite, setQuantite] = useState(marmitonToDisplay.recette.preparation.quantite)
    const [etapes, setEtapes] = useState(marmitonToDisplay.recette.etapes)


    var cancelPhoto = () => {
        setPhoto(false)
    }

    var clickRetour = () => {
        clicRetourParent()
    }

    var validerRecette = async () => {
        var recette = marmitonToDisplay;
        recette.titre = titre
        recette.etapes = etapes
        recette.ingredients = ingredients
        recette.image = photoMarmit
        recette.url = ""
        recette.preparation.preparation = preparation
        recette.preparation.cuisson = cuisson
        recette.preparation.total = total
        recette.preparation.quantite = quantite
               
        // console.log(recette)

        var body = JSON.stringify(recette)

        var response = await fetch("https://protected-anchorage-65968.herokuapp.com/users/saveRecette", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body,

        })
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
        // var msg = messageData.message.replace(/:\)/g, '\u263A');
        // msg = msg.replace(/:\(/g, '\u2639');
        // msg = msg.replace(/:p/g, '\uD83D\uDE1B');

        // var etapeRegex = etape.replace(^[ \t]+|[ \t]+$, "");

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
                    <ScrollView style={{ flex: 1, width: "100%" }}>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingLeft: 15, paddingRight: 15 }}>
                            <FlecheRetour width={30} height={30} fill={"white"} onPress={() => { clickRetour() }} />
                            <Text style={styles.titre}>Modifier la recette </Text>
                            <View />
                        </View>

                        <ImageBackground source={{uri : photoMarmit}} style={{ width: '100%', height: 200, marginTop: 25, flex: 1, justifyContent: "flex-end" }}>

                            <View style={{ backgroundColor: "white", opacity: 0.7, height: 50, width: "100%", alignItems: "center", flexDirection: "row", justifyContent: "center" }}>

                                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around" }}>
                                    <AppareilPhoto width={30} height={30} onPress={() => { setPhoto(true) }} />
                                    <Photo width={30} height={30} />
                                    <Poubelle width={30} height={30} />
                                </View>
                            </View>
                        </ImageBackground>

                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.sousTitre}>Titre de la recette</Text>
                            <Input inputContainerStyle={styles.input} value={titre} placeholder={marmitonToDisplay.titre} rightIcon={<Poubelle height={30} width={30} />} onChangeText={text => setTitre(text)}></Input>
                        </View>

                        <View>
                            <Text style={styles.sousTitre}>Préparation</Text>
                            <Input onChangeText={text => setPreparation(text)} inputContainerStyle={styles.input} value={preparation} rightIcon={<Poubelle height={30} width={30} onPress={() => setPreparation("")} />}></Input>
                        </View>

                        <View>
                            <Text style={styles.sousTitre}>Cuisson</Text>
                            <Input onChangeText={text => setCuisson(text)} inputContainerStyle={styles.input} value={cuisson} rightIcon={<Poubelle height={30} width={30} onPress={() => setCuisson("")} />}></Input>
                        </View>

                        <View>
                            <Text style={styles.sousTitre}>Total</Text>
                            <Input onChangeText={text => setTotal(text)} inputContainerStyle={styles.input} value={total} rightIcon={<Poubelle height={30} width={30} onPress={() => setTotal("")} />}></Input>
                        </View>

                        <View>
                            <Text style={styles.sousTitre}>Quantité</Text>
                            <Input onChangeText={text => setQuantite(text)} inputContainerStyle={styles.input} value={quantite} rightIcon={<Poubelle height={30} width={30} onPress={() => setQuantite("")} />}></Input>
                        </View>



                        <View>
                            <Text style={styles.sousTitre}>Ingrédients</Text>
                            {ingredientsTable}
                            <View style={{ alignItems: "center" }}>
                                <Ajouter height={30} width={30} onPress={() => ajouterIng()} />
                                <Text style={{ color: "white", fontFamily: "BarlowCondensed-Regular", fontSize: 20 }}>Ajouter un ingrédient</Text>
                            </View>
                        </View>

                        <View>
                            <Text style={styles.sousTitre}>Etapes</Text>
                            {etapesTable}
                            <View style={{ alignItems: "center" }}>
                                <Ajouter height={30} width={30} onPress={() => ajouterEtap()} />
                                <Text style={{ color: "white", fontFamily: "BarlowCondensed-Regular", fontSize: 20 }}>Ajouter un étape</Text>
                            </View>
                        </View>

                    </ScrollView>

                    <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
                        <Button
                            type='solid'
                            title='Valider'
                            buttonStyle={styles.validerBtn}
                            titleStyle={{ fontFamily: "BarlowCondensed-SemiBold", fontSize: 20, color: '#FF5A5D' }}
                            raised
                            onPress={() => validerRecette()}
                        />
                        <View style={{ backgroundColor: 'white', borderRadius: 200, marginLeft: 40, alignItems: "center", justifyContent: "center" }}>
                            <PoubelleBlanche height={30} width={40} />
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titre: {
        fontFamily: "BarlowCondensed-SemiBold",
        fontSize: 27,
        color: "white",
        textAlign: "center",
        marginTop: 10
    },
    sousTitre: {
        fontFamily: "BarlowCondensed-SemiBold",
        fontSize: 24,
        color: "white",
        marginBottom: 10,
        paddingLeft: 15
    },
    validerBtn: {
        backgroundColor: 'white',
        borderRadius: 150,
        paddingHorizontal: 30,
    },
    input: {
        backgroundColor: "white",
        borderRadius: 8,
        paddingLeft: 10,
        borderBottomWidth: 0
    }
})


function mapStateToProps(state) {
    return {
        photoToDisplay: state.photo
    }
}

function mapDispatchToProps(dispatch){
    return {
        killPhotoRedux: function(){
            dispatch({type: 'killPhoto'})
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckRecette)