import { SET_TARGET } from '../constants/constants.js';

var initialState = '';

export default function(state = initialState, action) {
  switch(action.type){
    case SET_TARGET:
      return action.payload;
    default:
      return state;
  }
}
