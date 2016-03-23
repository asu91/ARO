import { DELETE_PIN } from '../constants/constants.js';
import { userData } from '../lib/db/db.js';

function deletePin (selectedPin) {
  return {
    type: DELETE_PIN,
    payload: selectedPin
  };
};

export default function (pin) {
  return (dispatch) => {
    userData.child(pin.id).remove();
    dispatch(deletePin(pin));
  };
}
