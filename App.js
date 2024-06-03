import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {HelloWorld} from "./screens/HelloWorld";
import {Register} from "./screens/Register";
import {SignIn} from "./screens/SignIn";
import {Screens} from "./helpers/screens.enum";
import {PaperProvider} from "react-native-paper";



function HomeScreen() {
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
      <PaperProvider>
      {/*// <Text>hello</Text>*/}
      <NavigationContainer>
        <Stack.Navigator
            initialRouteName={Screens.Home}
            screenOptions={{ headerShown: true }}
        >
            <Stack.Screen name={Screens.Home} component={HelloWorld} options={{text:"home",navigation:Stack}}  />

            <Stack.Screen name={Screens.Register} component={Register} options={{navigation:Stack}}/>
            <Stack.Screen name={Screens.Login} component={SignIn} />

        </Stack.Navigator>
      </NavigationContainer>
      </PaperProvider>
  );
}

export default App;