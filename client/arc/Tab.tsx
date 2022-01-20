import React from 'react'
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from './screens/ProfileScreen';
import NewArcScreen from './screens/NewArcScreen';
import EventListScreen from './screens/EventListScreen';
import EventNavigatorScreen from './screens/EventNavigatorScreen';
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import NewArcNavigator from './components/NewArcNavigator';

interface Props {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>
}

export default function Tab({ user, setUser }: Props) {


  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName="Profile"ls
     screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        height: 60,
        bottom: 20,
        position: 'absolute',
        left:19,
        right: 19,
        elevation:0,
        borderRadius: 20,
        backgroundColor: '#C996D4',
      }
     }}
    >
      <Tab.Screen name="EventScreenNavigator" children={() => <EventNavigatorScreen user={user} />} options={{tabBarIcon: ({focused}) => (
        <View>
            <AntDesign name="profile" size={30} color={focused ? "rgb(20,20,30)" : "rgb(110,110,110)"} />
          </View>
        )
      }}/>
      <Tab.Screen name="NewArcNavigator" children={() => <NewArcNavigator user={user} />} options={{
        tabBarIcon: ({focused}) => (
          <View>
            <Ionicons name="add-outline" size={30} color={focused ? "rgb(20,20,30)" : "rgb(110,110,110)"} />
          </View>
          // <PlusOutlined />
        )
      }}/>
      <Tab.Screen name="Profile" children={() => <ProfileScreen user={user} setUser={setUser} />} options={{tabBarIcon: ({focused}) => (
          <View>
            <Ionicons name="md-person-circle-outline" size={35} color={focused ? "rgb(20,20,30)" : "rgb(110,110,110)"} />
          </View>
        )
      }}/>
    </Tab.Navigator>
  );
}
