import React from "react";
import {View,Text} from "react-native";
import {
    SafeAreaProvider,
    useSafeAreaInsets,
} from 'react-native-safe-area-context';

export const HelloWorld = ({text="hello World"}) => {

    const insets = useSafeAreaInsets();
    return (
        <View style={{
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',

            // Paddings to handle safe area
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        }}>
            <Text>This is top text.</Text>
            <Text>{text}</Text>
            <Text>This is bottom text.</Text>
        </View>
    )
}