import React, {useEffect, useState} from "react";
import {View,Text} from "react-native";
import {ActivityIndicator, Button, HelperText, TextInput} from "react-native-paper";
import SignInUpTextInput from "../components/SignInUpTextInput";
import Spacer from "../components/spacer";
import {checkPasswordStrength} from "../helpers/RegisterHelpers";
import {log} from "expo/build/devtools/logger";
import * as assert from "assert";
import {registerDto} from "../helpers/dto/register.dto";

export const Register = ({navigation})=>{
    const [email, setEmail] = useState<string>();
    const [nick , setNick] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [repassword, setRepassword] = useState<string>();
    const [validPassword, setValidPassword] = useState<boolean>(false);
    const [ValidPasswordText, setValidPasswordText] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const [response, setResponse] = useState<string>();
    useEffect(() => {
        console.log("register")
    }, []);
    const register =async () => {
        // if (password != undefined && password.length > 0) {
        //     const check = checkPasswordStrength(password)
        //     if(check.isStrong){
        //         setValidPassword(true)
        //     }else{
        //         setValidPassword(false)
        //         setValidPasswordText(check.reasons.join(","))
        //         return
        //     }
        // }
        // if(validator.isEmail(email)){
        //     setEmail("not valid email")
        //     return;
        // }
        // setLoading(true)
        //TODO: change to hash password\
        //TODO: validate email
        //TODO: handle errors
        //TODO: user store/env for fetch url
        const response=await fetch('http://192.168.0.113:2137/auth/user/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                username: nick,
                password: password,
            }),
        })
        const data:registerDto = await response.json();
        const jsonString = JSON.stringify(data);
        console.log(jsonString)
        console.log(data.user)
        navigation.goBack();
    }
    const onEmailChange = (e) => {
        setEmail(e);
    }
    const onNickChange = (e) => {
        setNick(e);
    }
    const onPasswordChange = (e) => {
        setPassword(e);
    }
    return(
        <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
        }}>
            <Text>Register: not jet hash</Text>
            {/*TODO: hash password!!!!, validate email, validate password*/}
            <SignInUpTextInput
                label="Email"
                value={email}
                onChangeText={(text: string) => onEmailChange(text)} placeholder={"email"} />
            <SignInUpTextInput
                label="Nick"
                value={nick}
                onChangeText={(text: string) => onNickChange(text)} placeholder={"Nick"}/>
            <HelperText type="error" visible={!validPassword}>
                {ValidPasswordText}
            </HelperText>
            <SignInUpTextInput
                label="Password"
                value={password}
                onChangeText={(text: string) => onPasswordChange(text)} placeholder={"Password"}
                secureTextEntry
            />
            {password!=undefined&&password.length>0 &&
                <SignInUpTextInput
                    label="Repeate Password"
                    value={repassword}
                    onChangeText={(text: string) => setRepassword(text)} placeholder={"Password"}
                    secureTextEntry
                />
            }
            <HelperText type="error" visible={repassword!==password&&repassword!==undefined&&repassword.length>0}>
                repeated password is not the same
            </HelperText>
            <Spacer height={50}/>
            {loading&&
                <ActivityIndicator animating={true} size={"large"}/>
            }
            {repassword===password&&!loading&&
                <Button mode="contained" onPress={register}>Register</Button>
            }
            <Text>
                {response}
            </Text>
        </View>
    )
}