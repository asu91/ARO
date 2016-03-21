import { UPDATE_PINS } from '../constants/constants.js';
import { userData } from '../lib/db/db.js';
function updatePins(allPins) {
  console.log('updating pins')
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
    dispatch(updatePins(fetchedPins));
  });
 };
}
