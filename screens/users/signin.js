import React, { useState, useEffect } from 'react';
import { 
    Text, 
    View, 
    StyleSheet, 
    AsyncStorage, 
    StatusBar, 
    KeyboardAvoidingView, 
    Keyboard, 
    SafeAreaView, 
    TouchableWithoutFeedback, 
    Dimensions
} from 'react-native';
import { Input, Button, Overlay } from 'react-native-elements';
//Redux
import {connect} from 'react-redux';
//Images SVG
import Logo from '../../assets/images/logo-fourno.svg';

function SignIn({ navigation, sendPrenomToRedux }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isVisible, setIsVisible] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {

        var retrieveInfo = () => {
            AsyncStorage.getItem("user",
            function (error, data) {
                if(data){
                    console.log(data)
                    data = JSON.parse(data)
                    
                    sendPrenomToRedux(data.prenom)
                   navigation.navigate("Accueil")
                }
            })
        }

        retrieveInfo()
    }, [])

    var connecter = async () => {
            var body = {
                email: email,
                password: password
            }

            var bodyToSend = JSON.stringify(body)

            let checkConnect = await fetch("https://protected-anchorage-65968.herokuapp.com/users/signin", {
                method: "POST",
                body: bodyToSend,
                headers: { 'Content-Type': 'application/json' }
            })

            let response = await checkConnect.json()

            if (response.result) {

                var user = {
                    email : response.user.email,
                    prenom : response.user.prenom
                }

                AsyncStorage.setItem("user", JSON.stringify(user))
                sendPrenomToRedux(response.user.prenom)
                navigation.navigate('Accueil')
            } else {
                if (response.error === "mail") {
                    setError("Adresse e-mail non valide")
                } else {
                    setError("Mot de passe non valide")
                }
                setIsVisible(true)
                setTimeout(() => setIsVisible(false), 2000)
            }
    }

    return (
        <KeyboardAvoidingView style={{flex: 1, backgroundColor: "#FF5A5D"}} behavior={Platform.OS == "ios" ? "padding" : "height"}>
            <SafeAreaView style={{flex: 1}}>
            <StatusBar barStyle="light-content" backgroundColor="#FF5A5D" />
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.global}>
                        <Overlay isVisible={isVisible}>
                            <Text>{error}</Text>
                        </Overlay>
                        <View style={styles.logoContainer}>
                            <Logo height='100%' width='100%' />
                        </View>
                        <View style={styles.connect}>
                            <Input 
                                placeholderTextColor="#ADADAD" 
                                keyboardType="email-address" 
                                onChangeText={(text) => setEmail(text)} 
                                placeholder="Email" 
                                inputContainerStyle={styles.input}
                                inputStyle={{ fontFamily: "BarlowCondensed-Regular", fontSize: 20 }}
                            />
                            <Input 
                                placeholderTextColor="#ADADAD" 
                                textContentType="oneTimeCode" 
                                secureTextEntry={true} 
                                onChangeText={(text) => setPassword(text)} 
                                placeholder="Mot de passe" 
                                inputContainerStyle={styles.input}
                                inputStyle={{ fontFamily: "BarlowCondensed-Regular", fontSize: 20 }}
                            />
                            <Button
                                title="Se connecter"
                                type="solid"
                                containerStyle={{ padding: 20 }}
                                buttonStyle={styles.button}
                                containerStyle={{ marginBottom: 5 }}
                                titleStyle={{fontFamily: "BarlowCondensed-SemiBold", fontSize: 20}}
                                onPress={() => connecter()}
                            />
                        </View>
                        <View style={styles.pasInscritContainer}>
                            <Text style={styles.pasInscrit}>
                                Pas encore inscrit.e ?  <Text
                                    style={{ textDecorationLine: "underline", color: "#01B393", }}
                                    onPress={() => navigation.navigate('SignUp')}
                                >
                                    Créez votre compte !
                                </Text>
                            </Text>
                        </View>
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
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    //Logo
    logoContainer: {
        width: logoWidth,
        height: logoHeight,
        marginVertical: 40
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
    //Texte en bas de l'écran
    pasInscritContainer: {
        flex: 1, 
        backgroundColor: 'white', 
        justifyContent: 'flex-end', 
        alignItems:'center',
        paddingTop: 20,
        width: '100%'
    },
    pasInscrit: {
        color: "#666666", 
        marginBottom: 20, 
        fontFamily: "BarlowCondensed-Regular", 
        fontSize: 18,
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
    },
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
)(SignIn)