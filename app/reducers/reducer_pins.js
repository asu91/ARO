import {PIN_MAP} from '../constants/constants.js';

const initialState = {
  pins: [],
};

export default function(state = initialState, action) {
  switch(action.type) {
    case 'PIN_MAP':
      return state;
    default:
      return state;
  }
}
