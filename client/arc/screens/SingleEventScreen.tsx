import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, Image, ScrollView } from 'react-native'
import ApiService from '../ApiService'
import { useNavigation } from '@react-navigation/native';
import { color } from 'native-base/lib/typescript/theme/styled-system';
// import Icon from 'react-native-ionicons'


interface SingleEventScreenProps {
  user: string
}

export default function SingleEventScreen(props:any) {

  const navigation = useNavigation();


  console.log('props', props)



const [event, setEvent] = useState<any[]>([])
const [eventUsers, setEventUsers] = useState<any[]>([])
const [paid, setPaid] = useState(false)
const [creator, setCreator] = useState('')

// console.log(props.route.params.user)

useEffect(() => {
  const currentEvent = {event: props.route.params.eventId}
  ApiService.getEvent(currentEvent)
  .then(events => {
    setEvent(events);
    return events
  })
  .then(event => setCreator(event[0].creator))
  // .then(events => {
  //   setPaid(events[0].arcsPaid[props.route.params.user])
  //   return events;
  // })
  // .then((users) => setEventUsers(users[0].arcNameArray))
},[]
)

useEffect(() => {
  const currentEvent = {event: props.route.params.eventId}
  ApiService.getEvent(currentEvent)
  // .then(event => {console.log(event)
  //   return event;
  // })
  .then(answer => setPaid(answer[0].arcsPaid[props.route.params.user]))

},[paid]
)

useEffect(() => {
  const currentEvent = {event: props.route.params.eventId}
  ApiService.getEvent(currentEvent)
  .then(users => {console.log('users',users);
  return users})
  .then((users) => setEventUsers(users[0].arcNameArray.map(a => [a.firstName, a.lastName, a.email])))
},[]
)


function payNow(event:any, user:any) {
  ApiService.updatePayment(event, user)
  setPaid(true)
}

//event details
const details = event.map((event) => {
  return <View key={event._id}>
      <View style={styles.header}>
           <Text style={styles.title}>{event.eventName}</Text>
          <Image style={styles.logo} source={require('../assets/logohq.png')} />
      </View>
         <Text style={styles.date}>{event.date}</Text>
         <Text style={styles.venue}>{event.venue}</Text>
         <View style={styles.totalCostWrapper}>
         <Text style={styles.totalCost}>£{event.totalCost}</Text>
         <Text style={styles.totalCostBlurb}>Total Bill</Text>
         </View>
         <View style={styles.foodCostWrapper}>
         <Text style={styles.foodCost}>£{event.foodCost}</Text>
         <Text style={styles.foodCostBlurb}>Food Bill</Text>
         </View>
         {/* <Text style={styles.split}>Split between X people</Text> */}
         <View style={styles.foodCostWrapper}>
         <Text style={styles.foodCost}>£{event.drinksCost}</Text>
         <Text style={styles.drinkCostBlurb}>Drinks Bill</Text>
         </View>
         {/* <Text style={styles.split}>Split between X people</Text> */}

  </View>
})




const myArc = eventUsers.filter(a => a[2] === props.route.params.user).map((user:any, i) => {


   return <View style={styles.me} key={user[2]}>

   <Text style={styles.textMe}>You {event[0].arcsPaid[user[2]] ? 'paid' : 'owe'} £{event[0].arcs[user[2]]}</Text>
   <Text style={styles.textBlurbMe}>for {event[0].arcItems[props.route.params.user].length === 2 ? 'Food and Drink' : event[0].arcItems[props.route.params.user] === 'F' ? 'Food Only' : 'Drinks only'}</Text>
   <View>

   </View>
   <View style={paid ? styles.payNowButtonClicked : styles.payNowButton }>
      <Button
      color='black'
      title={paid ? 'Paid!' : 'Pay Now'}
      onPress={() => {
        payNow(event[0]._id, props.route.params.user)
      }
    } />
    </View>

   </View>

 })



   const friendsArc = eventUsers.filter(a => a[2] !== props.route.params.user).map((user:any, i) => {
      return <View style={styles.othersWrapper} key={user[2]}>
      <Text style={styles.othersBill}>{event[0].arcFirstNames[user[2]] + ' ' + user[1]} {event[0].arcsPaid[user[2]] ? 'paid' : 'owes'} £{event[0].arcs[user[2]]}</Text>
      <Text style={styles.othersBlurb}>for {event[0].arcItems[user[2]].length === 2 ? 'Food and Drink' : event[0].arcItems[user[2]] === 'F' ? 'Food' : 'Drinks'}</Text>
      </View>

    })



  return (
    <ScrollView>

    <View style={styles.container}>
      {details}
      {props.route.params.user === creator ? <Text style={styles.creator}>You Created The Event!</Text> : myArc}
      {/* {myArc} */}
      {friendsArc ? friendsArc : 'hi you'}
      <View style={styles.buttonBack}>

      <Button color='white'
      title='Back to Events'
      onPress={() => {
        navigation.goBack()
      }}/>

      </View>
    </View>
      </ScrollView>
  )
}
// function goBack() {
//   throw new Error('Function not implemented.');
// }


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // width: 280,
    height:1500,
    alignItems:'center',
    justifyContent: 'flex-start',
    backgroundColor: "rgb(20,20,30)"
  },
  title: {
    marginLeft:30,
    alignItems: 'center',
    flexDirection:'row',
    justifyContent: 'center',
    width:200,
color: '#C996D4',
fontSize:40,
flexWrap:'wrap',
fontWeight:'bold'
// color:'#C996D4'
  },
  venue: {
    borderTopColor:'#D3D3D3',
    borderTopWidth:2,
    color: 'white',
    marginLeft:20,
    marginTop:10,
    marginBottom:10,
    fontSize:30,
    fontWeight:'bold'
    // height:100

  },
  date: {
    color: 'white',
    marginLeft:20,
    marginTop:15,
    fontSize:18,
    fontStyle:'italic'

  },
  totalCostWrapper: {
    flexDirection:'row'
  },
  totalCostBlurb: {
    color: '#a9a9a9',
    marginLeft:20,
    marginTop:10,
    fontSize:25,
    fontStyle:'italic',
    // fontWeight:'bold'
  },
  totalCost: {
    color: '#D3D3D3',
    marginLeft:20,
    marginTop:10,
    fontSize:25,
    fontStyle:'italic',
    fontWeight:'bold'
    // color: 'w',
  },
  foodCostWrapper: {
    flexDirection:'row'
  },
  foodCostBlurb: {
    color: '#a9a9a9',
    marginLeft:20,
    marginTop:10,
    fontSize:25,
    fontStyle:'italic',
    // fontWeight:'bold'
  },
  drinkCostBlurb: {
    color: '#a9a9a9',
    marginLeft:20,
    marginTop:10,
    marginBottom:12,
    fontSize:25,
    fontStyle:'italic',
    // fontWeight:'bold'
  },
  foodCost: {
    color: '#D3D3D3',
    marginLeft:20,
    marginTop:10,
    fontSize:25,
    fontStyle:'italic',
    fontWeight:'bold'
    // color: 'w',
  },
  cost: {
    color: '#D3D3D3',
    marginLeft:20,
    marginTop:10,
    fontSize:25,
    fontStyle:'italic',
    fontWeight:'bold'

  },
  me: {
    marginTop:20,
    borderTopColor: '#C996D4',
    borderBottomColor: '#C996D4',
    borderTopWidth: 2,
    fontWeight:'bold',
    // borderBottomWidth: 2,
    width:'60%',
    alignItems: 'center'

  },

  textMe: {
    marginTop:20,
    color: 'white',
    // marginLeft:20,
    // marginTop:10,
    fontSize:25,

  },
  textBlurbMe: {
    fontSize:20,
    color: 'white',
    marginTop:3,
    fontStyle:'italic',
  },
  split: {

  },
  logo: {
    width:150,
    height:150,
    marginLeft:30

    // marginLeft:185
    // top:20,
  },
  header:{
    flexDirection:'row',
    // flexWrap: 'wrap',
    // height:120,
    width:400,
    height:150,
    marginTop:25,
    justifyContent: 'center',
    alignItems:'center',
    marginBottom:0,
    paddingBottom:0,
    borderBottomColor:'#C996D4',
    borderTopColor:'rgb(20,20,30)',
    borderLeftColor:'rgb(20,20,30)',
    borderRightColor:'rgb(20,20,30)',
    // borderBottom
    borderWidth:4
  },

  payNowButton: {
      justifyContent: 'center',
      width: 180,
      marginTop: 20,
      height: 40,
      backgroundColor: '#29b6f6',
      borderRadius: 4,
      fontWeight: "bold",
      marginBottom: 17
    },
  payNowButtonClicked: {
      justifyContent: 'center',
      width: 180,
      marginTop: 20,
      height: 40,
      backgroundColor: 'white',
      borderRadius: 4,
      fontWeight: "bold",
      marginBottom: 20
    },
    othersWrapper: {
      marginTop:20,
      borderTopColor: '#C996D4',
      borderBottomColor: '#C996D4',
      borderTopWidth: 2,
      // borderBottomWidth: 2,
      width:'90%',
      alignItems: 'center'

    },
    othersBill: {
      marginTop:13,
    color: 'white',
    // marginLeft:20,
    // marginTop:10,
    fontSize:15,
    },
    othersBlurb: {
      marginTop:5,
    color: '#a9a9a9',
    // marginLeft:20,
    // marginTop:10,
    fontSize:15,
    },
    buttonBack: {
      justifyContent: 'center',
    width: 150,
    marginTop: 20,
    height: 40,
    backgroundColor: 'black',
    borderRadius: 8,
    fontWeight: "bold",
    marginBottom: 20,
    borderColor:'grey',
    borderWidth: 1
    },
    creator: {
      backgroundColor:"rgb(20,20,30)",
    marginBottom:10,
    marginTop:10,
    borderColor:'#187bcd',
    color:'#187bcd',
    borderWidth:1,
    padding:4,
    fontSize: 20,
    fontWeight:'bold',
    borderRadius: 3,
    }




})


