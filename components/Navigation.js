import * as React from 'react';
import { useTheme } from 'react-native-paper';
import { View, Text, Button,Image } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import DeviceList from './DeviceList';
import DeviceControl from './DeviceControl';
import Feed from './NewsFeed'
import Links from './Links'
import LiveScoring from './LiveScoring';

function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications Screen</Text>
    </View>
  );
}

function CustomDrawerContent(props) {
  var theme = useTheme()
  return (
    <>
    <View style={{
        backgroundColor : theme.colors.primary,
        alignItems : "center",
        padding : 20,
        width : "100%"
      }}>
        <Image
          style={{ width: 70, height: 70 }}
          source={require('../images/s5_logo.png')}
        />
        <Text style={{marginTop: 8,fontSize: 20,fontWeight:"bold"}}>VfL Winz Baak</Text>
      </View>
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
    </>
  );
}

function LogoTitle(props) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection : "row",
        marginTop: 8,
        justifyContent : "space-between",
        width : "100%"
      }}
    >
      <View>
          <Text style={{flex: 1,marginTop: 8,justifyContent : "space-between",fontSize: 20,fontWeight:"bold"}}>{props.children}</Text>
      </View>
      <View>
        <Image
          style={{ width: 40, height: 40 }}
          source={require('../images/s5_logo.png')}
        />
      </View>
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function NavigationMenu() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerTitle: (props) => <LogoTitle {...props} /> }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="News" component={Feed} />
      <Drawer.Screen name="Links" component={Links} />
      <Drawer.Screen name="Live Scoring" component={LiveScoring}/>
      <Drawer.Screen name="Control Devices" component={DeviceList} />
      <Drawer.Screen options={{drawerItemStyle: { height: 0 }}} name="DeviceControl" component={DeviceControl} />
    </Drawer.Navigator>
  );
}


