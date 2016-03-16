import { 'DROP_NEW_PIN'} from '../constants/constants.js';

let nextPinId = 0;

export default function dropNewPin(long, lat, title) {
  return {
    type: DROP_NEW_PIN,
    id: nextPinId++,
    lat,
    long,
    title
  }
}
