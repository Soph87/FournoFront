import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, AsyncStorage, KeyboardAvoidingView } from 'react-native';
import { Input, Button, Overlay } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import FlecheRetour from '../assets/images/icones/fleche-retour.svg';


function MonCompte({ navigation }) {

    const [prenomToDisplay, setPrenomToDisplay] = useState("")
    const [prenom, setPrenom] = useState("")
    const [email, setEmail] = useState("")
    const [token, setToken] = useState("")
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState("")
    const [repeatPass, setRepeatPass] = useState("")
    const [error, setError] = useState("")
    const [isVisible, setIsVisible] = useState(false)
    const [newEmail, setNewEmail] = useState("")
    const [newEmailRepeat, setNewEmailRepeat] = useState("")


    useEffect(() => {
        AsyncStorage.getItem("user",
            function (error, data) {
                if (data) {
                    data = JSON.parse(data)
                    setPrenomToDisplay(data.prenom)
                    //setEmail(data.email)
                    setToken(data.token)
                }
            })

    }, [])

    var validerModif = async () => {
        if(prenom === "" && email === "" && password === ""){
            navigation.navigate("Accueil")
        }

        if (newPassword != repeatPass) {
            setError("Les mots de passes ne correspondent pas")
            setIsVisible(true)
            setTimeout(() => setIsVisible(false), 2000)
        } else if (newEmail != newEmailRepeat) {
            setError("Les adresses e-mails ne correspondent pas")
            setIsVisible(true)
            setTimeout(() => setIsVisible(false), 2000)
        }

        else {
            var body = {
                prenom: prenom,
                token: token,
                password: password,
                newPassword: newPassword,
                repeatPass: repeatPass,
                email: email,
                newEmail: newEmail,
                newEmailRepeat: newEmailRepeat
            }

            var bodyToSend = JSON.stringify(body)

            var response = await fetch('https://protected-anchorage-65968.herokuapp.com/users/updateInfos', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: bodyToSend
            })

            response = await response.json()

            if (response.result === true) {
                console.log("je suis dans le true")
                setError("Modification effectuée")
                setIsVisible(true)
                setTimeout(() => setIsVisible(false), 2000)
                navigation.navigate("Accueil")
            } else {
                setError(response.error)
                setIsVisible(true)
                setTimeout(() => setIsVisible(false), 2000)
            }
        }
    }


    return (

        <KeyboardAvoidingView behavior={Platform.OS == "ios" ? "padding" : "height"} style={styles.global}>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView>
                <View style={{ flex: 1 }}>
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <FlecheRetour width={30} height={30} onPress={() => { navigation.goBack() }} />
                        <Text style={styles.titre}>Mon compte</Text>
                        <View />
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <Text style={styles.titre}>{prenomToDisplay}, ici vous pouvez changer vos informations personnelles</Text>
                    </View>
                    <Overlay isVisible={isVisible}>
                        <Text>{error}</Text>
                    </Overlay>

                    <View style={{ marginTop: 30 }}>
                        <Text style={styles.titre}>Modifier prénom</Text>
                        <Input inputContainerStyle={styles.input} placeholder="Entrez votre prénom" onChangeText={text => setPrenom(text)}></Input>
                    </View>

                    <View style={{ marginTop: 30 }}>
                        <Text style={styles.titre}>Modifier adresse e-mail</Text>
                        <Input inputContainerStyle={styles.input} keyboardType="email-address"  placeholder="Adresse e-mail actuelle" onChangeText={text => setEmail(text)}></Input>
                        <Input inputContainerStyle={styles.input} keyboardType="email-address"  placeholder="Nouvelle adresse e-mail" onChangeText={text => setNewEmail(text)}></Input>
                        <Input inputContainerStyle={styles.input} keyboardType="email-address"  placeholder="Confirmer nouvelle adresse e-mail" onChangeText={text => setNewEmailRepeat(text)}></Input>
                    </View>

                    <View style={{ marginTop: 30 }}>
                        <Text style={styles.titre}>Modifier mot de passe</Text>
                        <Input inputContainerStyle={styles.input} secureTextEntry={true}  placeholder="Mot de passe actuel" onChangeText={text => setPassword(text)}></Input>
                        <Input inputContainerStyle={styles.input} secureTextEntry={true}  placeholder="Nouveau mot de passe" onChangeText={text => setNewPassword(text)}></Input>
                        <Input inputContainerStyle={styles.input} secureTextEntry={true}  placeholder="Confirmer nouveau mot de passe" onChangeText={text => setRepeatPass(text)}></Input>
                    </View>

                    <View style={{ alignItems: "center" }}>
                        <Button
                            type='solid'
                            title='Valider'
                            buttonStyle={styles.validerBtn}
                            titleStyle={{ fontFamily: "BarlowCondensed-SemiBold", fontSize: 20, color: '#FF5A5D' }}
                            raised
                            onPress={() => validerModif()}
                        />
                    </View>
                </View>
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
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

    titre: {
        fontFamily: "BarlowCondensed-SemiBold",
        fontSize: 20,
        color: "white",
        textAlign: "center",
        marginBottom: 10
    },
    input: {
        backgroundColor: "white",
        borderRadius: 8,
        paddingLeft: 10,
        borderBottomWidth: 0
    },
    validerBtn: {
        backgroundColor: 'white',
        borderRadius: 150,
        paddingHorizontal: 30,
    },
});



export default MonCompte