import { SET_TARGET } from '../constants/constants.js';

var initialState = {id:0};

export default function(state = initialState, action) {
  switch(action.type){
    case SET_TARGET:
      return action.payload;
    default:
      return state;
  }
}
