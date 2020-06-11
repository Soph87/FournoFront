import React, { useEffect, useState, useRef } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import {Button} from 'react-native-elements'
import { Camera } from 'expo-camera'
import FlecheRetour from '../../../assets/images/icones/fleche-retour.svg'
import { FontAwesome } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import { connect } from 'react-redux';

function PhotoCamera({ navigation, clickCancelPhoto, sendPhoto }) {

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    var camera = useRef(null)

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
            <Camera style={{ flex: 1 }} type={type} ref={ref => camera = ref}>

                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                    }}>
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", padding: 15 }}>
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
                        <TouchableOpacity>
                                

                            <Button
                                title="Snap"
                                buttonStyle={{borderRadius: 10, backgroundColor: "transparent", marginBottom: 40}}
                                icon={<FontAwesome name="floppy-o" size={24}
                                    color="white"
                                    style={{ paddingRight: 10 }} />}
                                onPress={async () => {
                                    if (camera) {
                                        let photo = await camera.takePictureAsync(
                                            {

                                                quality: 0.7,
                                                base64: true,
                                                exif: true
                                            }
                                        )

                                        if (photo.uri.startsWith('/')) {
                                            photo.uri = 'file://' + photo.uri
                                        }
                                        console.log(photo.uri)
                                        MediaLibrary.saveToLibraryAsync(photo.uri)
                                        sendPhoto(photo.uri)
                                        clickCancelPhoto()
                                    };

                                }
                                }
                            />


                            
                        </TouchableOpacity>
                        <TouchableOpacity>
                        <Text style={{ fontSize: 18, marginBottom: 50, color: 'white' }} onPress={() => navigation.goBack()}>Retour</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Camera>
        </View>
    );
}

function mapDispatchToProps(dispatch){
    return {
        sendPhoto: function(photo){
            dispatch({type: 'addPhoto', photo})
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(PhotoCamera)