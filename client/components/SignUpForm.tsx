import React from 'react'
import {Text, StyleSheet, View, TextInput, Button} from 'react-native';
import { useForm, Controller} from 'react-hook-form';
import Constants from 'expo-constants';
import { useState, useEffect } from 'react'
import ApiService from '../ApiService'
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { ParamsList } from '../screens/paramsList';


interface SignUpFormProps {
  // navigation: NavigationProp<ParamsList>;
  setUser: React.Dispatch<React.SetStateAction<string>>
}

export default function SignUpForm({setUser} : SignUpFormProps) {
// export default function SignUpForm(props: SignUpFormProps) {

  // console.log('hi')

  const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    }
  });

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onSubmit = function () {
    const newUser = {
      firstName:firstName,
      lastName:lastName,
      email:email,
      password:password
    }
    // console.log(newUser)
    ApiService.createUser(newUser);
    setUser(email);
    // navigation.navigate('Profile', {})
  }

  function onChangeFirst(arg : string) {
    setFirstName(arg)
    // console.log(arg)
  };
  function onChangeLast(arg : string) {
    setLastName(arg)
    // console.log(arg)
  };
  function onChangeEmail(arg : string) {
    setEmail(arg)
    // console.log(arg)
  };
  function onChangePassword(arg : string) {
    setPassword(arg)
    // console.log(arg)
  };

  return (
    <View style={styles.container}>
    <Text style={styles.signup}>Sign Up</Text>
    <Text style={styles.label}>First name</Text>
      <Controller
        control={control}
        render={({field: { value }}) => (
          <TextInput
            style={styles.input}
            onChangeText={value => onChangeFirst(value)}
            value={firstName}
          />
        )}
        name="firstName"
        rules={{ required: true }}
      />
      <Text style={styles.label}>Last name</Text>
      <Controller
        control={control}
        render={({field: { value }}) => (
          <TextInput
            style={styles.input}
            onChangeText={value => onChangeLast(value)}
            value={lastName}
          />
        )}
        name="lastName"
        rules={{ required: true }}
      />
      <Text style={styles.label}>Email</Text>
      <Controller
        control={control}
        render={({field: { value }}) => (
          <TextInput
            style={styles.input}
            onChangeText={value => onChangeEmail(value)}
            value={email}
          />
        )}
        name="email"
        rules={{ required: true }}
      />
      <Text style={styles.label}>Password</Text>
      <Controller
        control={control}
        render={({field: { value }}) => (
          <TextInput
          secureTextEntry={true}
            style={styles.input}
            onChangeText={value => onChangePassword(value)}
            value={password}
          />
        )}
        name="password"
        rules={{ required: true }}
      />
       <View style={styles.button}>
        <Button color="black"
          title="S U B M I T"
          onPress={()=>{onSubmit()}}
        />
      </View>
  </View>
  )
}


const styles = StyleSheet.create({
  container: {
    width: 280,
    height:600,
    alignItems:'center',
    alignContent: 'center'
  },
  label: {
    color: 'white',
    marginTop: 15,
    marginBottom: 5,
    // marginRight:220
  },
  button: {
    // justifyContent:center,
    justifyContent: 'center',
    width: 140,
    marginTop: 30,
    height: 40,
    backgroundColor: '#C996D4',
    borderRadius: 4,
    fontWeight: "bold"

  },

  input: {
    width:320,
    backgroundColor: 'black',
    borderColor: 'rgb(129,129,129)',
    borderWidth:1,
    color: 'white',
    height: 40,
    borderRadius: 4,
    padding: 10,
    // backgroundColor:
  },

  signup: {
    color: 'rgb(230,230,230)',
    marginTop: 15,
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 30,
    // fontFamily: 'Josefin Sans'
  }


});