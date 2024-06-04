import React, {useContext} from "react";
import {View,Text} from "react-native";
import {ActivityIndicator, Button} from "react-native-paper";
import SignInUpTextInput from "../components/SignInUpTextInput";
import Spacer from "../components/spacer";
import {loginDto} from "../helpers/dto/login.dto";
import {AuthContext} from "../helpers/context/Auth";
import {EnvContext} from "../helpers/context/env";

export const SignIn = ({navigation})=>{
    const [username,setUsername] = React.useState<string>('')
    const [password,setPassword] = React.useState<string>('')
    const [loading,setLoading] = React.useState<boolean>(false)

    const auth=useContext(AuthContext)
    const env=useContext(EnvContext)

    //TODO: hash password
    //TODO: error handling
    const login = async () => {
        setLoading(true)
        // console.log(env.api.url+':'+env.api.port+'/auth/user/login/')
        const response=await fetch(env.api.url+':'+env.api.port+'/auth/user/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
        if(!response.ok){
            const err=await response.json()
            console.log("error:"+response.status+" "+err.error)
            setLoading(false)
            return
        }
        const data:loginDto = await response.json();

        auth.Update(data.username,data.token)
        console.log("from auth:"+auth.username)

        navigation.goBack()
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