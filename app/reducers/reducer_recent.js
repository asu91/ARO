import {UPDATE_RECENT, SET_RECENT} from '../constants/constants.js';

const initialState = [0,1,2];


export default function(state = initialState, action) {
  switch(action.type) {
    case SET_RECENT:
      return action.payload;
    case UPDATE_RECENT:
      return action.payload;
    default:
      return state;
  }
}
