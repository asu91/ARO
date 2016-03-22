import { DROP_NEW_PIN, UPDATE_PINS, DELETE_PIN } from '../constants/constants.js';

const testObj = {
 0: { title: 'AWS', latitude: 37.783278, longitude: -122.4084808 },
 1: { title: 'Punjab', latitude: 37.7840612, longitude: -122.4093445 },
 2: { title: 'Hack Reactor', latitude: 37.7835551, longitude: -122.4089013 },
 3: { title: 'Apple Inc', latitude: 37.78825, longitude: -122.4324}
};

const initialState = testObj;


export default function(state = initialState, action) {
  switch(action.type) {
    case UPDATE_PINS:
        console.log('payload:',action.payload)
      return Object.assign({}, state,
         action.payload
      );
    case DROP_NEW_PIN:
      let newPin = {};
      newPin[action.id] = action.payload;
      return Object.assign({}, state,
        newPin
      );
    case DELETE_PIN:
      let id = action.payload.id
      let deletedPinState = Object.assign({}, state);
      deletedPinState[id] = Object.assign({}, state[id]);
      delete deletedPinState[id];      

      return Object.assign({},
        deletedPinState
      )
    default:
      return Object.assign({}, state
      );
  }
}

// state.pins = {{},{},{}}
