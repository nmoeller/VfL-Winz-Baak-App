import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { List } from 'react-native-paper';

export default function Device(props) {
  return (
    <List.Item
      title={props.device.name}
      description="Zählgerät VFL Winz Baak"
      left={props => <List.Icon {...props} icon="numeric" />}
    />
  )
}



