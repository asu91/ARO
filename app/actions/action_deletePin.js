import { DELETE_PIN } from '../constants/constants.js';
import { userData, userRecent } from '../lib/db/db.js';

function deletePin(selectedPin) {
  return {
    type: DELETE_PIN,
    payload: selectedPin
  };
};

function deleteRecentPin(selectedPin) {
  let newRecent;
  userRecent.once("value", (snapshot) => {
    let recents = snapshot.val(), index;
    for(var i = 0; i < recents.length; i++) {
      if(recents[i] === selectedPin.id) {
        index = i;
      }
    }
    recents.splice(index, 1);

    userRecent.set(recents);
  });
}

export default function (pin) {
    userData.child(pin.id).remove();
    deleteRecentPin(pin);
  return (dispatch) => {
    dispatch(deletePin(pin));
  };
}
