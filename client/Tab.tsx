/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/no-children-prop */

import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import ProfileScreen from './screens/ProfileScreen';
import EventNavigatorScreen from './screens/EventNavigatorScreen';
import NewArcNavigator from './components/NewArcNavigator';

interface Props {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>
}

export default function TabComponent({ user, setUser }: Props) {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 60,
          bottom: 20,
          position: 'absolute',
          left: 19,
          right: 19,
          elevation: 0,
          borderRadius: 20,
          backgroundColor: '#C996D4',
        },
      }}
    >
      <Tab.Screen
        name="EventScreenNavigator"
        children={() => <EventNavigatorScreen user={user} />}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <AntDesign
                name="profile"
                size={30}
                color={focused ? 'rgb(20,20,30)' : 'rgb(110,110,110)'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="NewArcNavigator"
        children={() => <NewArcNavigator user={user} />}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Ionicons
                name="add-outline"
                size={30}
                color={focused ? 'rgb(20,20,30)' : 'rgb(110,110,110)'}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        children={() => <ProfileScreen user={user} setUser={setUser} />}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Ionicons
                name="md-person-circle-outline"
                size={35}
                color={focused ? 'rgb(20,20,30)' : 'rgb(110,110,110)'}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
