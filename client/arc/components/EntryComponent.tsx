import React from 'react'
import { View, Text } from 'react-native'
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from '../screens/SignUpScreen'
import LoginScreen from '../screens/LoginScreen'
import { useState, useEffect, Dispatch } from 'react'

interface EntryProps {
  setUser: Dispatch<React.SetStateAction<string>>;
}

type StackParamsList = {
  SignUpScreen: undefined,
  Login: undefined
}

export default function EntryComponent({ setUser }: EntryProps) {

  const Stack = createStackNavigator<StackParamsList>();



  return (
    // <NavigationContainer>

    <Stack.Navigator initialRouteName="Login" screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="SignUpScreen" component={() => <SignUpScreen setUser={setUser} />} />
      <Stack.Screen name="Login" component={() => <LoginScreen setUser={setUser} />} />
    </Stack.Navigator>

  )
}
