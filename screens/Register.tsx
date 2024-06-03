import React, {useState} from "react";
import {View,Text} from "react-native";
import {Button, TextInput} from "react-native-paper";
import SignInUpTextInput from "../components/SignInUpTextInput";
import Spacer from "../components/spacer";

export const Register = ({navigation})=>{
    const [email, setEmail] = useState<string>();
    const [nick , setNick] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [repassword, setRepassword] = useState<string>();
    const register = () => {
        fetch('http://localhost:2137/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                nick: nick,
                password: password,
            }),
        }).then(r => {})
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
            <Spacer height={100}/>
            <Button mode="contained" onPress={register}>Register</Button>
        </View>
    )
}