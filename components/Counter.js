import { StatusBar } from 'expo-status-bar';
import { TextInput, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import React, { useState, useEffect } from 'react';

export default function Counter({setLivescore,livescore,update,kind}) {

    return (
        <View style={style.container}>
            <TextInput onEndEditing={(text)=>setLivescore({...livescore,[kind+"Name"]:text.nativeEvent.text})} style={style.input}>{livescore[kind+"Name"]}</TextInput>
            <Button style={style.button} labelStyle={{fontSize: 30}}  mode="contained" onPress={() => update(livescore[kind+"Score"] + 1)}><Text>+</Text></Button>
            <Text style={style.text}>{livescore[kind+"Score"]}</Text>
            <Button style={style.button} labelStyle={{fontSize: 40}} mode="contained" onPress={() => update(livescore[kind+"Score"]-1)}><Text>-</Text></Button>
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
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        fontSize:20
    },

    
}



