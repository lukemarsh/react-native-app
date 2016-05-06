import { combineReducers } from 'redux';
import talks from '../talks/reducers';

const rootReducer = combineReducers({
  talks
});

export default rootReducer;
