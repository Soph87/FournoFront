import React, { useEffect, useState } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Camera } from 'expo-camera'
import FlecheRetour from '../../../assets/images/icones/fleche-retour.svg'

function PhotoCamera({navigation, clickCancelPhoto}) {

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }} type={type}>

                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                    }}>
                    <View style={{flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", padding: 15}}>
                        <TouchableOpacity
                  
                            onPress={() => {
                                setType(
                                    type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back
                                );
                            }}>
                            <Text style={{ fontSize: 18, marginBottom: 50, color: 'white' }}> Flip </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                           onPress={() => {
                                clickCancelPhoto()
                           }}>
                            <Text style={{ fontSize: 18, marginBottom: 50, color: 'white' }}>Retour</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Camera>
        </View>
    );
}

export default PhotoCamera