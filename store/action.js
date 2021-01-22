import encodeParams from '../sugokuHelper'
const urlSugoku = 'https://sugoku.herokuapp.com'

export const fetchSugoku = (level) => {
  return (dispatch, getState) => {
    fetch(`${urlSugoku}/board?difficulty=${level}`, {
      method: 'GET'
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw {response}
        }})
      .then(response => {
        dispatch({
          type: 'FETCH_BOARD',
          payload: response
        })
      })
      .catch(err => {
        console.log(err);
      })
  }
} 

export const validateSugoku = (value) => {
  return (dispatch, getState) => {
    fetch(`${urlSugoku}/validate`, {
      method: 'POST',
      body: encodeParams(value),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw {response}
        }})
      .then(response => {
        dispatch({
          type: 'FETCH_STATUS',
          payload: response
        })
      })
      .catch(err => {
        console.log(err);
      })
  }
} 

export const solvingSugoku = (value) => {
  return (dispatch, getState) => {
    fetch(`${urlSugoku}/solve`, {
      method: 'POST',
      body: encodeParams(value),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw {response}
        }})
      .then(response => {
        dispatch({
          type: 'FETCH_SOLVER',
          payload: {board: response.solution}
        })
        // console.log('here', {board: response.solution});
      })
      .catch(err => {
        console.log(err);
      })
  }
} 

export const fetchLeaderboard = (obj) => {
  return (dispatch, getState) => {
    const {sugokuReducer} = getState()
    const leaderboard = sugokuReducer.leaderboard
    let board = [...leaderboard, obj]
    const newBoard = board.sort((a, b) => a.seconds - b.seconds)
    dispatch({
      type: 'FETCH_LEADERBOARD',
      payload: newBoard
    })
  }
} 

export const statusInit = (value) => {
  return (dispatch, getState) => {
    dispatch({
      type: 'FETCH_STATUS',
      payload: {status: value}
    })
  }
} 

export const fetchPlainSugoku = () => {
  return (dispatch, getState) => {
    fetch(`${urlSugoku}/board`, {
      method: 'GET'
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw {response}
        }})
      .then(response => {
        dispatch({
          type: 'FETCH_BOARD',
          payload: response
        })
        dispatch({
          type: 'FETCH_SOLVER',
          payload: response
        })
      })
      .catch(err => {
        console.log(err);
      })
  }
} 