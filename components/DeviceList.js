import { StatusBar } from 'expo-status-bar';
import { AppState,PermissionsAndroid, StyleSheet, Text, TouchableOpacity,  View } from 'react-native';
import Device from './Device';
import { FAB,List,useTheme } from 'react-native-paper';
import { BleManager } from 'react-native-ble-plx';
import React, { useState, useEffect } from 'react';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
GLOBALS = require('./globals');
const manager = new BleManager();
GLOBALS.BleManager = manager


export default function DeviceList({ navigation , route}) {

  const [devices, setDevices] = useState([])
  const [bluethoothActive, setBluethoothActive] = useState(false)

  const scanDevices = () => {
    console.log("Scan Started")
    var deviceArray = []
    manager.startDeviceScan(null, { ScanMode: "Balanced" }, (error, device) => {
      if (error) {
        // Handle error (scanning will be stopped automatically)
        console.log(error)
        console.log(JSON.stringify(error))
        if(error.errorCode == 101){
          requestLocationPermission()
        }
        if(error.errorCode == 102){
          alert("Please turn your Bluethooth on")
        }
        if(error.errorCode == 600){
          alert("Scan not possible please wait some minutes")
        }
        manager.stopDeviceScan();
        //manager.destroy()
        return
      }
      
      var deviceFound = {
        id : device.id,
        name : device.name
      }

      console.log(deviceFound)
      deviceArray.push(deviceFound)
    
      if (device.name && deviceFound.name.includes("Winz-Baak")) {
        console.log(deviceFound)
        deviceArray.push(deviceFound)
      }
      
    });
    setTimeout(()=>
    {
      manager.stopDeviceScan()
      const uniqueDevices = deviceArray.filter((value, index) => {
        const _value = JSON.stringify(value);
        return index === deviceArray.findIndex(obj => {
          return JSON.stringify(obj) === _value;
        });
      });
      console.log(uniqueDevices)
      setDevices(uniqueDevices)
      console.log("Scan stopped")
    },1000)
    
  }

  const requestLocationPermission = async () =>
  {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location")
        scanDevices()
      } else {
        console.log("location permission denied")
        alert("To use Bluethooth you need to accept this");
      }
    } catch (err) {
      console.warn(err)
    }
  }

  const checkBluethoothState = () => {
    BluetoothStateManager.getState().then((state)=>{
      if(state == "PoweredOff"){
        setBluethoothActive(false)
      }
      if(state == "PoweredOn"){
        setBluethoothActive(true)
      }

    })
  }


  useEffect(() => {
    navigation.addListener('focus', () => {
        checkBluethoothState()
        if(devices.length == 0)
        {
          scanDevices()
        }
          
    });
     AppState.addEventListener('change', (nextAppState) => {
      var nState = navigation.getState()
      if (nextAppState === "active" && nState.routeNames[nState.index] == route.name) {
        checkBluethoothState()
        if(devices.length == 0){
          scanDevices()
        }         
      }
  });

}, []);

const colors = useTheme().colors
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  fab: {
    position: 'absolute',
    backgroundColor : colors.primary,
    margin: 16,
    right: 0,
    bottom: 0,
  },
});


  return (
    <View style={styles.container}>
        <List.Section>
    <List.Subheader>Verfügbare Zählgeräte</List.Subheader>
      {
        devices.map((device, i) => {
          return <TouchableOpacity key={i} onPress={() => navigation.navigate('DeviceControl', { device: device })}>
            <Device device={device}></Device>
          </TouchableOpacity>
        })
      }
      </List.Section>
        <FAB
          style={styles.fab}
          label="Search"
          icon="cached"
          onPress={() => scanDevices()}
          disabled = {!bluethoothActive}
        />
 
    </View>
  );
}


