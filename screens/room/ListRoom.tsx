import React, {useContext, useEffect, useState} from "react";
import {RoomDto} from "../../helpers/dto/room/room.dto";
import {EnvContext} from "../../helpers/context/env";
import SafeAreaView from "../../components/SafeAreaView";
import {FlatList, TouchableHighlight, View} from "react-native";
import {Button, Card, Text} from "react-native-paper";
import Spacer from "../../components/spacer";

export const ListRoom=({navigation})=>{
    const [roomList,setRoomList] = useState<RoomDto[]>()
    const env=useContext(EnvContext)
    useEffect(()=> {
            effect().then()
        },[]);
    const effect=async () => {
        let request:Response
        while (true) {
            request = await fetch(env.api.url + ':' + env.api.port + '/api/view/rooms/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if(request.ok){
                console.log("list loaded")
                break
            }
            if(!request.ok){
                console.log(request.status)
            }
        }
        const data:RoomDto[]=await request.json()
        setRoomList(data)

    }
    return(
        <SafeAreaView>
            <FlatList
                data={roomList}
                // ItemSeparatorComponent={(()=>{
                //         <Spacer height={10}/>
                //     })
                // }
                ItemSeparatorComponent={

                    (({highlighted}) => (
                        <Spacer height={10}/>
                    ))
                }
                renderItem={({item,index})=>(
                    <>
                        <Card mode={"contained"}>
                            <Card.Title title={item.name}/>
                            <Card.Actions>
                                <Button>Cancel</Button>
                                <Button>Ok</Button>
                            </Card.Actions>
                        </Card>
                        {/*<Text>item.name</Text>*/}
                    </>


                )}
            />
        </SafeAreaView>
    )
}