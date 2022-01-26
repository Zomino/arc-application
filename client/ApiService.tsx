const base_url = 'http://127.0.0.1:3000'
import { User } from './types/userType'
import axios from '../node_modules/axios';


function fetchFactory(path: string, options: any) {


  return fetch(base_url + path, options)
    .then(res => res.status < 400 ? res : Promise.reject())
    .then(res => res.json())
    .catch(err => console.log(err))



}

function createUser(user: User) {
  return fetchFactory('/usercreate', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
}


function getUser(email: string) {
const objEmail = {email: email}
  console.log(objEmail)
  return fetchFactory('/user', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email:email})
  })
}

function getUsers() {
return fetchFactory('/userlist',{})
}


function createEvent(event: any) {
  return fetchFactory('/eventcreate', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(event)
  })
}

function getEventsList(user: any) {
  // console.log('hitting Api', user)
  return fetchFactory('/eventsList', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
}

function getEvent(event:any) {
  return fetchFactory('/currentEvent', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(event)
  })
}

function updatePayment(event:any, user:any) {
  // console.log('eventhitting api', event)
  return fetchFactory(`/events/${event}/${user}`, {method: "PUT"})
}




const ApiService = {createUser, getUser, getUsers, createEvent, getEventsList, getEvent, updatePayment}

export default ApiService