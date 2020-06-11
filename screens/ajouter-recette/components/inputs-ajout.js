import React, { useState } from 'react';
import { Input } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import Poubelle from '../../../assets/images/icones/poubelle.svg';

export default function input(props) {
    const [texte, setTexte] = useState('');
    const [poubelle, setPoubelle] = useState(false)

    const handleEditingEnd = (keyName, value, index) => {
        if(keyName === 'affichePoubelle' && value.length >= 1) {
            setPoubelle(true);
        } else {
            setPoubelle(false);
        }
        props.handleEditingParent(keyName, value, index);
    }

    const handleSupp = (index) => {
        props.handleSuppParent(index)
    }

    let icone;
    if(poubelle) {
        icone = <Poubelle width={30} height={30} onPress={() => handleSupp(props.index) } />
    }


    return (
        <Input
            value = {props.value}
            label={props.label}
            placeholderTextColor="#ADADAD" 
            onChangeText={(text) => setTexte(text)}
            value= {texte}
            placeholder={props.placeholder} 
            inputContainerStyle={styles.input}
            inputStyle={{ fontFamily: "BarlowCondensed-Regular", fontSize: 20 }}
            labelStyle={styles.label}
            onEndEditing={() => handleEditingEnd(props.keyName, texte, props.index)}
            rightIcon={ icone }
            renderErrorMessage={false}
            multiline
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
        //paddingBottom: 8
    },
    label: {
        color: 'white',
        fontFamily: "BarlowCondensed-SemiBold",
        fontSize: 20,
        marginBottom: 5
    }
});