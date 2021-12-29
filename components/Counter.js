import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import React, { useState, useEffect } from 'react';

export default function Counter(props) {
    const [counter, setCounter] = useState(0);

    const sendMessage = (counterNew) => {
        setCounter(counterNew)
        props.sendUpdate(props.prefix+counterNew)
    }

    return (
        <View style={style}>
            <Button icon="minus" mode="contained" onPress={() => sendMessage(counter-1)}></Button>
            <Text>{counter}</Text>
            <Button icon="plus" mode="contained" onPress={() => sendMessage(counter + 1)}></Button>
        </View>
    )
}

const style = {
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-between"
}



