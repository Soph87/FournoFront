import React from 'react'
import { Text, View, StyleSheet } from 'react-native';
import { Input, Button, Header } from 'react-native-elements';
import FlecheRetour from '../assets/fleche-retour.svg'


function SignUp({ navigation }) {

    const [prenom, setPrenom] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    var enregistrer = () => {

        

        await fetch("http://192.168.1.23:3000", {
            method: "POST",
            
        })
    }

    return (
        <View style={styles.global}>
            <Header
                centerComponent={{ style: { color: '#fff' } }}
                barStyle="light-content"
                containerStyle={{ backgroundColor: '#FF5A5D', borderBottomWidth: 0 }}
                centerComponent={{ text: 'Signup', style: { color: '#fff', fontSize: 18 } }}
            >
                <FlecheRetour width={30} height={30} fill={"white"} onPress={() => { navigation.navigate('Home') }} />
            </Header>
            <View style={{ alignItems: "center" }}>
                <Text style={{ color: "white", fontSize: 60 }}>Fourneaux</Text>
                <Text style={{ color: "white", fontSize: 60, marginBottom: 50 }}>&Cie</Text>
                <View style={styles.connect}>
                    <Input placeholderTextColor="#ADADAD" placeholder="Prénom" onChangeText={text => setPrenom(text)} inputContainerStyle={styles.input} />
                    <Input placeholderTextColor="#ADADAD" placeholder="Email" onChangeText={text => setEmail(text)} inputContainerStyle={styles.input} />
                    <Input placeholderTextColor="#ADADAD" placeholder="Mot de passe" inputContainerStyle={styles.input} onChangeText={text => setPassword(text)} />
                    <Button title="S'enregistrer" type="solid" containerStyle={{ padding: 20 }} onPress={() => enregistrer()} buttonStyle={styles.button} containerStyle={{ marginBottom: 5 }} />
                </View>
            </View>
            <Text style={{ color: "white", textAlign: "center", marginBottom: 10 }}>© Fourneaux&Cie 2020</Text>
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
    }
});


export default SignUp