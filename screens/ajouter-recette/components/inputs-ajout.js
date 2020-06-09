import React from 'react';
import { Input } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';

export default function input(props) {
    return (
        <Input 
            label={props.label}
            placeholderTextColor="#ADADAD" 
            //onChangeText={(text) => setPassword(text)} 
            placeholder={props.placeholder} 
            inputContainerStyle={styles.input}
            inputStyle={{ fontFamily: "BarlowCondensed-Regular", fontSize: 20 }}
            labelStyle={styles.label}
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