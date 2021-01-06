import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScrollAnimation from './src';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollAnimation />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
