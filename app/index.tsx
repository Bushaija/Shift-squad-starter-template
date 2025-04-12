import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';

const Index = () => {
  return (
    <View>
      <Link href="/sign-in">Sign In</Link>
      <Link href="/home">Home</Link>
      <Link href="/shifts">Shifts</Link>
      <Link href="/shifts/1">Shifts</Link>
      <Link href="/schedule">Schedule</Link>
      <Link href="/profile">Profile</Link>
    </View>
  )
}

export default Index;