import { DROP_NEW_PIN, UPDATE_PINS, DELETE_PIN } from '../constants/constants.js';


const initialState = {};


export default function(state = initialState, action) {
  switch(action.type) {
    case UPDATE_PINS:
      return Object.assign({},
         action.payload
      );
    case DROP_NEW_PIN:
      let newPin = {};
      newPin[action.id] = action.payload;
      return Object.assign({}, state,
        newPin
      );
    case DELETE_PIN:
      let id = action.payload.id;
      // create copy of state
      let deletedPinState = Object.assign({}, state);
      // create copy of reference to pin we want to delete
      deletedPinState[id] = Object.assign({}, state[id]);
      // delete pin
      delete deletedPinState[id];
      return deletedPinState;
    default:
      return state;
  }
}

// state.pins = {{},{},{}}
