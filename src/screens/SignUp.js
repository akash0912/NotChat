import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
// import { client } from '../config/chatConfig'
import { useChatContext } from 'stream-chat-react-native'
import { useNavigation } from '@react-navigation/native'
import AuthContext from '../context/Authentication'

const SignUp = () => {
    const [username, setUsername] = useState('')
    const [fullName, setFullName] = useState('')
    const {client} = useChatContext()
    const {navigation} = useNavigation()
    const {setUserId, userId} = useContext(AuthContext)
    useEffect(()=>{
        // connect()
        // return async()=>{
        //     await client.disconnectUser();
        //     setClientReady(false)

        // }
    },[])

    const connect =async (username,fullName)=>{
        await client.connectUser(
        {
          id: username,
          name: fullName,
        //   role:'admin',
          image: 'https://i.imgur.com/fR9Jz14.png',
        },
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZGVtb3Rlc3RVc2VyMSJ9.HSP6ofQirPtIuNAy7OfFLOsakgSk_5sSc9Y2kPI8YVM"
        // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidGVzdDJ1c2VyIn0.CFdrzUuzsm0DA5pV-VBtA17aLeL9H_QpECTJKV1sXJg',
        client.devToken(username),
      );

      // const channel = client.channel('livestream', "notJustDev", {
      //   name: 'notJustDev',
      //   // members: '}
      // })

      // await channel.watch()
      setUserId(username)
    //   navigation.navigate('Home')
    //   setClientReady(true)
    }

    const signUp =() =>{
connect(username,fullName)
    }
  return (
    <View style={styles.root}>
      <View style={styles.inputContainer}>
        <TextInput 
            value={username}
            onChangeText={setUsername}
            placeholder='Username'
            style={styles.input}/>
      </View>

      <View style={styles.inputContainer}>
        <TextInput 
            value={fullName}
            onChangeText={setFullName}
            placeholder='Full Name'
            style={styles.input}/>
      </View>

      <Pressable style={styles.button} onPress={signUp}>
        <Text style={styles.text}>Sign Up</Text>
      </Pressable>
    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({
    root:{
        flex:1,
        justifyContent:'center', padding: 10
    },
    inputContainer:{
        marginVertical: 10, backgroundColor: 'white'
    },
    input:{
        // borderWidth: 1,
        borderColor: 'black', 
        padding: 10, 
        borderRadius: 10
    },
    button:{
        padding: 10,
        backgroundColor: '#0E74FE', 
        justifyContent: 'center',
        alignItems: "center"
    },
    text:{
        color: 'white',fontSize: 16
    }
})