import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import MyTabs from './Tab';
import Entry from './components/EntryComponent';

function App() {
  const [user, setUser] = useState('');

  return (
    <NavigationContainer>
      {user ?
        <MyTabs user={user} setUser={setUser} /> :
        <Entry setUser={setUser} />}
    </NavigationContainer>
  );
}

export default App;
