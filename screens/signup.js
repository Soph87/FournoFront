import React, { useState } from 'react'
import { View, StyleSheet, AsyncStorage, KeyboardAvoidingView } from 'react-native';
import { Text, Input, Button, Header, ThemeProvider, Overlay } from 'react-native-elements';
import FlecheRetour from '../assets/images/fleche-retour.svg'
import {connect} from 'react-redux'

function SignUp({ navigation, sendPrenomToRedux }) {

    const [prenom, setPrenom] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isVisible, setIsVisible] = useState(false)
    const [error, setError] = useState("")

    const theme = {
        Button: {
            titleStyle: {
                color: '#FFFFFF',
                fontFamily: "BarlowCondensed-SemiBold",
            },
        },
        Input: {
            inputStyle: {
                color: "#ADADAD",
                fontFamily: "BarlowCondensed-Regular",
            },
        },
        Text: {
            style: {
                fontFamily: "BarlowCondensed-Regular",
            },
        }
    };

    var enregistrer = async () => {

        var body = {
            prenom: prenom,
            email: email,
            password: password
        }

        var bodyToSend = JSON.stringify(body)

        let registerToDb = await fetch("https://protected-anchorage-65968.herokuapp.com/users/signup", {
            method: "POST",
            body: bodyToSend,
            headers: { 'Content-Type': 'application/json' }
        })

        let response = await registerToDb.json()

        if (response.result) {
            AsyncStorage.setItem("email", response.user.email)
            sendPrenomToRedux(prenom)
            navigation.navigate('Accueil')
        } else {
            if (response.error === "mail") {
                setError("Adresse mail déjà utilisée")

            } else {
                setError("Quelque chose s'est mal passé")
            }
            setIsVisible(true)
            setTimeout(() => setIsVisible(false), 2000)

        }
    }

    return (
        <ThemeProvider theme={theme}>
            <KeyboardAvoidingView style={styles.global} behavior="padding">
                <Header
                    centerComponent={{ style: { color: '#fff' } }}
                    barStyle="light-content"
                    containerStyle={{ backgroundColor: '#FF5A5D', borderBottomWidth: 0 }}
                    centerComponent={{ text: 'Signup', style: { color: '#fff', fontSize: 18 } }}
                >
                    <FlecheRetour width={30} height={30} fill={"white"} onPress={() => { navigation.navigate('Home') }} />
                </Header>
                <View style={{ alignItems: "center" }}>
                    <Overlay
                        isVisible={isVisible}

                    >
                        <Text>{error}</Text>
                    </Overlay>
                    <Text style={{ color: "white", fontSize: 60 }}>Fourneaux</Text>
                    <Text style={{ color: "white", fontSize: 60, marginBottom: 50 }}>&Cie</Text>
                    <View style={styles.connect}>
                        <Input placeholderTextColor="#ADADAD" placeholder="Prénom" onChangeText={text => setPrenom(text)} inputContainerStyle={styles.input} />
                        <Input placeholderTextColor="#ADADAD" keyboardType="email-address" placeholder="Email" onChangeText={text => setEmail(text)} inputContainerStyle={styles.input} />
                        <Input placeholderTextColor="#ADADAD" secureTextEntry={true} textContentType="oneTimeCode" placeholder="Mot de passe" inputContainerStyle={styles.input} onChangeText={text => setPassword(text)} />
                        <Button title="S'enregistrer" type="solid" containerStyle={{ padding: 20 }} onPress={() => enregistrer()} buttonStyle={styles.button} containerStyle={{ marginBottom: 5 }} />
                    </View>
                </View>
                <Text style={{ color: "white", textAlign: "center", marginBottom: 10 }}>© Fourneaux&Cie 2020</Text>
            </KeyboardAvoidingView>
        </ThemeProvider>
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: "#F0F0F0",
        borderRadius: 150,
        maxWidth: "85%",
        alignSelf: "center",
        paddingHorizontal: 20,
        borderBottomWidth: 0
    },
    button: {
        backgroundColor: "#FF5A5D",
        borderRadius: 150,
        paddingHorizontal: 30,
    },
    global: {
        backgroundColor: "#FF5A5D",
        flex: 1,
        justifyContent: "space-between"
    },
    connect: {
        backgroundColor: "white",
        paddingVertical: 20,
        width: "100%",
        alignItems: "center",
        borderTopColor: "#01B393",
        borderBottomColor: "#01B393",
        borderStyle: "solid",
        borderTopWidth: 2,
        borderBottomWidth: 2
    },
    popover: {
        height: 40,
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#FFC830",
        borderRadius: 5,
        padding: 10
    }
});


function mapDispatchToProps(dispatch){
    return {
        sendPrenomToRedux: function(prenom){
            dispatch({type: 'addPrenom', prenom})
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(SignUp)