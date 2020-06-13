import React, { useState, useEffect } from 'react';
import { Input } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import Poubelle from '../assets/images/icones/poubelle.svg';

export default function input(props) {
    const [texte, setTexte] = useState('');
    const [poubelle, setPoubelle] = useState(false)

    //Si j'ai une value de départ pour l'input fournie par le reducer, je l'assigne à l'état
    useEffect(() => {
        if(props.valueRedux) {
            setTexte(props.valueRedux);
        }
    }, []);

    //Evènement qui se déclenche à la fin de l'édition de l'input
    const handleEditingEnd = (keyName, value, index) => {
        //Affichage ou non de l'icone poubelle
        if(keyName === 'affichePoubelle' && value.length >= 1) {
            setPoubelle(true);
        } else {
            setPoubelle(false);
        }
        props.handleEditingParent(keyName, value, index);
    }

    //Se déclenche au press de la poubelle
    const handleSupp = (index) => {
        props.handleSuppParent(index)
    }

    let icone;
    if(poubelle) {
        icone = <Poubelle width={30} height={30} onPress={() => handleSupp(props.index) } />
    }

    return (
        <Input
            label={props.label}
            placeholderTextColor="#ADADAD"
            onChangeText={(text) => setTexte(text)}
            value= {texte}
            placeholder={props.placeholder} 
            inputContainerStyle={styles.input}
            inputStyle={{ fontFamily: "BarlowCondensed-Regular", fontSize: 20, color: "#666666" }}
            labelStyle={styles.label}
            onEndEditing={() => handleEditingEnd(props.keyName, texte, props.index)}
            rightIcon={ icone }
            renderErrorMessage={false}
            multiline={props.multi}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: "#F0F0F0",
        borderRadius: 8,
        paddingHorizontal: 10,
        borderBottomWidth: 0,
        marginBottom: 10,
        textAlignVertical: 'top',
    },
    label: {
        color: 'white',
        fontFamily: "BarlowCondensed-SemiBold",
        fontSize: 20,
        marginBottom: 5
    }
});