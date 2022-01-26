import { User } from './types/userType';

const BASE_URL = 'http://127.0.0.1:3000';

interface CustomOptions {
  method: string,
  body?: string,
}

function fetchFactory(path: string, customOptions?: CustomOptions) {
  const defaultOptions = {
    headers: { 'Content-Type': 'application/json' },
  };

  const options = {
    ...defaultOptions,
    ...customOptions,
  };

  return fetch(BASE_URL + path, options)
    .then((res) => (res.status < 400 ? res : Promise.reject()))
    .then((res) => res.json());
}

function createUser(user: User) {
  return fetchFactory('/usercreate', {
    method: 'POST',
    body: JSON.stringify(user),
  });
}

function getUser(email: string) {
  return fetchFactory('/user', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
}

function getUsers() {
  return fetchFactory('/userlist');
}

function createEvent(event: any) {
  return fetchFactory('/eventcreate', {
    method: 'POST',
    body: JSON.stringify(event),
  });
}

function getEventsList(user: any) {
  return fetchFactory('/eventsList', {
    method: 'POST',
    body: JSON.stringify(user),
  });
}

function getEvent(event:any) {
  return fetchFactory('/currentEvent', {
    method: 'POST',
    body: JSON.stringify(event),
  });
}

function updatePayment(event:any, user:any) {
  return fetchFactory(`/events/${event}/${user}`, {
    method: 'PUT',
  });
}

const ApiService = {
  createUser,
  getUser,
  getUsers,
  createEvent,
  getEventsList,
  getEvent,
  updatePayment,
};

export default ApiService;
