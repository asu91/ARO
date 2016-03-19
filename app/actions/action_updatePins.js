import { UPDATE_PINS, userData } from '../constants/constants.js';

function updatePins(allPins) {
  return {
    type: UPDATE_PINS,
    payload: allPins
  };
}

export default function() {
 return (dispatch) => {
  userData.once("value", function(snap) {
    var fetchedPins = [];
    snap.forEach(function(savedPin) {
      fetchedPins.push(savedPin.val());
    });
    updatePins(fetchedPins);
  });
 };
}
