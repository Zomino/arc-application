import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, TextInput, ScrollView} from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ApiService from '../ApiService';
import { useNavigation } from '@react-navigation/native';
import { color } from 'native-base/lib/typescript/theme/styled-system';



type FriendsScreenParamList = {

}

type Props = NativeStackScreenProps<FriendsScreenParamList, 'FriendsScreen'>;

export default function FriendsScreen(props: any) {


  const navigation = useNavigation();

  interface UserType {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  }


  const [selectedUsers, setSelectedUsers]: any[] = useState([])




  let userList = props.route.params.userList.map((user: any) =>

      {

                         return         <View style={selectedUsers.includes(user) ? styles.buttonClick : styles.buttonUnclick}>
                                  <Button
                                    key={user.email}
                                    color={selectedUsers.includes(user) ? 'rgb(35,35,35)' : 'rgb(150,150,150)'}
                                    // buttonStyle={styles.button}
                                    title={user.firstName + " " + user.lastName}
                                    onPress={() => {
                                      // console.log(user)
                                      registerAttendee(user);
                                    } } />
                                  </View>

    }
    )






  function registerAttendee(email: any) {
    setSelectedUsers((oldUsers: any) => [...oldUsers, email])
    console.log(selectedUsers)
  }


  return (
    <ScrollView>

    <View style={styles.container}>
      <Text style={styles.header}>Add Friends to Arc</Text>
      {userList}
      <View style={styles.buttonContainer}>

      <Button color="white"
          title="ADD FRIENDS"
          onPress={()=> {
            props.route.params.updateEventUsers(selectedUsers);
            navigation.navigate('NewArcScreen')}
          }
          />
       </View>
    </View>
          </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'rgb(20,20,30)',
    height: 1500
  },
  btnClicked: {
    color: 'red'
  },
  header: {
    marginTop:35,
    marginLeft:20,
    marginBottom:20,
    fontSize:30,
    color:'white'
  },
  buttonClick: {
    // color: 'grey'
    height: 40,
    width: 350,
    marginBottom:10,
    color:'white',
    borderRadius: 10,
    backgroundColor: '#e1c4ff',
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  buttonUnclick: {
    // color: 'grey'
    height: 40,
    marginBottom:10,
    width: 350,
    color:'white',
    borderRadius: 10,
    backgroundColor: 'rgb(35,35,35)',
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  buttonBorder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0)'
  },
  buttonContainer: {
    backgroundColor: 'rgb(5,5,5)',
    height: 40,
    marginTop:20,
    width: 350,
    borderRadius: 10,
  }
})
