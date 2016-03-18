import { UPDATE_PINS, userData } from '../constants/constants.js';

function updatePins(pins) {
  return {
    type: UPDATE_PINS,
    pins: pins
  };
}

export default function() {
 return (dispatch) => {
  userData.once("value", function(snap) {
    snap.forEach(function(savedPin) {
      savedPin.val();
    });

  });
 };
}
