import React, {useContext} from "react";
import {View,Text} from "react-native";
import {ActivityIndicator, Button} from "react-native-paper";
import SignInUpTextInput from "../components/SignInUpTextInput";
import Spacer from "../components/spacer";
import {loginDto} from "../helpers/dto/login.dto";
import {AuthContext} from "../helpers/context/Auth";
import {EnvContext} from "../helpers/context/env";
import {userDataDto} from "../helpers/dto/authData.dto";
import {Simulate} from "react-dom/test-utils";
import compositionStart = Simulate.compositionStart;
import {Screens} from "../helpers/screens.enum";

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
            console.log("login error:"+response.status+" "+err.error)
            setLoading(false)
            return
        }
        const data:loginDto = await response.json();
        const bearer="Bearer "+data.token
        // console.log(bearer)bearer
        //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlYXQiOjE3MTc1MjAwOTIsImlhdCI6MTcxNzUxODI5MiwiaWQiOjI4LCJyb2xlIjozfQ.JExW-uOk9zABVIoaDhJzTTd43hcvcVwGrYEjhSAFXiY
        //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlYXQiOjE3MTMyNjg1MTgsImlhdCI6MTcxMzI2NjcxOCwiaWQiOjMsInJvbGUiOjF9.KO42xVPoUaFt8bZsAvYQCPmw30XCmJtwDTqtxs1fZ-U
        const responseUser=await fetch(env.api.url+':'+env.api.port+'/api/me/', {
            method: 'GET',
            headers: {
                'Authorization': bearer,
                'Content-Type': 'application/json'
            },
        })
        if(!responseUser.ok){
            console.log("me error:"+responseUser.status)
            setLoading(false)
            return
        }
        const dataUser=await responseUser.json()
        console.log("???")
        const stringify=JSON.stringify(dataUser)
        console.log("???")
        console.log(stringify)
        console.log("???")

        auth.Update(data.username,data.token,dataUser.ID)
        console.log("from auth:"+auth.username)

        navigation.goBack(Screens.Home)
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