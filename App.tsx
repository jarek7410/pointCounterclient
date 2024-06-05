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
import {CreateRoom} from "./screens/CreateRoom";


const Stack = createNativeStackNavigator();

function App() {
    const [token,setToken]=useState("")
    const [username,setUsername]=useState("")
    const [uid,setUid] = useState(-1)
    const [bearer,setBearer]=useState<string>("")
    const [env,setEnv]=useState<EnvDto>()
    useEffect(() => {
        // console.log("try get env!!!")
        //learn how to make env work
        setEnv({api:{url:"http://192.168.0.206",port:"2137"}})
    }, []);
    const updateAuth=(name,token,uid)=>{
        setToken(token)
        setUsername(name)
        setUid(uid)
        setBearer("Bearer "+token)
        console.log(name)
    }

    return (
        <EnvContext.Provider value={env}>
        <AuthContext.Provider value={{username:username,token:token,Uid:uid,bearer:bearer,Update:updateAuth}}>
    <PaperProvider>
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={Screens.Home}
    screenOptions={{ headerShown: true }}
>
    <Stack.Screen name={Screens.Home} component={HelloWorld} options={{text:"home",navigation:Stack}}  />

    {uid===-1&&
    <>
        <Stack.Screen name={Screens.Register} component={Register} options={{navigation:Stack}}/>
        <Stack.Screen name={Screens.Login} component={SignIn} options={{navigation:Stack}}/>
    </>
    }
    {uid===-1||
        <>
            <Stack.Screen name={Screens.RoomCreate} component={CreateRoom} options={{navigation:Stack}}/>

        </>
    }

    </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
    </AuthContext.Provider>
    </EnvContext.Provider>
);
}
export default App;