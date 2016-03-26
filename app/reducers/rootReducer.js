import { combineReducers } from 'redux';
import pins from './reducer_pins';
import recent from './reducer_recent.js';
import user from './reducer_user';
import friends from './reducer_friends.js';
const rootReducer = combineReducers({
  pins,
  recent,
  user,
  friends
});

export default rootReducer;
