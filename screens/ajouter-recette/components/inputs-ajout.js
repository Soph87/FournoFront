import React, { useState } from 'react';
import { Input } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import Poubelle from '../../../assets/images/icones/poubelle.svg';

export default function input(props) {
    const [texte, setTexte] = useState('');
    const [poubelle, setPoubelle] = useState(false)

    const handleEditingEnd = (keyName, value) => {
        if(keyName === 'affichePoubelle' && value.length >= 1) {
            setPoubelle(true);
        } else {
            setPoubelle(false);
        }
        props.handleEditingParent(keyName, value);
    }

    let icone;
    if(poubelle) {
        icone = <Poubelle width={30} height={30} />
    }


    return (
        <Input
            label={props.label}
            placeholderTextColor="#ADADAD" 
            onChangeText={(text) => setTexte(text)}
            value= {texte}
            placeholder={props.placeholder} 
            inputContainerStyle={styles.input}
            inputStyle={{ fontFamily: "BarlowCondensed-Regular", fontSize: 20 }}
            labelStyle={styles.label}
            onEndEditing={() => handleEditingEnd(props.keyName, texte)}
            rightIcon={ icone }
        />
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: "#F0F0F0",
        borderRadius: 8,
        paddingHorizontal: 10,
        borderBottomWidth: 0
    },
    label: {
        color: 'white',
        fontFamily: "BarlowCondensed-SemiBold",
        fontSize: 20,
        marginBottom: 5
    }
});