import React from 'react'
import { Button, View, Text, Image, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ApiService from '../ApiService'
import { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type LoginScreentypes = {
  NewArcScreen: undefined;
};


interface ProfileScreenProps {
  user: string
  setUser: React.Dispatch<React.SetStateAction<string>>
}

interface ProfileType {
firstName:string,
lastName:string,
email:string,
password:string,
}

export default function ProfileScreen({user, setUser}: ProfileScreenProps) {




  const navigation = useNavigation<StackNavigationProp<LoginScreentypes>>();


  const [profile, setProfile] = useState<ProfileType | undefined>(undefined)


  useEffect(() => {
    ApiService.getUser(user)
    .then(user=> setProfile(user))
  },[],
  )






  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: "rgb(20,20,30)", }}>
      <Image style={styles.logo} source={require('../assets/logohq.png')}
      />
        <Text style={styles.header}>Hi {(profile)? profile.firstName : 'User 1'}!</Text>
      <View style={styles.buttonCreate}>
      <Button
        color="black"
        title="NEW ARC"
        onPress={() => navigation.navigate('NewArcScreen')}
        />
        </View>
    <View style={styles.details}>
      <Text style={styles.text}>Name: {(profile)? profile.firstName + ' ' + profile.lastName: 'User 1'}</Text>
      <Text style={styles.text}>Email: {(profile)? profile.email : 'User 1'}</Text>
    </View>
    <View style={styles.buttonEdit}>
    <Button color="white"
        title="EDIT DETAILS"
        onPress={() => {}}
        />
    </View>
    <View style={styles.buttonLogout}>
    <Button color="white"
        title="LOGOUT"
        onPress={() => setUser('')}
        />
    </View>
  </View>

  )
}

const styles = StyleSheet.create({
  logo: {
    width:300,
    height:300,
    top:20,
  },
  button: {
    color:'black'
  },
  container: {
    color:'white'
  },
  text: {
    color:'white',
    fontSize:20,
    marginBottom:10,
    fontStyle:'italic'
  },
  header: {
    fontSize:30,
    fontWeight:'bold',
    color:'white'
  },
  logout: {

  },
  buttonCreate: {
    // justifyContent:center,
    justifyContent: 'center',
    width: 180,
    marginTop: 30,
    height: 50,
    backgroundColor: '#29b6f6',
    borderRadius: 4,
    fontWeight: "bold",
    marginBottom: 20

  },
  buttonEdit: {
    // justifyContent:center,
    justifyContent: 'center',
    width: 150,
    marginTop: 30,
    height: 40,
    backgroundColor: '#36454f',
    borderRadius: 4,
    fontWeight: "bold",
    marginBottom: 10

  },
  buttonLogout: {
    // justifyContent:center,
    justifyContent: 'center',
    width: 150,
    marginTop: 5,
    height: 40,
    backgroundColor: 'black',
    borderRadius: 4,
    borderColor: '#36454f',
    borderWidth: 1,
    fontWeight: "bold",
    marginBottom: 20

  },
  details: {
    // flex: 1,
    marginTop: 10,
    // marginRight:70,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
