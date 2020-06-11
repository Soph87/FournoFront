import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, Image, ImageBackground, Text, SafeAreaView, ImagePropTypes } from 'react-native';
import { Overlay, Input, Button } from 'react-native-elements'
import FlecheRetour from '../../../assets/images/icones/fleche-retour.svg'
import Modifier from '../../../assets/images/icones/modifier.svg'
import Balance from '../../../assets/images/icones/balance.svg'
import Croix from '../../../assets/images/icones/croix.svg'
import CroixBlanche from '../../../assets/images/icones/croixblanche.svg'
import CroixRose from '../../../assets/images/icones/croixrose.svg'
import Diviser from '../../../assets/images/icones/diviser.svg'
import DiviserBlanc from '../../../assets/images/icones/diviserblanc'
import recette from '../../../reducers/recette';

function ConsulterRecette({ navigation, recetteToDisplay, clickModifierParent }) {

    const [isVisible, setIsVisible] = useState(false)
    const [operator, setOperator] = useState(null)
    const [nombre, setNombre] = useState(1)
    const [ingredients, setIngredients] = useState(recetteToDisplay.ingredients)

    var clickModifier = () => {
        clickModifierParent()
    }

    var appliquerDivMult = () => {


    }

    let ingredientTable = recetteToDisplay.ingredients.map((ing, i) => {

        return (
            <Text style={styles.preparation} key={i}>- {ing}</Text>
        )
    })

    let preparationTable = recetteToDisplay.etapes.map((etape, i) => {

        return (
            <View style={{ flexDirection: "row", marginTop: 15 }}>
                <View style={{ backgroundColor: "#FFC830", height: 40, width: 40, justifyContent: "center", alignItems: "center", borderRadius: "100%" }}>
                    <Text style={styles.boule}>
                        {i + 1}
                    </Text>
                </View>
                <View style={{ paddingRight: 50, marginLeft: 20, marginBottom: 10 }}>
                    <Text style={styles.preparation}>{etape}</Text>
                </View>

            </View>
        )
    })
    let buttonMult;
    operator === "multiplier" ? buttonMult =
        <View style={{ backgroundColor: "#FF5A5B", width: "40%", justifyContent: "center", alignItems: "center", borderRadius: 30, height: 50 }}>
            <CroixBlanche height={30} width={30} onPress={() => setOperator(null)} />
        </View>
        : buttonMult =
        <View style={{ backgroundColor: "#FFF", width: "40%", justifyContent: "center", alignItems: "center", borderWidth: "1px", borderColor: "#FF5A5B", borderRadius: 30, height: 50 }}>
            <CroixRose height={30} width={30} onPress={() => setOperator('multiplier')} />
        </View>


    let buttonDiviser;
    operator === 'diviser' ? buttonDiviser =
        <View style={{ backgroundColor: "#FF5A5B", width: "40%", justifyContent: "center", alignItems: "center", borderRadius: 30, height: 50 }}>
            <DiviserBlanc height={30} width={30} onPress={() => setOperator(null)} />
        </View>
        : buttonDiviser =
        <View style={{ backgroundColor: "#FFF", width: "40%", justifyContent: "center", alignItems: "center", borderWidth: "1px", borderColor: "#FF5A5B", borderRadius: 30, height: 50 }}>
            <Diviser height={30} width={30} onPress={() => setOperator("diviser")} />
        </View>


    let preparation;
    let cuisson;
    let quantite;
    let total;
    let vide;

    if (recetteToDisplay.preparation[0].preparation != "") {
        preparation = <Text style={styles.preparation}> <Text style={styles.sousTitre}>Préparation :</Text> {recetteToDisplay.preparation[0].preparation} min</Text>
    }

    if (recetteToDisplay.preparation[0].cuisson != "") {
        cuisson = <Text style={styles.preparation}> <Text style={styles.sousTitre}>Cuisson :</Text> {recetteToDisplay.preparation[0].cuisson} min </Text>
    }

    if (recetteToDisplay.preparation[0].quantite != "") {
        quantite = <Text style={styles.preparation}> <Text style={styles.sousTitre}>Quantité :</Text> {recetteToDisplay.preparation[0].quantite} personnes </Text>
    }

    if (recetteToDisplay.preparation[0].total != "") {
        total = <Text style={styles.preparation}> <Text style={styles.sousTitre}>Total :</Text> {recetteToDisplay.preparation[0].total} min</Text>
    }

    if (recetteToDisplay.preparation[0].preparation === "" 
        && recetteToDisplay.preparation[0].cuisson === "" 
        && recetteToDisplay.preparation[0].quantite === "" 
        && recetteToDisplay.preparation[0].total === "")
        {
            vide = <Text style={styles.vide}>Vous n'avez pas défini de temps de préparation</Text>
        }

        return (

            <View style={{ flex: 1, backgroundColor: "#FF5A5B" }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingLeft: 15, paddingRight: 15, marginBottom: 10 }}>
                        <FlecheRetour width={30} height={30} onPress={() => { navigation.navigate('ListePlats') }} />
                        <Modifier width={30} height={30} onPress={() => { clickModifier() }} />

                    </View>
                    <ScrollView style={{ flex: 1, width: "100%" }}>
                        <View>
                            <Image source={{uri : recetteToDisplay.image}} style={{ width: '100%', height: 200, marginTop: 25 }}></Image>
                        </View>
                        <Text style={styles.titre}>{recetteToDisplay.titre}</Text>
                        <View style={{ padding: 15 }}>
                            <View style={{ backgroundColor: "#FFF", borderRadius: 10, padding: 10, flexDirection: "column", justifyContent: "flex-start", height: 100 }}>
                                {preparation}
                                {cuisson}
                                {total}
                                {quantite}
                                {vide}
                            </View>

                            <View style={{ backgroundColor: "#FFF", borderRadius: 10, padding: 10, flexDirection: "column", justifyContent: "space-between", marginTop: 15 }}>
                                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                                    <Text style={styles.sousLigne}>Ingrédients</Text>
                                    <Balance width={30} height={30} onPress={() => setIsVisible(true)} />
                                </View>
                                <View>
                                    {ingredientTable}
                                </View>

                            </View>

                            <View style={{ backgroundColor: "#FFF", borderRadius: 10, padding: 10, flexDirection: "column", justifyContent: "space-between", marginTop: 15 }}>
                                <Text style={styles.sousLigne}>Préparation</Text>

                                <View style={{ paddingLeft: 5 }}>
                                    {preparationTable}
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    <Overlay isVisible={isVisible} onBackdropPress={() => setIsVisible(false)} overlayStyle={{ borderRadius: 10 }} >
                        <View style={{ flexDirection: "row", justifyContent: "space-between", width: "70%" }}>
                            <View />
                            <Text style={{ fontSize: 20, color: "#FF5A5B", fontWeight: "bold", marginLeft: 40 }}>Changer les quantités</Text>
                            <Croix height={30} width={30} style={{ marginLeft: 40 }} onPress={() => setIsVisible(false)} />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 20 }}>
                            <Text style={{ color: "#FF5A5B" }}>Multiplier par</Text>
                            <Text style={{ color: "#FF5A5B" }}>Diviser par</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 10 }}>
                            {buttonMult}
                            {buttonDiviser}
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <View style={{ marginTop: 30, justifyContent: "center", alignItems: "center", width: 200 }}>
                                <Input onChangeText={text => setNombre(text)} inputContainerStyle={{ borderWidth: "1px", borderColor: "black" }} keyboardType="number-pad" />
                            </View>
                        </View>

                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <Button onPress={() => { appliquerDivMult() }} title="Valider" buttonStyle={{ backgroundColor: "#FF5A5B", borderRadius: 20, width: 100 }} />
                        </View>
                    </Overlay>
                </SafeAreaView>
            </View>
        )
}

