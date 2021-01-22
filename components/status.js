import React from 'react'
import {Text, View, Dimensions } from 'react-native';

const {width, height} = Dimensions.get('screen') 


function Status(props) {
  const {name, difficulty, status} = props
  return (
    <View style={{width: (width-200), height: (width-270), backgroundColor:'#fad586', justifyContent: 'center', borderRadius: 5, elevation: 2}}>
      <View style={{padding: 5, justifyContent: 'space-between', height: 100}}>
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <View style={{width: '35%'}}>
            <Text>Name:</Text>
          </View>
          <View style={{width: '65%'}}>
            <Text style={{fontWeight: 'bold'}}>{name}</Text>
          </View>
        </View>
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <View style={{width: '35%'}}>
            <Text>Difficulty:</Text>
          </View>
          <View style={{width: '65%'}}>
            <Text style={{fontWeight: 'bold'}}>{difficulty}</Text>
          </View>
        </View>
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <View style={{width: '35%'}}>
            <Text>Status:</Text>
          </View>
          <View style={{width: '65%'}}>
            <Text style={{fontWeight: 'bold', color: status?.status === 'solved' ? '#065446' : (status?.status === 'broken' || status?.status === 'unsolved' ? 'red' : 'black')}}>{status?.status !== null? status.status + '!' : 'not validate'}</Text>
          </View>
       </View>
     </View>
    </View>
  )
}

export default Status
