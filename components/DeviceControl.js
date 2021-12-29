import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Counter from './Counter';
import base64 from 'react-native-base64'
GLOBALS = require('./globals');

export default function DeviceControl({ navigation, route }) {
    var device = route.params.device
    var [connected, setConnected] = useState(false)

    const connectToDevice = (device) => {
        GLOBALS.BleManager.connectToDevice(device.id).then((device) => {
                console.log("Connecttion Succesfully")
            })
            .catch((error) => {
                console.log(error)
            });
    }

    const messageToBLE = (message) => {
        var serviceId = "0000ffe0-0000-1000-8000-00805f9b34fb"
        var characteristicsId = "0000ffe1-0000-1000-8000-00805f9b34fb"
        GLOBALS.BleManager.writeCharacteristicWithoutResponseForDevice(device.id,serviceId,characteristicsId,base64.encode(message))
        .then(()=>console.log("Message sent succesfully"))
        .catch(()=>console.log("Message not sent succesfully"))
    }

    if (!connected) {
        console.log("Device is not Connected")
        connectToDevice(device)
    }

    return (
        <View>
            <Counter sendUpdate={messageToBLE} prefix={"sh:"}></Counter>
            <Counter sendUpdate={messageToBLE} prefix={"sg:"}></Counter>
        </View>
    )
}



