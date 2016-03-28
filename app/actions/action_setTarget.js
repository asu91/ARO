import { SET_TARGET } from '../constants/constants.js';

function setTarget(payload) {
  return {
    type: SET_TARGET,
    payload
  };
}

export default function(pin) {
  return (dispatch) => {
    dispatch(setTarget(pin));
  };
}
