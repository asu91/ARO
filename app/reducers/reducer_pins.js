import {DROP_NEW_PIN, UPDATE_PINS} from '../constants/constants.js';

const testArray = [
  { id: 0, title: 'AWS', latitude: 37.783278, longitude: -122.4084808 },           // AWS
  { id: 1, title: 'Punjab', latitude: 37.7840612, longitude: -122.4093445 },       // Punjab
  { id: 2, title: 'Hack Reactor', latitude: 37.7835551, longitude: -122.4089013 }, // Hack Reactor
  { id: 3, title: 'Starbucks', latitude: 37.7806573, longitude: -122.4070833 },    // Starbucks
];

const initialState = {
  pins: testArray,
};

export default function(state = initialState, action) {
  switch(action.type) {
    case UPDATE_PINS:
      return Object.assign({}, state, {
        pins: [
        ...state.pins,
        ...action.payload
        ]
      });
    case DROP_NEW_PIN:
      return Object.assign({}, state, {
        pins: [
        ...state.pins,
        action.payload
        ]
      });
    default:
      return state;
  }
}
