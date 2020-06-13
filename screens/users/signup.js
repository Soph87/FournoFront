import React, { useState } from 'react'
import { View, StyleSheet, AsyncStorage, KeyboardAvoidingView, Keyboard, SafeAreaView, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { Text, Input, Button, Overlay } from 'react-native-elements';
//Images SVG
import FlecheRetour from '../../assets/images/icones/fleche-retour.svg';
import Logo from '../../assets/images/logo-fourno.svg';
//Redux
import { connect } from 'react-redux'

function SignUp({ navigation, sendPrenomToRedux,sendTokenToRedux }) {

    const [prenom, setPrenom] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isVisible, setIsVisible] = useState(false)
    const [error, setError] = useState("")

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
            var user = {
                email : response.user.email,
                prenom : response.user.prenom,
                token : response.user.token
            }
            AsyncStorage.setItem("user", JSON.stringify(user))
            sendPrenomToRedux(prenom)
            sendTokenToRedux(response.user.token)
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
        <KeyboardAvoidingView style={{flex: 1, backgroundColor: "#FF5A5D"}} behavior={Platform.OS == "ios" ? "padding" : "height"}>
            <SafeAreaView style={{flex: 1}}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.global}>
                        <Overlay isVisible={isVisible}>
                            <Text>{error}</Text>
                        </Overlay>
                        <View style={{paddingHorizontal: 15, paddingTop: 10}}>
                            <FlecheRetour width={30} height={30} onPress={() => { navigation.navigate('Home') }} />
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <View style={styles.logoContainer}>
                                <Logo height='100%' width='100%' />
                            </View>
                        </View>
                        <View style={styles.connect}>
                            <Input 
                                placeholderTextColor="#ADADAD" 
                                placeholder="Prénom" 
                                onChangeText={text => setPrenom(text)} 
                                inputContainerStyle={styles.input}
                                inputStyle={{ fontFamily: "BarlowCondensed-Regular", fontSize: 20 }}
                            />
                            <Input 
                                placeholderTextColor="#ADADAD" 
                                keyboardType="email-address" placeholder="Email" 
                                onChangeText={text => setEmail(text)} 
                                inputContainerStyle={styles.input} 
                                inputStyle={{ fontFamily: "BarlowCondensed-Regular", fontSize: 20 }}
                            />
                            <Input 
                                placeholderTextColor="#ADADAD" 
                                secureTextEntry={true} 
                                textContentType="oneTimeCode" 
                                placeholder="Mot de passe" 
                                inputContainerStyle={styles.input} 
                                onChangeText={text => setPassword(text)}
                                inputStyle={{ fontFamily: "BarlowCondensed-Regular", fontSize: 20 }}
                            />
                            <Button 
                                title="S'enregistrer" 
                                type="solid" 
                                containerStyle={{ padding: 20 }} 
                                onPress={() => enregistrer()} 
                                buttonStyle={styles.button} 
                                containerStyle={{ marginBottom: 5 }}
                                titleStyle={{fontFamily: "BarlowCondensed-SemiBold", fontSize: 20}}
                            />
                        </View>
                        <View style={{flex: 1, backgroundColor: 'white'}} />
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

//Calcul des dimensions du container du logo
const win = Dimensions.get('window');
const logoWidth = 90 * win.width / 100;
const logoHeight = (logoWidth * 300) / 520

const styles = StyleSheet.create({
    global: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    //Logo
    logoContainer: {
        width: logoWidth,
        height: logoHeight,
        marginBottom: 40,
        marginTop: 10
    },
    // Inputs de connection
    connect: {
        backgroundColor: "white",
        paddingVertical: 20,
        width: "100%",
        alignItems: "center",
    },
    input: {
        backgroundColor: "#F0F0F0",
        borderRadius: 150,
        paddingHorizontal: 20,
        borderBottomWidth: 0
    },
    button: {
        backgroundColor: "#FF5A5D",
        borderRadius: 150,
        paddingHorizontal: 30
    },
    //Popup d'erreur
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
        },
        sendTokenToRedux: function(token){
            dispatch({type: 'addToken', token})
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(SignUp)