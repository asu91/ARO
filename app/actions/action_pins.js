import { DROP_NEW_PIN } from '../constants/constants.js';

let nextPinId = 0;


// const Firebase = new Firebase("https://interruptedlobster.firebaseio.com/user1");

function getposition(){
  let coords = {};
  navigator.geolocation.getCurrentPosition(
    (position) => {
        coords.long = position.coords.longitude;
        coords.lat = position.coords.latitude;
        coords.title = 'My Current Location';
    },
    (error) => {
      alert(error.message);
    },
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
  );

  return coords;
}

function dropNewPin(pinInfo) {
  return {
    type: DROP_NEW_PIN,
    id: nextPinId++,
    pinInfo: pinInfo
  }
}

export default function getLocationToSave(long, lat, title) {
  return (dispatch) => {
    return getposition().then(function(coords) {
      // Firebase.push(coords);
      dispatch(dropNewPin(coords));
    })
  }

  // return {
  //   type: "asdfa"
  // }
}