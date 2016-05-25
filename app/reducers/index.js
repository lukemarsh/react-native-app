import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import chat from '../chat/reducers';
import otherChat from '../chat/otherReducers';

const rootReducer = combineReducers({
  chat,
  otherChat,
  routing: routerReducer
});

export default rootReducer;
