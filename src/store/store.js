import { createStore, combineReducers } from 'redux'
import { algoReducer } from '../reducers/algoReducer';

const reducers = combineReducers({
    algoritmos: algoReducer
})

export const store = createStore(reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());