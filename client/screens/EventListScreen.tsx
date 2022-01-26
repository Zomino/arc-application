import React, { useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, ScrollView, Image} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import ApiService from '../ApiService';
import { position } from 'native-base/lib/typescript/theme/styled-system';



interface EventListScreenProps {
  user: string
}


export default function EventListScreen(props:any) {

  const [myEvents, setMyEvents] = useState([])


  const navigation = useNavigation();

  useEffect(() => {
    const currentUser = {user: props.route.params.user}
    ApiService.getEventsList(currentUser)
    // .then(events => console.log(events))
    .then(events => setMyEvents(events))
    .catch(err => console.log(err))
  },[myEvents],
  )


const attendedEvents = myEvents.map((event: any) =>
  {
    return <View style={styles.eventContainer} key={event._id}>
      {/* {event.creator === props.route.params.user ? <Text style={styles.creator}>Creator</Text> : null} */}
    <Text style={styles.eventHeader}>
      {event.eventName}
    </Text>
    <Text style={styles.venue}>
    {event.venue}
    </Text>
    <Text style={styles.label}>
          {event.date}
    </Text>
    <View style={styles.button}>
      <Text style={styles.button2}>
        Head To Event
    <Button


title=''
color='black'

onPress={() => {
  console.log('hi')
  navigation.navigate('SingleEventScreen', {
    eventId: event._id
  })
}} />
        </Text>
      </View>
      {event.creator === props.route.params.user ? <Text style={styles.creator}>Creator</Text> : null}
     </View>
  }
  )


  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.crosshead}>
        <Text style={styles.header}>Current Arcs</Text>
         <Image style={styles.logo} source={require('../assets/logohq.png')} />
    </View>
        {attendedEvents ? attendedEvents: <Text>Placeholder</Text>}
    </View>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // width: 280,
    height:1800,
    alignItems:'center',
    justifyContent: 'flex-start',
    backgroundColor: "rgb(20,20,30)"
  },
  logo: {
    width:100,
    height:100,
    marginLeft:75
    // top:20,
  },
  crosshead: {
    flexDirection:'row',
    height:100,
    marginTop:20,
    marginLeft:0,
    paddingLeft:0,
    alignItems: 'flex-end',
    justifyContent: 'center',
    // padding:
  },
  eventHeader: {
    color: 'white',
    fontSize: 30,
    paddingBottom:5,
    fontWeight: 'bold',
  },
  venue: {
    color: 'white',
    fontSize: 20,
    paddingBottom:3
  },
  eventContainer: {
    // flex: 1,
    // alignItems: 'cen',

    paddingTop: 20,
    paddingBottom: 5,
    width: "90%",
    borderTopColor:'#C996D4',
    borderRightColor:"rgb(20,20,30)",
    borderBottomColor:"rgb(20,20,30)",
    borderLeftColor:"rgb(20,20,30)",
    borderWidth:2,
    // paddingBottom:0,
    // borderBottom:40,
    height:165,
    alignItems:'flex-start',
    // justifyContent: 'flex-start',
    backgroundColor: "rgb(20,20,30)"
  },
  label: {
    color: 'white',
    marginTop: 5,
    marginBottom: 5,
    // fontWeight:'bold'
    // marginRight:220
  },
  header: {
    color: '#C996D4',
    marginTop: 40,
    marginBottom: 20,
    fontWeight:'bold',
    fontSize: 35,
    // marginRight:220
  },
  title: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold'
  },
  button: {
    justifyContent: 'center',
    width: 140,
    marginTop: 5,
    marginBottom: 10,
    height: 30,
    backgroundColor:'#29b6f6',
    borderRadius: 4,
    alignSelf: 'flex-start',
    color: 'black',
    fontSize: 2


  },
  button2: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom:10,
    paddingLeft:20,
    fontSize: 15,
  },
  creator: {
    backgroundColor:"rgb(20,20,30)",
    // marginBottom:1000,
    marginTop:120,
    borderColor:'#5579c6',
    color:'#5579c6',
    borderWidth:1,
    padding:6,
    borderRadius: 3,
    // paddingBottom:10,
    position:'absolute',
    marginLeft: 300,
    // marginTop: 50


  }

})
