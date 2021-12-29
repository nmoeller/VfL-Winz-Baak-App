import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, View } from 'react-native';
import Device from './Device';
import { FAB } from 'react-native-paper';
import { BleManager } from 'react-native-ble-plx';
import React, { useState, useEffect } from 'react';
GLOBALS = require('./globals');
//import { scanAndConnect,devices } from './BluethoothManager';
const manager = new BleManager();
GLOBALS.BleManager = manager


export default function DeviceList({ navigation }) {

  const [devices, setDevices] = useState([])
  var scanCounts = 0;

  const scanAndConnect = () => {
    manager.stopDeviceScan();
    var deviceArray = []
    manager.startDeviceScan(null, { ScanMode: "Balanced" }, (error, device) => {
      if (error) {
        // Handle error (scanning will be stopped automatically)
        console.log(error)
        console.log(JSON.stringify(error))
        manager.stopDeviceScan();
        //manager.destroy()
        return
      }
      var deviceFound = {
        id : device.id,
        name : device.name
      }
      if (device.name && checkIfFound(deviceFound.id,deviceArray)) {
        deviceArray.push(deviceFound)
      }
      setDevices(deviceArray)
    });
    
  }

  const checkIfFound = (id,array_to_check) => {
    array_to_check.forEach(element => {
      element.id == id
      return false
    });
    return true
  }

  if (devices.length == 0) {
    scanAndConnect();
  }

  return (
    <View style={styles.container}>
      {
        devices.map((device, i) => {
          return <TouchableOpacity key={i} onPress={() => navigation.navigate('DeviceControl', { device: device })}>
            <Device device={device}></Device>
          </TouchableOpacity>
        })
      }
        <FAB
          style={styles.fab}
          small
          icon="cached"
          onPress={() => scanAndConnect()}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 220
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

