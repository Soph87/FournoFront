import React from 'react'
import { Text, View, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import { Button, Header, Input } from 'react-native-elements';
import Burger from '../assets/images/burger.svg';
import Loupe from '../assets/images/loupe.svg'



function Accueil({navigation}) {
   

    return (
        <View style={styles.global}>
            <Header
                centerComponent={{ style: { color: '#fff' } }}
                barStyle="light-content"
                containerStyle={{backgroundColor: '#FF5A5D', borderBottomWidth:0}}
            >
                <Burger width={30} height={30} />
            </Header>
            <View style={{flex: 0.6, paddingHorizontal: 20}}>
                <Text>Fourneaux</Text><Text>&Cie</Text>
                <Text style={{fontSize: 22, color: 'white', textAlign: 'center'}}>Bonjour Prénom, quelle recette allez-vous préparer aujourd'hui ?</Text>
            </View>
            <View style={{backgroundColor: 'white', flex: 1, paddingHorizontal: 15}}>
                <View style={{display:'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: -55, marginBottom: 25}}>
                    <View style={styles.categories}>
                        <Image
                            source={require('../assets/images/entrees.png')}
                            style={{ width: '100%' }}
                            resizeMode='contain'
                        />
                        <Text style={styles.texteCat}>Entrées</Text>
                    </View>
                    <View style={styles.catmilieu}>
                        <Image
                            source={require('../assets/images/entrees.png')}
                            style={{ width: '100%' }}
                            resizeMode='contain'
                        />
                        <Text style={styles.texteCat}>Entrées</Text>
                    </View>
                    <View style={styles.categories}>
                        <Image
                            source={require('../assets/images/entrees.png')}
                            style={{ width: '100%' }}
                            resizeMode='contain'
                        />
                        <Text style={styles.texteCat}>Entrées</Text>
                    </View>
                </View>
                <View style={{borderBottomWidth: 2, borderBottomColor: '#FF5A5D'}}>
                    <Text onPress={() => navigation.navigate('ListePlats')} style={styles.lienVert}>+ de catégories</Text>
                </View>
                <KeyboardAvoidingView behavior="height" enabled style={styles.inputContainer}>
                    <Input 
                        inputContainerStyle={styles.input} 
                        renderErrorMessage={false} 
                        placeholder='Chercher une recette par mot clé'
                        containerStyle={{paddingHorizontal: 0}}
                    />
                    <Button
                        icon={<Loupe width={30} height={30} />}
                        buttonStyle={styles.inputButton}
                        containerStyle={{borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}
                    />
                </KeyboardAvoidingView>
                <Button title='Ajouter une recette'/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    global: {
        backgroundColor: "#FF5A5D",
        flex: 1,
        justifyContent: "space-between"
    },
    categories: {
        backgroundColor: '#FFC830',
        padding: 10,
        borderRadius: 8,
        flex: 1,
        maxWidth: 115
    },
    catmilieu: {
        backgroundColor: '#FFC830',
        padding: 10,
        borderRadius: 8,
        flex: 1,
        marginHorizontal: 15,
        maxWidth: 115
    },
    texteCat: {
        textAlign: 'center',
        color: '#DB0A5B',
        marginTop: 8
    },
    lienVert: {
        textAlign: 'right',
        color: '#01B393',
        fontSize: 20,
        textDecorationLine: 'underline',
        marginBottom: 10
    },
    inputContainer: {
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 20, 
        paddingHorizontal: 15,
        marginBottom: 60
    },
    input: {
        backgroundColor: "#F0F0F0",
        borderTopLeftRadius : 150,
        borderBottomLeftRadius: 150,
        borderBottomWidth: 0,
        paddingHorizontal: 15,
        height: 46,
    },
    inputButton: {
        backgroundColor: "#F0F0F0",
        borderTopRightRadius: 150,
        borderBottomRightRadius: 150,
        margin: 0,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        padding: 8
    }
});


export default Accueil;