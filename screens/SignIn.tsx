import React from "react";
import {View,Text} from "react-native";
import {ActivityIndicator, Button} from "react-native-paper";
import SignInUpTextInput from "../components/SignInUpTextInput";
import Spacer from "../components/spacer";
import {loginDto} from "../helpers/dto/login.dto";

export const SignIn = ({navigation})=>{
    const [username,setUsername] = React.useState<string>('')
    const [password,setPassword] = React.useState<string>('')
    const [loading,setLoading] = React.useState<boolean>(false)

    //TODO: hash password
    //TODO: error handling
    const login = async () => {
        setLoading(true)
        const response=await fetch('http://192.168.0.113:2137/auth/user/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
        const data:loginDto = await response.json();
        const jsonString = JSON.stringify(data);
        console.log(response.status)
        console.log(jsonString)
        setLoading(false)

    }
    return(
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Text>Register: not jest hash</Text>
            {/*TODO: hash password!!!!, validate email, validate password*/}
            <SignInUpTextInput placeholder={"username"} onChangeText={setUsername} value={username} label={"username"}/>
            <SignInUpTextInput placeholder={"password"} onChangeText={setPassword} value={password} label={"password"} secureTextEntry/>
            <Spacer height={50}/>
            {loading&&
                <ActivityIndicator animating={true} size={"large"}/>
            }
            {!false&&
                <Button mode="contained" onPress={login}>Login</Button>
            }
        </View>
    )
}