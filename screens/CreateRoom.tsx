import {View} from "react-native";
import {Button, customText, Switch, Text} from "react-native-paper";
import React, {useContext, useState} from "react";
import SignInUpTextInput from "../components/SignInUpTextInput";
import Spacer from "../components/spacer";
import {EnvContext} from "../helpers/context/env";
import {AuthContext} from "../helpers/context/Auth";

export const CreateRoom=({navigation})=>{
    const [RoomName,setRoomName]=useState<string>("")

    const env = useContext(EnvContext)
    const auth=useContext(AuthContext)
    const createRoom=async ()=>{
        const response=await fetch(env.api.url+':'+env.api.port+'/api/room',{
            method: 'POST',
            headers:{
                'Authorization': auth.bearer,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name:RoomName
            })
        })

    }
    return(
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            {/*<Text>text for</Text>*/}
            <SignInUpTextInput placeholder={"Room Name"} onChangeText={setRoomName} value={RoomName} label={undefined}/>
            {RoomName.length>0&&
                <>
                    <Spacer height={50}/>
                    <Button mode={"contained"} onPress={()=>{}}>Create</Button>
                </>
            }
        </View>
    )
}