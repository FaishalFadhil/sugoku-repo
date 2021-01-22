import React, {useEffect, useState} from 'react';
import { RadioButton } from 'react-native-paper';
import { StyleSheet, Text, View, TextInput, Button, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';

const {width, height} = Dimensions.get('screen') 

function Home({navigation}) {
  const [opening, changeOpening] = useState(true)
  const [input, changeInput] = useState({
    name: '',
    difficulty: ''
  })

  useEffect(() => {
    changeOpening(true)
    setTimeout(
      () => changeOpening(false), 
      5000)
  }, [])

  const toInput = (text, key) => {
    // console.log(opening);
    changeInput({
      ...input,
      [key]: text
    })
    
  }

  const toGameScreen = () => {
    const { name, difficulty } = input
    // console.log(input);
    navigation.navigate('Game', {
      name,
      difficulty
    })
    changeInput({
      name: '',
      difficulty: ''
    })
  }

  if (opening) {
    return (
      <View style={styles.container}>
        <View style={{width: (width - 80), height: (width - 20)}}>
          <View style={{...styles.positionTitle, height: '55%'}}>
            <Text style={{fontSize: 35, fontWeight: 'bold', color: '#d6efc7'}}>IT'S</Text>
            <Text style={{fontSize: 35, fontWeight: 'bold', color: '#d6efc7'}}>SU9OKU!</Text>
          </View>
          <View style={{height: '95%', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
            <LottieView
              source={require('../assets/3124-halloween-smoothymon.json')}
              style={{width: 350, height: 350}}
              autoPlay
              loop
            />
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={{width: (width - 80), height: (width - 90)}}>
        <View style={{...styles.positionTitle, height: '55%'}}>
          <Text style={{fontSize: 35, fontWeight: 'bold', color: '#d6efc7'}}>IT'S</Text>
          <Text style={{fontSize: 35, fontWeight: 'bold', color: '#d6efc7'}}>SU9OKU!</Text>
        </View>
        <View style={{height: '55%',flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
          <LottieView
              source={require('../assets/3126-halloween-smoothymon.json')}
              style={{width: 150, height: 150}}
              autoPlay
              loop
            />
          <LottieView
            source={require('../assets/3125-halloween-smoothymon.json')}
            style={{width: 150, height: 150}}
            autoPlay
            loop
          />
        </View>
      </View>
      <View style={styles.card}>
        <View style={{...styles.position, height: '65%'}}>
            <Text style={{fontWeight: 'bold', fontSize: 15}}>Name :</Text>
            <TextInput style={{
              borderColor: 'black',
              borderBottomWidth: 2,
              width: '90%'
            }} 
            value={input.name}
            onChangeText={(text) => toInput(text, 'name')}
            textAlign='center'
            />
            <Text style={{fontWeight: 'bold', fontSize: 15,paddingTop: 20, paddingBottom: 3}}>Level :</Text>
            <View style={{...styles.position, flexDirection: 'row', width: '100%', height: '20%'}}>
              <View style={{...styles.position, flexDirection: 'row', width: '30%', height: '20%'}}>
              <Text style={{fontWeight: 'bold', fontSize: 15}}>Easy</Text>
                <RadioButton
                    value="easy"
                    status={ input.difficulty === 'easy' ? 'checked' : 'unchecked' }
                    onPress={() => toInput('easy', 'difficulty')}
                  />
              </View>
              <View style={{...styles.position, flexDirection: 'row', width: '30%', height: '20%'}}>
              <Text style={{fontWeight: 'bold', fontSize: 15}}>Medium</Text>
                <RadioButton
                    value="medium"
                    status={ input.difficulty === 'medium' ? 'checked' : 'unchecked' }
                    onPress={() => toInput('medium', 'difficulty')}
                  />
              </View>
              <View style={{...styles.position, flexDirection: 'row', width: '30%', height: '20%'}}>
              <Text style={{fontWeight: 'bold', fontSize: 15}}>Hard</Text>
                <RadioButton
                    value="hard"
                    status={ input.difficulty === 'hard' ? 'checked' : 'unchecked' }
                    onPress={() => toInput('hard', 'difficulty')}
                  />
              </View>
            </View>
        </View>
        <View style={{...styles.position, height: '20%', paddingTop: 20}}>
          <View style={{width: '90%'}}>
            <Button
                title="Get Ready!"
                color='#f58634'
                onPress={() => toGameScreen()}
                disabled={input.name && input.difficulty ? false : true}
              />
          </View>
        </View>
      </View>
      <View style={{...styles.positionCredit,width: (width - 80), height: (height-600)}}>
        <Text style={{fontSize: 11, fontWeight: 'bold', color: '#d6efc7'}}>©2021 by FaishalFadhil</Text>
        <Text style={{fontSize: 11, fontWeight: 'bold', color: '#d6efc7'}}>Sugoku database from: https://github.com/berto/sugoku</Text>
      </View>
    </View >
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#184d47',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  card: {
    width: (width - 80),
    height: (width - 180),
    backgroundColor: '#96bb7c',
    borderRadius: 10
  },
  position: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  positionTitle: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },
  positionCredit: {
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});
