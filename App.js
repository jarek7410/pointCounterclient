import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {HelloWorld} from "./screens/HelloWorld";
import {Register} from "./screens/Register";
import {SignIn} from "./screens/SignIn";
import {Screens} from "./helpers/screens.enum";
import {PaperProvider} from "react-native-paper";
import {AuthContext} from "./helpers/context/Auth";
import {useRef, useState} from "react";
import Config from "react-native-config";
import {EnvDto} from "./helpers/dto/env.dto";
import {EnvContext} from "./helpers/context/env";


const Stack = createNativeStackNavigator();

function App() {
    const [token,setToken]=useState<string>(null)
    const [username,setUsername]=useState<string>(null)
    const updateAuth=(name,token)=>{
        setToken(token)
        setUsername(name)
        console.log(name)
    }

  return (
      <EnvContext.Provider value={{api:{
              url:Config.API_URL,
              port:Config.API_PORT
          },}}>
      <AuthContext.Provider value={{username:username,token:token,Update:updateAuth}}>
      <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
            initialRouteName={Screens.Home}
            screenOptions={{ headerShown: true }}
        >
            <Stack.Screen name={Screens.Home} component={HelloWorld} options={{text:"home",navigation:Stack}}  />

            <Stack.Screen name={Screens.Register} component={Register} options={{navigation:Stack}}/>
            <Stack.Screen name={Screens.Login} component={SignIn} options={{navigation:Stack}}/>

        </Stack.Navigator>
      </NavigationContainer>
      </PaperProvider>
      </AuthContext.Provider>
      </EnvContext.Provider>
  );
}

export default App;