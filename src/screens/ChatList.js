import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Channel, ChannelList, MessageInput, MessageList, useChatContext,  } from 'stream-chat-react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import AuthContext from '../context/Authentication'

const ChatList = (props) => {

  const routes = useRoute()
  const navigation = useNavigation()
  const {userId} = useContext(AuthContext)
  useEffect(()=>{
    console.log("Users",Object.values(routes.params.channel?.state.members).find(item=>item.user.id !== userId));
    const user2= Object.values(routes.params.channel?.state.members).find(item=>item.user.id !== userId)
    navigation.setOptions({
      headerTitle: routes.params.channel?.data?.name ?routes.params.channel?.data?.name : user2.user.name
    })
  },[])
  const {client} = useChatContext()
  return (
    <View style={{flex:1}}>
      <Channel channel={routes.params.channel}>
        <MessageList />
        <MessageInput />
      </Channel>
    </View>
  )
}

export default ChatList

const styles = StyleSheet.create({})