import React from 'react'
import { StyleSheet, Text, View, ScrollView, Button,Dimensions } from 'react-native';

function leaderboardList(props) {
  const {rank, idx} = props
  const minutes = Math.floor(rank.seconds/60)
  const seconds = rank.seconds - (minutes * 60)
  return (
    <View style={{width: '100%', flexDirection: 'row'}}>
      <View style={{width:'10%'}}>
        <Text style={{textAlign: 'center'}}>{idx + 1}.</Text>
      </View>
      <View style={{width:'30%'}}>
        <Text style={{textAlign: 'center'}}>{rank.name}</Text>
      </View>
      <View style={{width:'30%'}}>
        <Text style={{textAlign: 'center'}}>{rank.difficulty}</Text>
      </View>
      <View style={{width:'30%'}}>
        <Text style={{textAlign: 'center'}}>{`${minutes > 9 ? minutes : `0${minutes}`} : ${seconds > 9 ? seconds : `0${seconds}`}`}</Text>
      </View>
    </View>
  )
}

export default leaderboardList
