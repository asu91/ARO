import {UPDATE_RECENT} from '../constants/constants.js';

const initialState = [0,1,2];


export default function(state = initialState, action) {
  switch(action.type) {
    case UPDATE_RECENT:
      return action.recentArray;
    default:
      return state;
  }
}
