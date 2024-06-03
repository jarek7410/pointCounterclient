import React from "react";
import {View,Text} from "react-native";
import {Button} from "react-native-paper";

export const SignIn = ()=>{

    return(
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Text>Register: not jest hash</Text>
            {/*TODO: hash password!!!!, validate email, validate password*/}
            {/*<TextField id="Email" label="Email" variant="outlined" />*/}
            {/*<TextField id="Password" label="Password" variant="outlined" />*/}
            <Button mode="contained">Login</Button>
        </View>
    )
}