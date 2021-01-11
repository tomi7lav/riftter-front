import { combineReducers, createStore } from 'redux';
import authReducer from './auth';

const combined = combineReducers({
    auth: authReducer
});

const store = createStore(combined);

export default store;