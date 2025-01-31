import React, {useState} from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Input, Button } from 'react-native-elements';
import FlecheRetour from '../../assets/images/icones/fleche-retour.svg';
import { connect } from 'react-redux';
import PlaceHolderUrl from '../../components/PlaceHolderUrl';



function ImportUrl({navigation, sendUrlToRedux}) {

    const [isEnabled, setIsEnabled] = useState(false);
    const [urlMarmiton, setUrlMarmiton] = useState('');
    const [isFetching, setIsFetching] = useState(null)


    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    var addUrl = async () => {
        setIsFetching(true)
        const url = await fetch('https://protected-anchorage-65968.herokuapp.com/saveMarmiton', {
          method:"POST",
          headers : {'Content-Type': 'application/x-www-form-urlencoded'},
          body: `lienMarmiton=${urlMarmiton}`
        });
        const newRecette = await url.json();
        
        if(newRecette){
            setIsFetching(false)
            sendUrlToRedux(newRecette);
            navigation.navigate('Recap');
        }
    }

    if(isFetching){
        return (
            <PlaceHolderUrl />
        )
    } else {

   
    
    return (

        <View style={styles.global}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={styles.header}>
                        <FlecheRetour width={30} height={30} onPress={() => { navigation.navigate('Accueil') }} />
                        <Text style={styles.titre}>Accueil</Text>
                        <View/>
                    </View>
                                     
                    <View style={styles.inputContainer}>
                        <Text style={styles.urlTexte}>Entrez le lien de la page où se trouve la recette</Text>
                            <Input 
                                inputContainerStyle={styles.input} 
                                renderErrorMessage={false} 
                                placeholder='lien vers la recette'
                                containerStyle={{ paddingHorizontal: 0 }}
                                inputStyle={{ fontFamily: "BarlowCondensed-Regular", fontSize: 20 }}
                                onChangeText={(e) => setUrlMarmiton(e)} 
                                value={urlMarmiton}
                            />
                    </View>
                    <Button 
                        onPress={() => addUrl() }
                        type='solid'
                        title='Valider' 
                        buttonStyle={styles.validerBtn} 
                        titleStyle={{fontFamily: "BarlowCondensed-SemiBold", fontSize: 20, color: '#FF5A5D'}}
                        containerStyle = {styles.btnPosition}
                        raised
                    />
      
                </View>
            </SafeAreaView>
        </View>
    )
}
}


const styles = StyleSheet.create({
    global: {
        flex: 1, 
        backgroundColor: "#FF5A5D",
        paddingHorizontal: 15,
        paddingTop: 30,
        position: 'relative'
    },
    urlTexte: {
        fontFamily: "BarlowCondensed-SemiBold",
        fontSize: 20,
        color: "#FFF",
        marginBottom: 30,
    },
    //header
    header: {
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center", 
        paddingBottom: 10
    },
    titre: {
        fontFamily: "BarlowCondensed-SemiBold",
        fontSize: 20,
        color: "white"
    },
    inputContainer: {
        justifyContent: 'center', 
        width: "100%",
        alignItems: 'center', 
        marginTop: 20, 
        paddingHorizontal: 15,
        marginBottom: 30
    },
    input: {
        backgroundColor: "#F0F0F0",
        borderRadius : 150,
        borderBottomWidth: 0,
        paddingHorizontal: 20,
        height: 46,
    },
    btnPosition: {
        position: 'absolute',
        bottom: 15,
        left: '50%',
        transform: [{ translateX: -50 }],
    },
    validerBtn: {
        backgroundColor: 'white',
        borderRadius: 150,
        paddingHorizontal: 30,
    }
})

function mapDispatchToProps(dispatch){
    return{
        sendUrlToRedux: function(newRecette){
            dispatch({type: 'addMarmiton', newRecette})
        }
    }
}

export default connect(null, mapDispatchToProps) (ImportUrl);