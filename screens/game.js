// import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator, Dimensions } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import {fetchSugoku, validateSugoku, solvingSugoku, statusInit, fetchPlainSugoku} from '../store/action'
import Status from '../components/status'
import CountDown from 'react-native-countdown-component';
import LottieView from 'lottie-react-native';
// import plainBoard from '../sugokuHelper/plainBoard'

const {width, height} = Dimensions.get('screen') 

export default function Game({navigation, route}) {
  const [boardLocal, changeBoard] = useState(null)
  const [status, changeStatus] = useState(null)
  const [seconds, addSeconds] = useState(0)
  const {name, difficulty} = route.params
  const theBoard = useSelector(state => state.sugokuReducer.board)
  const theStatus = useSelector(state => state.sugokuReducer.status)
  const theSolver = useSelector(state => state.sugokuReducer.solver)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSugoku(difficulty))
    dispatch(statusInit(null))
  }, [])

  useEffect(() => {
    if (theBoard) {
      changeBoard(theBoard)
    }
  }, [theBoard])

  useEffect(() => {
    if (theSolver) {
      // console.log('here');
      changeBoard(theSolver)
    }
  }, [theSolver])

  useEffect(() => {
    if (theStatus) {
      // console.log('here');
      changeStatus(theStatus)
    }
  }, [theStatus])

  const toValidate = () => {
    // console.log('here', boardLocal);
    dispatch(validateSugoku(boardLocal))
    // changeStatus(theStatus)
  }

  const makeSolved = () => {
    // console.log('here', boardLocal);
    dispatch(solvingSugoku(theBoard))
  }

  const toFinish = () => {
    // console.log('jeje');
    // changeBoard(plainBoard)
    dispatch(fetchPlainSugoku())
    navigation.replace('Finish', {
      name,
      difficulty,
      seconds
    })
  }

  const inputSugoku = (value, idxRow, idxCol) => {
    const num = Number(value)
    const indexRow = Number(idxRow)
    const indexCol = Number(idxCol)

    const newBoard =  boardLocal.board.map((row, iRow) => row.map((col, iCol) => {
      if (iRow === indexRow && iCol === indexCol) {
        return num
      } else {
        return col
      }
    }))

    changeBoard({board: newBoard})
  }

  if (!boardLocal) {
    return (
      <View style={styles.container}>
        <LottieView
          source={require('../assets/3127-halloween-smoothymon.json')}
          style={{width: 300, height: 300}}
          autoPlay
          loop
        />
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 25}}>Loading.....</Text>
      </View>
    )
  }

  if (boardLocal.board) {
    return (
      <View style={styles.container}>
        <View style={{padding: 0, justifyContent: 'space-between', flexDirection: 'row', height: 30, width:(width-30)}}>
          <Text style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>Go, Fight, Win {name}! </Text>
          <CountDown
            until={difficulty === 'easy' ? 420 : (difficulty === 'medium' ? 600 : 900)}
            onFinish={() => console.log('finished')}
            size={20}
            onChange={() => addSeconds(seconds + 1)}
            running={status?.status === 'solved' ? false : true}
            digitStyle={{backgroundColor: '#fad586'}}
            timeToShow={['M', 'S']}
          />
        </View>
        <View style={{width: (width-30), height: (width-30)}}>
          {boardLocal.board?.map((row, idxRow) => {
          return (
            <View key={idxRow} style={styles.row}>
              {row.map((col, idxCol) => {
                return <TextInput
                    key={idxCol}
                    keyboardType='numeric'
                    maxLength = {1}
                    onChangeText={(value) => inputSugoku(value, idxRow, idxCol)}
                    style={{ ...styles.column, backgroundColor: theBoard.board[idxRow][idxCol] === 0? 'white' : '#d6efc7' }}
                    value={col === 0? '' : `${col}`}
                    editable={theBoard.board[idxRow][idxCol] === 0? true: false}
                  />
              })}
            </View>)
            })}
        </View>
        <View style={{width: (width-30), height: (width-250), flexDirection: 'row', paddingTop: 20}}>
          <Status name={name} difficulty={difficulty} status={status} />
          <View style={{width: (width-222), height: (width-270), justifyContent: 'space-between', alignItems: 'flex-end'}}>
            <View style={{width: 160}}>
              <Button
                title="Validate Sugoku!"
                onPress={() => toValidate()}
                color='#2d6187'
              />
            </View>
            <View style={{width: 160}}>
              <Button
                title="Make it solved?"
                onPress={() => makeSolved()}
                color='#aa3a3a'
              />
            </View>
            <View style={{width: 160}}>
              <Button
                title="Submit"
                onPress={() => toFinish()}
                color='#7ea04d'
                disabled={status?.status === 'solved' ? false : true}
              />
            </View>
          </View>
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#184d47',
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    flexWrap: 'wrap',
    width: (width-30),
    height: (width-30)/9
  },
  column: {
    textAlign:'center',
    fontWeight:'bold',
    fontSize: 20,
    height: (width-30)/9,
    width: (width-30)/9,
    borderColor: 'gray',
    borderWidth: 2
  }
});
