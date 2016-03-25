import { UPDATE_PINS } from '../constants/constants.js';
import { userData } from '../lib/db/db.js';
function updatePins(payload) {
  return {
    type: UPDATE_PINS,
    payload
  };
}

export default function(pin, newTitle) {
  if(arguments.length === 2) {
    pin.title = newTitle;
    userData.child(pin.id).set(pin);
  }
  return (dispatch) => {
    userData.on("value", function(snap) {
      dispatch(updatePins(snap.val()));
    });
  };
}
