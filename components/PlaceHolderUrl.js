import React from 'react'
import { Placeholder, PlaceholderLine, PlaceholderMedia, ShineOverlay, Fade, Shine } from 'rn-placeholder'
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions'
import { View } from 'react-native'

function PlaceHolderUrl() {


    return (
        <View style={{ flex: 1, backgroundColor: "#FF5A5B", justifyContent: "center" }}>
            <Placeholder Animation={Shine}
                style={{
                    marginVertical: 0,
                    borderRadius: 0,
                    marginTop: 100,
                    flex: 1
                }}>
                <View style={{ flexDirection: "column", justifyContent: "center" }}>

                    <View style={{ paddingLeft: 0, paddingRight: 0, justifyContent: "center", alignItems: "center" }}>
                        {/* <PlaceholderLine width={100} height={200} style={{ backgroundColor: "#FFC830" }} /> */}
                        <PlaceholderMedia style={{ borderRadius: 0, height: 200, width: "100%", marginBottom: 50 }} />
                        <PlaceholderLine width={90} height={5} />

                    </View>
                    <View style={{marginTop: 20, paddingLeft: 15}}>
                        <PlaceholderLine width={40} height={30} />
                    </View>
                    <View style={{marginTop: 20, alignItems: "center"}}>
                        <PlaceholderLine width={80} height={30} />
                    </View>
                    <View style={{marginTop: 20, alignItems: "center"}}>
                        <PlaceholderLine width={90} height={5} />
                    </View>
                    <View style={{marginTop: 20, paddingLeft: 15}}>
                        <PlaceholderLine width={40} height={30} />
                    </View>
                    <View style={{marginTop: 20, alignItems: "center"}}>
                        <PlaceholderLine width={60} height={50} />
                    </View>
                    <View style={{marginTop: 20, alignItems: "center"}}>
                        <PlaceholderLine width={90} height={5} />
                    </View>
                    <View style={{marginTop: 20, paddingLeft: 15}}>
                        <PlaceholderLine width={40} height={30} />
                    </View>
                    <View style={{marginTop: 20, paddingLeft: 15}}>
                        <PlaceholderLine width={50} height={20} />
                    </View>
                    <View style={{marginTop: 20, alignItems: "center"}}>
                        <PlaceholderLine width={90} height={30} />
                    </View>
                    <View style={{marginTop: 20, alignItems: "center"}}>
                        <PlaceholderLine width={30} height={30} />
                    </View>
                </View>
            </Placeholder>
        </View>
    )
}

export default PlaceHolderUrl