import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import MyTabs from './Tab';
import Entry from './components/EntryComponent';
import ApiService from './ApiService'
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState, useEffect, Dispatch } from 'react'
import SignUpScreen from './screens/SignUpScreen';


const Stack = createStackNavigator();



//login or sign up

// stack navigator 2 screens
//create    -> create new bill -> selecting participants

// stack navigator 2 screens
//bills     -> look at existing bills -> bill page breakdown

// stack navigator 2 screens
//profile   -> go to profile -> edit profile

function App() {
const [user, setUser] = useState('');

console.log('hi')

  return (
    <NavigationContainer>
      {user ? <MyTabs user={user} setUser={setUser} /> : <Entry setUser={setUser} />}
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   shadow: {
//     shadowColor: '#e1c4ff',
//     shadowOffset: {
//       width:5,
//       height:10,
//     },
//     shadowOpacity:0.25,
//     shadowRadius:3.5,
//     elevation: 5
//   }
// })

export default App;
