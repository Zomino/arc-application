import React from 'react'
import { Button, View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpForm from '../components/SignUpForm'
import { ParamsList } from './paramsList';


interface SignUpScreenProps {
  setUser: React.Dispatch<React.SetStateAction<string>>
}

export default function SignUpScreen({setUser} : SignUpScreenProps) {

  let styles = StyleSheet.create({
    logo: {
      width:300,
      height:300,
      top:20,
    }
  })


  return (
    <ScrollView>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: "rgb(20,20,30)"}}>
      <Image style={styles.logo} source={require('../assets/logohq.png')}
      />
      <SignUpForm setUser={setUser}/>
    </View>
    </ScrollView>
  );


}