const styles = StyleSheet.create({
    global: {
        flex: 1,
        backgroundColor: "#FF5A5D",

    },
    //Header
    titre: {
        fontFamily: "BarlowCondensed-SemiBold",
        fontSize: 24,
        color: "white",
        textAlign: "center",
        marginTop: 10
    },
    //Liste des plats
    cards: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 8,
        backgroundColor: "white",
        marginTop: 10
    },
    cardImages: {
        width: 84,
        height: 60,
        borderBottomLeftRadius: 8,
        borderTopLeftRadius: 8
    },
    cardTexte: {
        flex: 1,
        width: "100%",
        height: 60,
        paddingHorizontal: 10,
        fontFamily: "BarlowCondensed-Regular",
        justifyContent: "center",
        color: "#666666",
        fontSize: 20,

    },

    sousTitre: {
        fontFamily: "BarlowCondensed-Medium",
        fontSize: 16
    },

    preparation: {
        fontFamily: "BarlowCondensed-Regular",
        fontSize: 16
    },
    vide: {
        fontFamily: "BarlowCondensed-Regular",
        fontSize: 16,
        textAlign: "center"
    },
    sousLigne: {
        fontFamily: "BarlowCondensed-Medium",
        fontSize: 16,
        textDecorationLine: "underline"
    },
    boule: {
        fontFamily: "BarlowCondensed-Black",
        fontSize: 18,
        color: "#fff"
    }

});



export default ConsulterRecette