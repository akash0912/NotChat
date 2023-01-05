import React, { useContext, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
const Stack = createStackNavigator();
import { Chat, OverlayProvider } from 'stream-chat-react-native';
import { useSafeAreaInsets, SafeAreaProvider } from 'react-native-safe-area-context';
import { StreamChat } from 'stream-chat';
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { client, token } from "../config/chatConfig";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ChatChannels from "../screens/ChatChannels";
import ChatList from "../screens/ChatList";
import SignUp from "../screens/SignUp";
import AuthContext from "../context/Authentication";
const MyStack = () => {

    const client = StreamChat.getInstance('r79xt77x5r64');

    const { bottom } = useSafeAreaInsets();
    const { userId } = useContext(AuthContext)
    return (


        <Stack.Navigator>

            {!userId ?
                <Stack.Screen name="Signup" component={SignUp} />
                : <>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="ChatChannels" component={ChatChannels} />
                    <Stack.Screen name="Chat" component={ChatList} />
                </>
            }
        </Stack.Navigator>


    )
}

export default MyStack