import React from 'react'
import { Placeholder, PlaceholderLine, PlaceholderMedia, ShineOverlay } from 'rn-placeholder'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { View } from 'react-native'

function PlaceHolderAccueil() {


    return (
        <View style={{marginTop: 200}}>
            <Placeholder
                Animation={ShineOverlay}
                style={{
                    marginVertical: 6,
                    marginHorizontal: 15,
                    borderRadius: 4,
                }}
                Left={props => (
                    <PlaceholderMedia
                        style={[
                            props.style,
                            {
                                width: responsiveWidth(35),
                                height: responsiveHeight(16)
                            }
                        ]}
                    />
                )}
                Right={props => (
                    <PlaceholderMedia
                        style={[
                            props.style,
                            {
                                width: responsiveWidth(30),
                                height: responsiveHeight(16)
                            }
                        ]}
                    />
                )}
            >
                <PlaceholderMedia style={{width: responsiveWidth(30), height: responsiveHeight(16)}} />
            </Placeholder>
        </View>
    )
}

export default PlaceHolderAccueil