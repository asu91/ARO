export const PIN_MAP = 'PIN_MAP';
export const DROP_NEW_PIN = 'DROP_NEW_PIN';

const Firebase = require('firebase');
export const ref = new Firebase("https://interruptedlobster.firebaseio.com/tiff");
export const userData = ref.child('user');
