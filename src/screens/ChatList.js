import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Channel, ChannelList, MessageInput, MessageList } from 'stream-chat-react-native'
import { useRoute } from '@react-navigation/native'

const ChatList = (props) => {
  const routes = useRoute()
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