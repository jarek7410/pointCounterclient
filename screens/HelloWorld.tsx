import React from "react";
import {View, Text} from "react-native";
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Screens} from "../helpers/screens.enum";
import { Button } from "react-native-paper";
import Spacer from "../components/spacer";
import SafeAreaView from "../components/SafeAreaView";
export const HelloWorld = ({text="hello World",navigation}) => {

    const insets = useSafeAreaInsets();
    return (
        <SafeAreaView
        >
            <Text>This is top text.</Text>
            <Text>{text}</Text>
            <View>
                <Button mode="contained" onPress={()=>navigation.navigate(Screens.Register)}>register</Button>
                <Spacer height={10}/>
                <Button mode={"contained"} onPress={()=>navigation.navigate(Screens.Login)}>login</Button>
            </View>
            <Text>This is bottom text.</Text>
        </SafeAreaView>
    )
}