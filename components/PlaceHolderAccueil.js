import React from 'react'
import { Placeholder, PlaceholderLine, PlaceholderMedia, ShineOverlay ,Fade, Shine} from 'rn-placeholder'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { View } from 'react-native'

function PlaceHolderAccueil() {


    return (
        <View style={{ flex: 1, backgroundColor: "#FF5A5B" }}>
            <Placeholder Animation={Fade}
                style={{
                    marginVertical: 6,
                    borderRadius: 4,
                    marginTop: 200
                }}>
                <PlaceholderLine width={100} height={30} style={{backgroundColor: "#FF5A5B"}} />
                <View style={{flexDirection: "row", justifyContent: "space-between", paddingLeft: 15, paddingRight: 15}}>
                    <PlaceholderLine width={30} height={100} style={{backgroundColor: "#FFC830"}} />
                    <PlaceholderLine width={30} height={100} style={{backgroundColor: "#FFC830"}}/>
                    <PlaceholderLine width={30} height={100} style={{backgroundColor: "#FFC830"}}/>
                </View>
                <View style={{justifyContent: "flex-end", alignItems: "flex-end"}}>
                    <PlaceholderLine width={30} height={30} />
                </View>
                <View style={{alignItems: "center"}}>
                    <PlaceholderLine width={80} height={50} />
                </View>
                <View style={{alignItems: "center"}}>
                    <PlaceholderLine width={50} height={50} style={{backgroundColor: "#FFC830"}} />
                </View>
            </Placeholder>
        </View>
    )
}

export default PlaceHolderAccueil