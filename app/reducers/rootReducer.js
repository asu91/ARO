import { combineReducers } from 'redux';
import pins from './reducer_pins';
import recent from './reducer_recent';
import user from './reducer_user';
import friends from './reducer_friends';
import targetPin from './reducer_target';

const rootReducer = combineReducers({
  pins,
  recent,
  user,
  friends,
  targetPin,
});

export default rootReducer;
