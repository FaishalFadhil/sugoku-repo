import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ScrollView, Button,Dimensions } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import {fetchLeaderboard} from '../store/action'
import LeaderboardList from '../components/leaderboardList'
import LottieView from 'lottie-react-native';

const {width, height} = Dimensions.get('screen') 

function Finish({navigation, route}) {
  const {name, difficulty, seconds} = route.params
  const theLeaderboard = useSelector(state => state.sugokuReducer.leaderboard)
  const dispatch = useDispatch()
  const [finishing, changeFinishing] = useState(true)

  useEffect(() => {
    changeFinishing(true)
    setTimeout(
      () => {
        const obj ={
          name,
          difficulty,
          seconds
        }
        dispatch(fetchLeaderboard(obj))
        changeFinishing(false)}, 
      3000)
  }, [])

  const toHome = () => {
    navigation.navigate('Home')
  }

  if (finishing) {
    return (
      <View style={styles.container}>
        <LottieView
          source={require('../assets/4053-crying-smoothymon.json')}
          style={{width: 300, height: 300}}
          autoPlay
          loop
        />
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 25}}>Loading.....</Text>
      </View>
    )
  }


  return (
    <View style={styles.container}>
      <View style={{width: (width-100), flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{width: '50%'}}>
          <Text style={styles.font}>Congratulations {name}! You finished the game!</Text>
        </View>
        <View style={{width: '50%'}}>
          <LottieView
            source={require('../assets/4052-smoothymon-typing.json')}
            style={{width: 100, height: 100}}
            autoPlay
            loop
          />
        </View>
      </View>
      <View style={styles.card}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Leaderboard</Text>
          <View style={{width: '85%', flexDirection: 'row', paddingTop: 10}}>
            <View style={{width:'10%', borderBottomWidth: 1}}>
              <Text style={{textAlign: 'center'}}>No.</Text>
            </View>
            <View style={{width:'30%', borderBottomWidth: 1}}>
              <Text style={{textAlign: 'center'}}>Name</Text>
            </View>
            <View style={{width:'30%', borderBottomWidth: 1}}>
              <Text style={{textAlign: 'center'}}>Difficulty</Text>
            </View>
            <View style={{width:'30%', borderBottomWidth: 1}}>
              <Text style={{textAlign: 'center'}}>Time</Text>
            </View>
          </View>
        <ScrollView style={{height: '80%', width: '85%', paddingBottom: 10}}>
          {theLeaderboard.map((rank, idx) => <LeaderboardList key={idx} rank={rank} idx={idx} />)}
        </ScrollView>

        <View style={{paddingTop: 10}}>
          <Button
            title="Back to Home"
            onPress={() => toHome()}
            color='#00917c'
          />
        </View>
      </View>
      <Text style={styles.font2}>Thankyou for playing!</Text>
    </View >
  )
}

export default Finish

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#184d47',
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    width: (width-100),
    height: (height-450),
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10
  },
  font: {
    color: 'white',
    // paddingBottom: 10,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'left'
  },
  font2: {
    paddingTop: 5,
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
