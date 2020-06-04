import React from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { Input, Button, Header } from 'react-native-elements';



function SignIn({navigation}) {
   

    return (
        <View style={styles.global}>
            <Header
                centerComponent={{ style: { color: '#fff' } }}
                barStyle="light-content"
                containerStyle={{backgroundColor: '#FF5A5D', borderBottomWidth:0}}
                centerComponent={{ text: 'Connection', style: { color: '#fff', fontSize: 18 } }}
            >
            </Header>
            <View style={{ alignItems: "center" }}>
                <Text style={{ color: "white", fontSize: 60 }}>Fourneaux</Text>
                <Text style={{ color: "white", fontSize: 60, marginBottom: 50 }}>&Cie</Text>
                <View style={styles.connect}>
                    <Input placeholderTextColor="#ADADAD" placeholder="Email" inputContainerStyle={styles.input} />
                    <Input placeholderTextColor="#ADADAD" placeholder="Mot de passe" inputContainerStyle={styles.input} />
                    <Button title="S'enregistrer" type="solid" containerStyle={{ padding: 20 }} buttonStyle={styles.button} containerStyle={{marginBottom: 5}} />
                    <Text style={{ alignSelf: "center", color: "#666666", marginTop: 20}}>Pas encore inscrit.e ? <Text style={{ textDecorationLine: "underline", color: "#01B393" }} onPress={() => navigation.navigate('SignUp')}>Créez votre compte !</Text></Text>
                </View>
            </View>
            <View style={{marginBottom: 10}}>
                
                <Text style={{ color: "white", textAlign: "center" }}>© Fourneaux&Cie 2020</Text>
            </View>
        </View>
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
    }
});


export default SignIn