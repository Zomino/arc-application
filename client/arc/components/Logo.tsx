import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

export default function Logo() {
  return (
    <View>
      <Image source={require('../assets/logohq.png')} />
    </View>
  )
}
