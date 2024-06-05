import React, {useContext} from "react";
import {View, Text} from "react-native";
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Screens} from "../helpers/screens.enum";
import { Button } from "react-native-paper";
import Spacer from "../components/spacer";
import SafeAreaView from "../components/SafeAreaView";
import {AuthContext} from "../helpers/context/Auth";
export const HelloWorld = ({text="hello World",navigation}) => {
    const auth=useContext(AuthContext)

    const insets = useSafeAreaInsets();
    return (
        <SafeAreaView
        >
            {/*<Text>This is top text.</Text>*/}
            {/*<Text>{text}</Text>*/}
            <View>
                <Button mode={"contained"} onPress={()=>{navigation.navigate(Screens.RoomList)}}>List Room</Button>
                <Spacer height={10}/>
            {auth.Uid===-1&&
                <>
                    <Spacer height={50}/>
                <Button mode="contained" onPress={()=>navigation.navigate(Screens.Register)}>register</Button>
                <Spacer height={10}/>
                <Button mode={"contained"} onPress={()=>navigation.navigate(Screens.Login)}>login</Button>
                </>
            }
            {auth.Uid===-1||
                <>
                    <Button mode="contained" onPress={()=>navigation.navigate(Screens.RoomCreate)}>Create Room</Button>
                    <Spacer height={100}/>
                    <Button mode="contained" onPress={()=>auth.Update("","",-1)}>logout</Button>
                </>
            }
            </View>
            {/*<Text>This is bottom text.</Text>*/}
        </SafeAreaView>
    )
}