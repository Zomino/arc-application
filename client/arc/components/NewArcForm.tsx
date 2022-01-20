import React from 'react'
import {Text, StyleSheet, View, TextInput, Button, ScrollView} from 'react-native';
import { useForm, Controller} from 'react-hook-form';
import Constants from 'expo-constants';
import { useState, useEffect } from 'react'
import ApiService from '../ApiService'
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { ParamsList } from '../screens/paramsList';
import CurrencyInput from 'react-native-currency-input';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';


export default function NewArcForm(props:any) {

  // console.log('newarcprops', props)


  const navigation = useNavigation();

  const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      eventName: '',
      date: '',
      venue: '',
      foodCost: '',
      drinksCost: '',
    }
  });

  const [eventName, setEventName] = useState("")
  const [date, setDate] = useState("")
  const [venue, setVenue] = useState("")
  const [drinksCost, setDrinksCost] = useState(0)
  const [userList, setUserList] = useState([])
  const [eventUsers, setEventUsers] = useState(new Array())
  const [foodCost, setFoodCost] = useState(0)
  const [foodUsers, setFoodUsers] = useState(new Array())
  const [drinksUsers, setDrinksUsers] = useState(new Array())
  const [eventCreated, setEventCreated] = useState(false)

  useEffect(() => {
    ApiService.getUsers()
    .then(users => {
      return setUserList(users);

    });
    setEventCreated(false)
  },[],
  )

  // console.log(eventUsers)

  const calculateArc = function () {

    const creator = props.user;
    const arcs: any = {};
    const arcMembers: any = {};
    const arcsPaid: any = {};
    const arcFirstNames: any = {};
    const arcItems: any = {};


    eventUsers.map(user => arcsPaid[user.email] = false)
    eventUsers.map(user => arcFirstNames[user.email] = user.firstName)

    let foodCostPerUser = Math.round((foodCost / foodUsers.length) * 100) / 100;
    let drinkCostPerUser =  Math.round((drinksCost / drinksUsers.length) * 100) / 100;


    foodUsers.map(user => {
      if (drinksUsers.indexOf(user) === -1) {
        arcs[user.email] = foodCostPerUser;
        arcItems[user.email] = 'F';
      }
      else {
        arcs[user.email] = foodCostPerUser + drinkCostPerUser;
        arcItems[user.email] = 'FD';
      }
    })

    drinksUsers.map(user => {
      if ((foodUsers.indexOf(user) === -1)) {
        arcs[user.email] = drinkCostPerUser;
        arcItems[user.email] = 'D';
      }
      else return
    })





    // console.log('arcs',arcs)
    // console.log('arcsPaid',arcItems)
    // console.log('arcItems',arcsPaid)


    const newArc = {
      eventName: eventName,
      date: date,
      venue: venue,
      foodCost: foodCost,
      drinksCost: drinksCost,
      totalCost: foodCost + drinksCost,
      creator: props.user,
      arcMembers: arcMembers,
      arcs: arcs,
      arcsPaid: arcsPaid,
      arcItems: arcItems,
      arcFirstNames: arcFirstNames,
      arcNameArray: eventUsers,
    }

    const savedEvent = ApiService.createEvent(newArc);
    console.log(savedEvent);

  }

  function onChangeEvent(arg : string) {
    setEventName(arg)
  };
  function onChangeDate(arg : string) {
    setDate(arg)
  };
  function onChangeVenue(arg : string) {
    setVenue(arg)
  };
  function onChangeFoodCost(arg : number) {
    // console.log(arg)
    setFoodCost(arg)
  };
  function onChangeDrinksCost(arg : number) {
    setDrinksCost(arg)
  };

  function updateEventUsers(arg : any) {
    setEventUsers([...eventUsers, ...arg])
  }

  function updateFoodUsers(arg :any) {
    setFoodUsers([...foodUsers, ...arg])
  }


  function updateDrinksUsers(arg :any) {
    setDrinksUsers([...drinksUsers, ...arg])
  }




  return (

    eventCreated ? (
      <View>
        <Text style={styles.created}>Event Created!</Text>
      </View>
    ) :
    (
    <View style={styles.container}>
      {/* <Text style={styles.text}>New Arc</Text> */}
      <View style={styles.button}>
        <Button color="black"
          title="ADD FRIENDS"
          onPress={()=> navigation.navigate('FriendsScreen', {
            userList: userList,
            updateEventUsers: updateEventUsers
          })}
        />
      </View>

    <Text style={styles.label}>Event Name</Text>
      <Controller
        control={control}
        render={({field: { value }}) => (
          <TextInput
            style={styles.input}
            onChangeText={value => onChangeEvent(value)}
            value={eventName}
          />
        )}
        name="eventName"
        rules={{ required: true }}
      />

      <Text style={styles.label}>Date</Text>
      <Controller
        control={control}
        render={({field: { value }}) => (
          <TextInput
            style={styles.input}
            onChangeText={value => onChangeDate(value)}
            value={date}
          />
        )}
        name="date"
        rules={{ required: true }}
      />

      <Text style={styles.label}>Venue</Text>
      <Controller
        control={control}
        render={({field: { value }}) => (
          <TextInput
            style={styles.input}
            onChangeText={value => onChangeVenue(value)}
            value={venue}
            />
            )}
            name="venue"
            rules={{ required: true }}
            />

      <Text style={styles.label}>Food Cost</Text>
      <Controller
        control={control}
        render={({field: { value }}) => (
          <CurrencyInput
          keyboardType = 'numeric'
          style={styles.input}
          onChangeValue={value => onChangeFoodCost(value)}
          prefix="£"
          delimiter=","
          separator="."
          precision={2}
          value={foodCost}
          onSubmitEditing={()=> {
            navigation.navigate('FoodScreen', {
              foodCost: foodCost,
              eventUsers: eventUsers,
              updateFoodUsers: updateFoodUsers,
            })}}
          />
        )}
        name="foodCost"
        rules={{ required: true }}
      />

<Text style={styles.label}>Drinks Cost</Text>
      <Controller
        control={control}
        render={({field: { value }}) => (
          <CurrencyInput
          keyboardType = 'numeric'
          style={styles.input}
          onChangeValue={value => onChangeDrinksCost(value)}
          prefix="£"
          delimiter=","
          separator="."
          precision={2}
          value={drinksCost}
          onSubmitEditing={()=> {
            navigation.navigate('DrinksScreen', {
              drinksCost: drinksCost,
              eventUsers: eventUsers,
              updateDrinksUsers: updateDrinksUsers,
            })}}
          />
        )}
        name="drinksCost"
        rules={{ required: true }}
      />
       <View style={styles.buttonBottom}>
        <Button color="black"
          title="CREATE ARC"
          onPress={()=>{calculateArc();
            setEventCreated(true)
          }}
        />
      </View>
  </View>
  ))
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
  buttonBottom: {
    // justifyContent:center,
    justifyContent: 'center',
    width: 140,
    marginTop: 30,
    height: 40,
    backgroundColor: '#29b6f6',
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
  },

  text: {
    color:'white',
    fontSize:20
  },
  created: {
    marginTop:10,
    alignItems: 'center',
    justifyContent: 'center',
    color:'#C996D4',
    fontSize:50
  }


});
