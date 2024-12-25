import React  from 'react';
import { Text, View, Image, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './Style';




export function Home() {
 
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fortal Barber</Text>
      <Image style={styles.img}
      source={require('../../images/barber.jpg')}
      />
      
      
      <StatusBar style='auto'/>
    </View>
    
  );
}
