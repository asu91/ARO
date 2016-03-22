import {DROP_NEW_PIN} from '../constants/constants.js';

const initialState = [];


export default function(state = initialState, action) {
  switch(action.type) {
    case DROP_NEW_PIN:
      let newPin = {};
      newPin[action.id] = action.payload;
      return Object.assign({}, state,
        newPin
      );
    default:
      return state;
  }
}
