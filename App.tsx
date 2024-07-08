import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {HelloWorld} from "./screens/HelloWorld";
import {Register} from "./screens/Register";
import {SignIn} from "./screens/SignIn";
import {Screens} from "./helpers/screens.enum";
import {PaperProvider} from "react-native-paper";
import {AuthContext} from "./helpers/context/Auth";
import {useEffect, useState} from "react";
import {EnvContext} from "./helpers/context/env";
import {EnvDto} from "./helpers/dto/env.dto";
import {CreateRoom} from "./screens/room/CreateRoom";
import {RoomDto} from "./helpers/dto/room/room.dto";
import {ListRoom} from "./screens/room/ListRoom";
import {PostStat} from "./screens/stats/PostStat";
import Config from "react-native-config";
import {Simulate} from "react-dom/test-utils";
import compositionStart = Simulate.compositionStart;
import {authDataDto} from "./helpers/dto/authData.dto";


const Stack = createNativeStackNavigator();

function App() {
    const [env,setEnv]=useState<EnvDto>(null)
    const [auth,setAuth]=useState<authDataDto>()


    const [loading,setLoading]=useState<boolean>(true)

    useEffect(() => {
        if(env===null) {
            setAuth({
                SetNewestRoom(room: RoomDto): void {
                },
                Update(name: string, token: string, Uid: number): void {
                },
                room: {
                    ID: -1,
                    user_id: 0,
                    name: '1'
                },
                username: "",
                token: "1",
                Uid: -1,
                bearer: "1"
            })
            console.log("setting env")
            setEnv({api: {url: "http://192.168.0.220", port: "2137"}})
            setLoading(false)
        }
    }, []);
    useEffect(() => {
        try{

            console.log(auth.SetNewestRoom)
            console.log(auth.Update)
            console.log("app \n\troomID: "+auth.room.ID+
                "\n\tuserID: "+auth.Uid+
                "\n\ttoken: "+auth.bearer)
        }catch (e) {
        }
    }, [auth]);
    // const setAuth=({
    //                    Uid=auth.Uid,
    //                    room= auth.room,
    //                    token =auth.token,
    //                    username = auth.username,
    //                    bearer=auth.bearer
    // })=>{
    //     console.log("AAAA")
    //     setAuth1({
    //         SetNewestRoom: setCurrentRoom,
    //         Uid,
    //         Update:updateAuth,
    //         room,
    //         token,
    //         username,
    //         bearer
    //     })
    // }
    function updateAuth(name:string,token:string,Uid:number){
        console.log(name+" "+token+" "+Uid)
        // console.log(name)
        setAuth({
            SetNewestRoom(room: RoomDto): void {
            }, Update(name: string, token: string, Uid: number): void {
            },
            username: name,
            token: token,
            Uid: Uid,
            bearer: "Bearer " + token,
            room:auth.room
        })

    }
    function setCurrentRoom(room:RoomDto) {
        // console.log("setting room:"+auth.Uid)
        console.log("setting room:"+{...auth})
        setAuth({
            SetNewestRoom(room: RoomDto): void {
            }, Uid: 0, Update(name: string, token: string, Uid: number): void {
            }, bearer: "", token: "", username: "",
            room:room
        })
    }
    if(loading){
        return <></>
    }

    return (
        <EnvContext.Provider value={env}>
        <AuthContext.Provider value={auth}>
    <PaperProvider>
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={Screens.Home}
    screenOptions={{ headerShown: true }}
>
    <Stack.Screen name={Screens.Home} component={HelloWorld} options={{text:"home",navigation:Stack}}  />
    <Stack.Screen name={Screens.RoomList} component={ListRoom} options={{navigation: Stack}}/>
    <Stack.Screen name={Screens.PostStat} component={PostStat} options={{navigation: Stack}}/>
    {/*{auth.Uid!==-1&&*/}
    {/*    <>*/}
            <Stack.Screen name={Screens.RoomCreate} component={CreateRoom} options={{navigation:Stack}}/>

    {/*    </>*/}
    {/*}*/}
    {/*{auth.Uid===-1&&*/}
    {/*<>*/}
        <Stack.Screen name={Screens.Register} component={Register} options={{navigation:Stack}}/>
        <Stack.Screen name={Screens.Login} component={SignIn} options={{navigation: Stack}}/>
    {/*</>*/}
    {/*}*/}

    </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
    </AuthContext.Provider>
    </EnvContext.Provider>
);
}
export default App;