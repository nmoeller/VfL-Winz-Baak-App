import React,{useState} from 'react';
import { Text,View} from 'react-native';

export default function ScoreBoard({props,livescore}){

    return (
        <>
        <View style={style.container_header}>
            <Text style={style.header}>{"Scoreboard " +livescore.scoreboard_id}</Text>
        </View>
        <View style={style.container_header}>
        <View style={style.container}>
            <Text style={style.text}>{livescore.homeName}</Text>
            <Text style={style.text}>{livescore.homeScore}</Text>
          </View>
        <View style={style.container}>
            <Text style={style.text}>{livescore.guestName}</Text>
            <Text style={style.text}>{livescore.guestScore}</Text>
        </View>
      </View>
      </>
      )
  }
  
  const style = {
      container: {
          flexDirection: "column",
          alignItems : "center",
          justifyContent: "space-evenly",
          padding : 20
      },
      container_header: {
        flexDirection : "row",
        alignItems : "center",
        justifyContent: "space-evenly"
    },
      button : {
      },
      text : {
          fontSize : 20
      },
      header : {
        marginTop : 30,
        fontSize : 15
    }
      
  }
  
  
  
  