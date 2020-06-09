import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, Image, ImageBackground, Text, SafeAreaView, TextInput } from 'react-native';
import { Input, Button } from 'react-native-elements'
import AppareilPhoto from '../../../assets/images/icones/photo.svg'
import Poubelle from '../../../assets/images/icones/poubelle.svg'
import Photo from '../../../assets/images/icones/appareil-photo.svg'
import FlecheRetour from '../../../assets/images/icones/fleche-retour.svg'
import PoubelleBlanche from '../../../assets/images/icones/poubelleBlanche.svg'
import PhotoCamera from '../../rechercher-recette/components/photo'
import { BorderlessButton } from 'react-native-gesture-handler';



function ModifierRecette({ navigation, recetteToDisplay, clicRetourParent }) {

    const [photo, setPhoto] = useState(false)

    var cancelPhoto = () => {
        setPhoto(false)
    }

    var clickRetour = () => {
        clicRetourParent()
    }

    var ingredientsTable = recetteToDisplay.ingredients.map((ing, i) => {

        return (
            <Input inputContainerStyle={styles.input} value={ing} rightIcon={<Poubelle height={30} width={30}/>}></Input>
        )
    })

    var etapesTable = recetteToDisplay.etapes.map((etape, i) => {

        return (
            <Input multiline={true} inputContainerStyle={styles.input} inputStyle={{ fontFamily: "BarlowCondensed-Regular", fontSize: 20, padding: 10 }} value={etape} rightIcon={<Poubelle height={30} width={30}/>}></Input>
        )
    })

    if (photo) {
        return (
            <PhotoCamera navigation={navigation} clickCancelPhoto={cancelPhoto}/>
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

                    <ImageBackground source={require("../../../assets/images/tarte.jpg")} style={{ width: '100%', height: 200, marginTop: 25, flex: 1, justifyContent: "flex-end" }}>

                        <View style={{ backgroundColor: "white", opacity: 0.7, height: 50, width: "100%", alignItems: "center", flexDirection: "row", justifyContent: "center" }}>

                            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around" }}>
                                <AppareilPhoto width={30} height={30} onPress={()=> {setPhoto(true)}}/>
                                <Photo width={30} height={30}/>
                                <Poubelle width={30} height={30} />
                            </View>
                        </View>
                    </ImageBackground>

                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.sousTitre}>Titre de la recette</Text>
                        <Input inputContainerStyle={styles.input} value={recetteToDisplay.titre} rightIcon={<Poubelle height={30} width={30}/>}></Input>
                    </View>

                    <View>
                        <Text style={styles.sousTitre}>Préparation</Text>
                        <Input inputContainerStyle={styles.input} value={recetteToDisplay.preparation[0].preparation + " min"} rightIcon={<Poubelle height={30} width={30}/>}></Input>
                    </View>

                    <View>
                        <Text style={styles.sousTitre}>Cuisson</Text>
                        <Input inputContainerStyle={styles.input} value={recetteToDisplay.preparation[0].cuisson + " min"} rightIcon={<Poubelle height={30} width={30}/>}></Input>
                    </View>

                    <View>
                        <Text style={styles.sousTitre}>Quantité</Text>
                        <Input inputContainerStyle={styles.input} value={recetteToDisplay.preparation[0].personne + " personnes"} rightIcon={<Poubelle height={30} width={30}/>}></Input>
                    </View>

                    <View>
                        <Text style={styles.sousTitre}>Ingrédients</Text>
                        {ingredientsTable}
                    </View>

                    <View>
                        <Text style={styles.sousTitre}>Etapes</Text>
                        {etapesTable}
                    </View>

                </ScrollView>

                <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
                    <Button
                        type='solid'
                        title='Valider'
                        buttonStyle={styles.validerBtn}
                        titleStyle={{ fontFamily: "BarlowCondensed-SemiBold", fontSize: 20, color: '#FF5A5D' }}
                        raised
                    />
                    <View style={{backgroundColor: 'white', borderRadius: 200, marginLeft: 40, alignItems: "center", justifyContent: "center"}}>
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

export default ModifierRecette