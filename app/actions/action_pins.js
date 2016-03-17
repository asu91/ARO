import { DROP_NEW_PIN } from '../constants/constants.js';
import {store } from 'redux';
let nextPinId = 0;


// const fire = new Firebase("https://interruptedlobster.firebaseio.com/user1");

function dropNewPin(pinInfo) {
  return {
    type: DROP_NEW_PIN,
    id: nextPinId++,
    long: pinInfo.long,
    lat: pinInfo.lat,
    title: pinInfo.title
  };
}

export default function getLocationToSave() {
  return (dispatch) => {
    navigator.geolocation.getCurrentPosition(
    (position) => {
        var coords = {};
        coords.long = position.coords.longitude;
        coords.lat = position.coords.latitude;
        coords.title = 'My Current Location';
        dispatch(dropNewPin(coords));
        // fire.push(coords);
        console.log('made it in success callback of getLocationToSave', this.state);
    },
    (error) => {
      alert(error.message);
    },
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  };

}