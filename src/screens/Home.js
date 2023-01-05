import { FlatList, Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Channel, ChannelList, MessageInput, MessageList, useChatContext } from 'stream-chat-react-native'
import { client, token } from '../config/chatConfig'
import AuthContext from '../context/Authentication'

const Home = (props) => {
  const [clientReady, setClientReady] = useState(false)
  const [channel, setChannel] = useState()
  const { client } = useChatContext()
  const [users, setUsers] = useState()
  const [visible, setVisible] = useState(false)
  const { userId } = useContext(AuthContext)
  useEffect(() => {
    getUsersList()
  }, [])
  const onSelectChannel = async (item) => {
    // props.navigation.navigate('Chat',{channel: channel})
    console.log("item", item);
    const channel = client.channel('messaging', { members: [item.id, userId] })
    await channel.watch()
    props.navigation.navigate('Chat', { channel: channel })
  }
  const onSelectChannelList = (channel) => {
    setVisible(false)
    props.navigation.navigate('Chat', { channel: channel })
  }
  const getUsersList = async () => {
    const response = await client.queryUsers({ id: { $nin: [userId] }})
    console.log("Users", response.users);
    setUsers(response.users)
  }

  const UserModal = () => {
    return (<Modal visible={visible}>
      <View>
        <View 
          style={{
            height: 40, 
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
          <Pressable onPress={()=>setVisible(false)}>
            <Text style={{
              fontWeight: '700', 
              fontSize: 16}}>Close</Text>
          </Pressable>
        </View>
        <FlatList
          data={users}
          renderItem={({ item }) => {
            return (<Pressable onPress={() => onSelectChannel(item)} style={{ marginTop: 10, marginLeft: 10, alignItems: 'center', flexDirection: 'row' }}>
              <View>
                <Image source={{ uri: item.image }} style={{ height: 50, width: 50, borderRadius: 50, }} />
              </View>
              <Text style={{ fontSize: 14, fontWeight: '700', marginLeft: 10 }}>{item.name}</Text>

            </Pressable>
            )
          }}
        />
      </View>
    </Modal>)
  }
  return (
    <View style={{ flex: 1 }}>

      <ChannelList onSelect={onSelectChannelList}
        filters={{
          members: {
            $in: [userId]
          }
        }
        } />

      <Pressable
        style={{
          position: 'absolute',
          height: 50,
          width: 50,
          borderRadius: 50,
          backgroundColor: 'blue',
          justifyContent: 'center',
          alignItems: 'center',
          right: 20,
          bottom: 20
        }}
        onPress={() => setVisible(true)}
      >
        <Text style={{ fontSize: 25, color: 'white' }}>+</Text>

      </Pressable>
      <UserModal />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})