import {View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export const SafeAreaView = ({children}) => {
    const insets = useSafeAreaInsets();
    return(
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',

                // Paddings to handle safe area
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
                paddingLeft: insets.left,
                paddingRight: insets.right,
            }}
        >
            {children}
            </View>
    )
}