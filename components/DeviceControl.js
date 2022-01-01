import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { AppState, View } from 'react-native';
import Counter from './Counter';
import base64 from 'react-native-base64'
GLOBALS = require('./globals');
import {useRoute} from '@react-navigation/native';



export default function DeviceControl({ navigation, route }) {
    var device = route.params.device
    const [guest,setGuest] = useState(0)
    const [home, setHome] = useState(0)

    const syncWithCounter = async (device) => {
        console.log("Sync")
        setHome(0)
        setGuest(0)
    }

    const messageToBLE = async (message,onSuccess) => {
        var serviceId = "0000ffe0-0000-1000-8000-00805f9b34fb"
        var characteristicsId = "0000ffe1-0000-1000-8000-00805f9b34fb"

        try {
            await GLOBALS.BleManager.connectToDevice(device.id)
            await GLOBALS.BleManager.writeCharacteristicWithoutResponseForDevice(device.id,serviceId,characteristicsId,base64.encode(message))
            onSuccess()
            await GLOBALS.BleManager.cancelDeviceConnection(device.id) 
        } catch (error) {
            if(error.errorCode == 302){
                alert("Could not sent Message")
                await GLOBALS.BleManager.cancelDeviceConnection(device.id) 
            }
            console.log(JSON.stringify(error))
        }
       
    }

    const updateCloud = async ()=>{
        var data = {
            "id": 1,
            "guestName": "Gast",
            "guestScore": guest,
            "homeName": "VfL Winz Baak",
            "homeScore": home,
            "scoreboard_id": 1
        }
        return fetch('https://tt.vfl-winz-baak.de/livescore/update/1', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    const updateHome = (counter) => {
        messageToBLE("sh:"+counter,() => setHome(counter))
    }

    const updateGuest = (counter) => {
        messageToBLE("sg:"+counter,() => setGuest(counter))
    }

    useEffect(() => {
        navigation.addListener('focus', () => {
            syncWithCounter();
        });
        AppState.addEventListener('change', (nextAppState) => {
        var nState = navigation.getState()
        if (nextAppState === "active" && nState.routeNames[nState.index] == route.name) {
            syncWithCounter();
          }
      });
    
    }, []);

    useEffect(() => {
        updateCloud()
    }, [guest,home]);

    return (
        <View style={{flex:1,flexDirection:"row",justifyContent:"space-evenly"}}>
            <Counter  update={updateHome} counter={home} teamname={"Heim"}></Counter>
            <Counter  update={updateGuest} counter={guest} teamname={"Gast"}></Counter>
        </View>
    )
}



