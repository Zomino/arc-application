import React from 'react'
import { View, Text, StyleSheet, Button, Image, ScrollView} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import LoginInForm from '../components/LogInForm';
import { StackNavigationProp } from '@react-navigation/stack';


interface LoginScreenProps {
  setUser: React.Dispatch<React.SetStateAction<string>>
}


type LoginScreentypes = {
  SignUpScreen: undefined;
};

export default function LoginScreen({setUser}: LoginScreenProps) {


  const navigation = useNavigation<StackNavigationProp<LoginScreentypes>>();


  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: "rgb(20,20,30)"}}>
      <Image style={styles.logo} source={require('../assets/logohq.png')}
      />
      <Button
        title="New to Arc? Sign Up"
        onPress={() => navigation.navigate('SignUpScreen')}
        />
      <LoginInForm setUser={setUser}/>
      </View>
    </ScrollView>
  )
}


let styles = StyleSheet.create({
  logo: {
    width:300,
    height:300,
    top:20,
  },
  button: {
    color:'black'
  }
})
