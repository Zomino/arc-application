import React from 'react'
import { View, Text } from 'react-native'
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { useState, useEffect, Dispatch } from 'react'
import NewArcScreen from '../screens/NewArcScreen';
import FoodScreen from '../screens/FoodScreen';
import DrinksScreen from '../screens/DrinksScreen';
import FriendsScreen from '../screens/FriendsScreen';
import ApiService from '../ApiService';

interface NewArcNavigatorProps {
  user: string
}


export default function NewArcNavigator({ user }: NewArcNavigatorProps) {



  type StackParamsList = {
    NewArcScreen: {user: string},
    FoodScreen: {user: string},
    DrinksScreen: {user: string},
    FriendsScreen: {user: string},
  }


  const Stack = createStackNavigator<StackParamsList>();

  return (
    <Stack.Navigator initialRouteName="NewArcScreen"  screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="NewArcScreen" component={NewArcScreen} initialParams={{user: user}}/>
      <Stack.Screen name="FoodScreen" component={FoodScreen} initialParams={{user: user}}/>
      <Stack.Screen name="DrinksScreen" component={DrinksScreen} initialParams={{user: user}}/>
      <Stack.Screen name="FriendsScreen" component={FriendsScreen} initialParams={{user: user}}/>
      {/* <Stack.Screen name="NewArcScreen" component={() => <NewArcScreen user={user} />} />
      <Stack.Screen name="FoodScreen" component={() => <FoodScreen user={user} />} />
      <Stack.Screen name="DrinksScreen" component={() => <DrinksScreen user={user} />} /> */}
    </Stack.Navigator>
  )
}
