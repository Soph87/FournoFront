import React, { useState, useEffect } from 'react'
import {View, StyleSheet, AsyncStorage } from 'react-native';
import {Input, Button, Header, Text, ThemeProvider } from 'react-native-elements';
import Popover from 'react-native-popover-view';


function SignIn({ navigation }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
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

    useEffect(() => {

        var retrieveInfo = () => {
            AsyncStorage.getItem("user",
            function (error, data) {
                if(data){
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
        <ThemeProvider theme={theme}>
            <View style={styles.global}>

            <Header
                barStyle="light-content"
                containerStyle={{ backgroundColor: '#FF5A5D', borderBottomWidth: 0 }}
                centerComponent={{ text: 'Connection', style: { color: '#fff', fontSize: 18 } }}

            >
            </Header>
            <View style={{ alignItems: "center" }}>
                <Popover
                    isVisible={isVisible}
                    popoverStyle={styles.popover}
                >
                    <Text>{error}</Text>
                </Popover>
                <Text style={{ color: "white", fontSize: 60 }}>Fourneaux</Text>
                <Text style={{ color: "white", fontSize: 60, marginBottom: 50 }}>&Cie</Text>
                <View style={styles.connect}>
                    <Input placeholderTextColor="#ADADAD" onChangeText={(text) => setEmail(text)} placeholder="Email" inputContainerStyle={styles.input} />
                    <Input placeholderTextColor="#ADADAD" secureTextEntry={true} onChangeText={(text) => setPassword(text)} placeholder="Mot de passe" inputContainerStyle={styles.input} />
                    <Button
                        title="Se connecter"
                        type="solid"
                        containerStyle={{ padding: 20 }}
                        buttonStyle={styles.button}
                        containerStyle={{ marginBottom: 5 }}
                        onPress={() => connecter()}
                    />
                    <Text style={{ alignSelf: "center", color: "#666666", marginTop: 20 }}>
                        Pas encore inscrit.e ?
                        <Text
                            style={{ textDecorationLine: "underline", color: "#01B393" }}
                            onPress={() => navigation.navigate('SignUp')}
                        >
                            Créez votre compte !
                        </Text>
                    </Text>
                </View>
            </View>
            <View style={{ marginBottom: 10 }}>

                <Text style={{ color: "white", textAlign: "center" }}>© Fourneaux&Cie 2020</Text>
            </View>
        </View>
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
        paddingHorizontal: 30
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
        borderTopColor: "#FFC830",
        borderBottomColor: "#FFC830",
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


export default SignIn