const initiate = {
  board: null,
  solver: null,
  status: null,
  leaderboard: []
}

const sugokuReducer = (state = initiate, action) => {
  switch (action.type) {
    case 'FETCH_BOARD':
      return {...state, board: action.payload}
    case 'FETCH_SOLVER':
      return {...state, solver: action.payload}
    case 'FETCH_STATUS':
      return {...state, status: action.payload}
    case 'FETCH_LEADERBOARD':
      return {...state, leaderboard: action.payload}
    default:
      break;
  }
  return state
}

export default sugokuReducer