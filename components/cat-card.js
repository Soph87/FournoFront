import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight } from 'react-native';
import Selection from '../assets/images/icones/selection.svg';

export default function CatCard(props) {
    const [isSelected, setIsSelected] = useState(false);
    
    useEffect(() => {
        if(props.selection) {
            let titre = props.titre.toLowerCase();
            titre = titre.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

            if(props.selection.indexOf(titre) != -1) {
                setIsSelected(true)
            }
        }
    }, [])
    
    
    const handlePress = () => {
        setIsSelected(!isSelected);
        props.handlePressParent(props.titre);
        
    }


    let valide;
    if(isSelected) {
        valide = <View style={{position: 'absolute', right: 5, top: 5, zIndex: 3}} >
                    <Selection width={30} height={30}/>
                </View>
    }
    
    return (
        <TouchableHighlight 
            style={[styles.categories, {width: props.maxwidth}]} 
            onPress={() => handlePress()}
            activeOpacity={0.6}
            underlayColor= '#EC9400'
        >
            <View style={styles.catInner}>
                {valide}
                <Image
                    source={props.image}
                    style={{ width: '100%' }}
                    resizeMode='contain'
                />
                <Text style={styles.texteCat}>{props.titre}</Text>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    categories: {
        marginBottom: 15,
        position: 'relative',
        paddingHorizontal: 3       
    },
    catInner: {
        padding: 10,
        backgroundColor: '#FFC830',
        borderRadius: 8,
    },
    texteCat: {
        textAlign: 'center',
        color: '#DB0A5B',
        marginTop: 0,
        fontFamily: "BarlowCondensed-SemiBold",
        fontSize: 20
    },
});