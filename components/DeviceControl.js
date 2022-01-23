import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { AppState, View } from 'react-native';
import Counter from './Counter';
import base64 from 'react-native-base64'
GLOBALS = require('./globals');
import {useRoute} from '@react-navigation/native';



export default function DeviceControl({ navigation, route }) {
    var device = route.params.device
    const device_id = 1
    const [livescore,setLivescore] = useState({})

    const syncWithCounter = async () => {
        console.log("Sync Counter")
        fetchScores();
        var serviceId = "0000ffe0-0000-1000-8000-00805f9b34fb"
        var characteristicsId = "0000ffe1-0000-1000-8000-00805f9b34fb"
        try{
            await GLOBALS.BleManager.connectToDevice(device.id)
            await GLOBALS.BleManager.discoverAllServicesAndCharacteristicsForDevice(device.id)
            var message = await GLOBALS.BleManager.readCharacteristicForDevice(device.id,serviceId,characteristicsId)
            console.log(base64.decode(message.value))
            await GLOBALS.BleManager.cancelDeviceConnection(device.id)
        }catch(error){
            if(error.errorCode == 302){
                await GLOBALS.BleManager.cancelDeviceConnection(device.id) 
            }
            alert("Could not Sync with Device")
            console.log(JSON.stringify(error))
        }

    }

    const fetchScores = () => {
        fetch("https://tt.vfl-winz-baak.de/livescore/all")
            .then((response) => response.json()
                    .then((json) => {
                        var scoreboard = json[device_id-1]
                        setLivescore(scoreboard)
                    })
            )
    }

    const messageToBLE = async (message,onSuccess) => {
        console.log("Send Message")
        var serviceId = "0000ffe0-0000-1000-8000-00805f9b34fb"
        var characteristicsId = "0000ffe1-0000-1000-8000-00805f9b34fb"

        try {
            await GLOBALS.BleManager.connectToDevice(device.id)
            await GLOBALS.BleManager. discoverAllServicesAndCharacteristicsForDevice(device.id)
            var message = await GLOBALS.BleManager.writeCharacteristicWithoutResponseForDevice(device.id,serviceId,characteristicsId,base64.encode(message))
            console.log(base64.decode(message.value))
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
        console.log("updateCloud")
        return fetch('https://tt.vfl-winz-baak.de/livescore/update/'+device_id, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(livescore)
        });
    }

    const updateHome = (counter) => {
        messageToBLE("sh:"+counter,() =>  {  
        var newlivescore = livescore;
        newlivescore["homeScore"] = counter
        setLivescore(newlivescore)
        })
    }

    const updateGuest = (counter) => {
        messageToBLE("sg:"+counter,() => {
            var newlivescore = livescore;
            newlivescore["guestScore"] = counter
            setLivescore(newlivescore)
        })
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
    }, [livescore]);

    return (
        <View style={{flex:1,flexDirection:"row",justifyContent:"space-evenly"}}>
            <Counter setLivescore={setLivescore} livescore={livescore} kind={"home"} update={updateHome}></Counter>
            <Counter setLivescore={setLivescore} livescore={livescore} kind={"guest"} update={updateGuest}></Counter>
        </View>
    )
}



