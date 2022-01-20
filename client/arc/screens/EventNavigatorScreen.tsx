import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import EventListScreen from './EventListScreen';
import SingleEventScreen from './SingleEventScreen';


interface EventNavigatorProps {
  user: string
}


export default function EventNavigatorScreen({ user }: EventNavigatorProps) {

  type StackParamsList = {
    EventListScreen: {user: string},
    SingleEventScreen: {user: string},
  }

  console.log('user',user)

  const Stack = createStackNavigator<StackParamsList>();

  return (
    <Stack.Navigator initialRouteName="EventListScreen"  screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="EventListScreen" component={EventListScreen} initialParams={{user: user}}/>
      <Stack.Screen name="SingleEventScreen" component={SingleEventScreen} initialParams={{user: user}}/>
    </Stack.Navigator>
  )
}
