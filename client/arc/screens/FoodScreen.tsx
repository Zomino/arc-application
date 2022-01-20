import React, { useState } from 'react'
import { View, Text, Button, StyleSheet} from 'react-native'
import { useNavigation } from '@react-navigation/native';


export default function FoodScreen(props: any) {


  const navigation = useNavigation();


  const [foodUsers, setFoodUsers]: any[] = useState([])



  function updateFoodUsers(email: any) {
    setFoodUsers((oldUsers: any) => [...oldUsers, email])
    // console.log(selectedUsers)
  }



  let foodUserList = props.route.params.eventUsers.map((user: any) =>
  {
  return   <View style={foodUsers.includes(user) ? styles.buttonClick : styles.buttonUnclick}>

                <Button
              key={user.email}
              color={foodUsers.includes(user) ? 'rgb(35,35,35)' : 'rgb(150,150,150)'}
              title={user.firstName + " " + user.lastName}
              onPress={() => {
                // console.log(user)
                updateFoodUsers(user);
              } } />
      </View>
}
)





return (
  <View style={styles.container}>
    <Text style={styles.header}>Who Ate?</Text>
    {foodUserList}
    <View style={styles.buttonContainer}>

    <Button color="white"
        title="SELECT FRIENDS"
        onPress={()=> {
          props.route.params.updateFoodUsers(foodUsers);
          navigation.navigate('NewArcScreen')}
        }
        />
     </View>
  </View>
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