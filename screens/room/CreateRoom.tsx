import {View} from "react-native";
import {ActivityIndicator, Button, customText, Switch, Text} from "react-native-paper";
import React, {useContext, useState} from "react";
import SignInUpTextInput from "../../components/SignInUpTextInput";
import Spacer from "../../components/spacer";
import {EnvContext} from "../../helpers/context/env";
import {AuthContext} from "../../helpers/context/Auth";

export const CreateRoom=({navigation})=>{
    const [RoomName,setRoomName]=useState<string>("")
    const [loading,setLoading] = React.useState<boolean>(false)


    const env = useContext(EnvContext)
    const auth=useContext(AuthContext)
    const createRoom=async ()=>{
        setLoading(true)
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
        if(!response.ok){
            console.log("response error:"+response.status)
            setLoading(false)
            return
        }
        const data=await response.json()
        console.log("roomID: "+ data.room.ID)
        auth.SetNewestRoom(data.room)
        navigation.goBack()
    }
    return(
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            {/*<Text>text for</Text>*/}
            <SignInUpTextInput placeholder={"Room Name"} onChangeText={setRoomName} value={RoomName} label={undefined}/>
            <Spacer height={50}/>
            {RoomName.length>0&&!loading&&
                <>
                    <Button mode={"contained"} onPress={createRoom}>Create</Button>
                </>
            }
            {loading&&
                <ActivityIndicator animating={true} size={"large"}/>
            }
        </View>
    )
}