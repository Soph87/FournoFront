import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import { Button } from 'react-native-elements';
import CroixBlanche from '../assets/images/icones/croix-blanche.svg';
import CroixJaune from '../assets/images/icones/croixjaune.svg'
import Userjaune from '../assets/images/icones/user-jaune.svg';
import Liste from '../assets/images/icones/liste.svg';
import Sync from '../assets/images/icones/sync.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Menu({ navigation }) {


    var logout = () => {

        navigation.navigate("Home")
    }
    return (
        <View style={styles.global}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ alignItems: 'flex-end' }}>
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Accueil')} >
                            <CroixBlanche width={30} height={30} />
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => navigation.navigate("MonCompte")}>
                            <View style={styles.ongletMenu}>
                                <Userjaune width={30} height={30} />
                                <Text style={styles.ongletText}>Mon compte</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("GestionCat")}>
                            <View style={styles.ongletMenu}>
                                <Liste width={30} height={30} />
                                <Text style={styles.ongletText}>Gestion des catégories et des plats</Text>
                            </View>
                        </TouchableOpacity>
                        {/* <View style={styles.ongletMenu}>
                            <Sync width={30} height={30} />
                            <Text style={styles.ongletText}>Synchronisation pour mode offline</Text>
                        </View> */}
                        <TouchableOpacity onPress={()=> logout()}>
                            <View style={styles.ongletMenu}>
                                <CroixJaune width={30} height={30} />
                                <Text style={styles.ongletText}>Deconnexion</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
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
        position: 'relative'
    },
    //header
    header: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        paddingBottom: 10
    },
    ongletMenu: {
        flexDirection: "row",
        width: "90%",
        height: 60,
        marginHorizontal: 15,
        backgroundColor: "white",
        borderRadius: 8,
        marginTop: 15,
        paddingHorizontal: 10,
        alignItems: 'center',
        shadowColor: "#00000052",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
    ongletText: {
        fontSize: 20,
        fontFamily: "BarlowCondensed-Regular",
        color: "#666666",
        paddingHorizontal: 10,
    },
    croix: {
        width: "90%",
        height: 40,
        alignItems: "flex-end",
        justifyContent: "flex-end",
        marginHorizontal: 20,
    }
});

export default Menu;