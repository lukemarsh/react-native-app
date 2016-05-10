import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import talks from '../talks/reducers';

const rootReducer = combineReducers({
  talks,
  routing: routerReducer
});

export default rootReducer;
