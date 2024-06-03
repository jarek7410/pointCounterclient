import { TextInput } from "react-native-paper"
import React from "react";

export const SignInUpTextInput = ({
                                      placeholder,
                                      onChangeText,
                                      secureTextEntry=false,
                                      value,
                                      label,
                                      style={},
}) => {
    return(
        <TextInput
            style={[{width:200},style]}
            label={label}
            value={value}
            mode={"outlined"}
            placeholder={placeholder}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
        />
    )
}