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
        <View style={style.container}>
            <Text style={style.text}>{props.teamname}</Text>
            <Button style={style.button} labelStyle={{fontSize: 30}}  mode="contained" onPress={() => sendMessage(counter + 1)}><Text>+</Text></Button>
            <Text style={style.text}>{counter}</Text>
            <Button style={style.button} labelStyle={{fontSize: 40}} mode="contained" onPress={() => sendMessage(counter-1)}><Text>-</Text></Button>
        </View>
    )
}

const style = {
    container: {
        flexDirection: "column",
        padding: 50,
        alignItems : "center",
        justifyContent: "space-evenly"
    },
    button : {
    },
    text : {
        fontSize : 30
    }
    
}



