import { applyMiddleware, combineReducers, createStore } from "redux";
import sugokuReducer from './reducer/sugokuReducer'
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  sugokuReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store