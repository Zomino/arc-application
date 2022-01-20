import React from 'react'
import { View, Text, StyleSheet, Button, Image, ScrollView} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import NewArcForm from '../components/NewArcForm';
import { createStackNavigator } from '@react-navigation/stack';



interface NewArcScreenProps {
  user: string
}


export default function NewArcScreen(props:any) {


  return (

    <ScrollView>
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/logohq.png')}/>
      <NewArcForm user={props.route.params.user}/>
    </View>
  </ScrollView>
  )
}




let styles = StyleSheet.create({
  container: {
  height:2000,
  alignItems: 'center',
  backgroundColor: "rgb(20,20,30)"
  },
  logo: {
    width:300,
    height:300,
    top:20,
  },
  button: {
    color:'black'
  },
  text: {
    color:'white'
  }
})

