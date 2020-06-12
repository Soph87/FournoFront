import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, ImageBackground, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

import { connect } from 'react-redux';

//Icones
import FlecheRetour from '../../assets/images/icones/fleche-retour.svg';
import Home from '../../assets/images/icones/home.svg';
import AppareilPhoto from '../../assets/images/icones/photo.svg';
import Poubelle from '../../assets/images/icones/poubelle.svg'
import Photo from '../../assets/images/icones/appareil-photo.svg';

import PhotoCamera from '../rechercher-recette/components/photo';


function AjoutPhoto({ navigation, photoToDisplay }) {
    const [photo, setPhoto] = useState(false);

    const handleValider = () => {
        navigation.navigate('RecapManuel');
    }
    var cancelPhoto = () => {
        setPhoto(false)
    }

var photoBackGround;
    if (photoToDisplay === "") {
        photoBackGround = <ImageBackground source={require('../../assets/images/no-photo.png')} style={styles.backgroundImg}>
            <View style={styles.boutonsContainer}>
                <AppareilPhoto width={30} height={30} onPress={() => { setPhoto(true) }} />
                <Photo width={30} height={30} />
                <Poubelle width={30} height={30} />
            </View>
        </ImageBackground>
    } else {
        photoBackGround =   <ImageBackground source={{uri : photoToDisplay}} style={styles.backgroundImg}>
            <View style={styles.boutonsContainer}>
                <AppareilPhoto width={30} height={30} onPress={() => { setPhoto(true) }} />
                <Photo width={30} height={30} />
                <Poubelle width={30} height={30} />
            </View>
        </ImageBackground>
    }


    if (photo) {
        return (
            <PhotoCamera navigation={navigation} clickCancelPhoto={cancelPhoto} />
        )
    } else {
        return (
            <SafeAreaView style={styles.global}>
                <View style={{ flex: 1 }}>
                    <View style={styles.header}>
                        <FlecheRetour width={30} height={30} onPress={() => navigation.goBack()} />
                        <Text style={styles.titre}>Ajouter une photo</Text>
                        <Home width={30} height={30} onPress={() => navigation.navigate('Accueil')} />
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                       {photoBackGround}
                    </View>
                    <View style={styles.bottomNav}>
                        <Button
                            onPress={() => handleValider()}
                            type='solid'
                            title='Valider'
                            buttonStyle={styles.validerBtn}
                            titleStyle={{ fontFamily: "BarlowCondensed-SemiBold", fontSize: 20, color: '#FF5A5D' }}
                        />
                    </View>
                </View>
            </SafeAreaView>
        )
    }


}

//Dimansion responsive de la photo en 16/9
const win = Dimensions.get('window');

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
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15
    },
    titre: {
        fontFamily: "BarlowCondensed-SemiBold",
        fontSize: 20,
        color: "white"
    },
    //Photo milieu page
    backgroundImg: {
        width: '100%',
        height: 9 * win.width / 16,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    boutonsContainer: {
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        height: 50,
        width: "100%",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: 'space-around'
    },
    //Navigation bas de page
    bottomNav: {
        alignItems: 'center',
        paddingBottom: 15
    },
    validerBtn: {
        backgroundColor: 'white',
        borderRadius: 150,
        paddingHorizontal: 30,
    }
});

function mapStateToProps(state) {
    return {
        photoToDisplay: state.photo
    }
}


export default connect(
    mapStateToProps,
    null
)(AjoutPhoto)