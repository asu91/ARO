import { DROP_NEW_PIN , userData } from '../constants/constants.js';
let nextPinId = 0;

function dropNewPin(pinInfo) {
  return {
    type: DROP_NEW_PIN,
    // id: nextPinId,
    // longitude: pinInfo.longitude,
    // latitude: pinInfo.latitude,
    // title: pinInfo.title
    payload: pinInfo
  };
}

export default function getLocationToSave(location) {
  nextPinId++;
  return (dispatch) => {
      var coords = {};
      if(!location) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
              coords.id = nextPinId;
              coords.longitude = position.coords.longitude;
              coords.latitude = position.coords.latitude;
              coords.title = 'My Current Location';
              dispatch(dropNewPin(coords));
              userData.push(coords);
          },
          (error) => {
            console.error(error);
          },
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );

      } else {
        coords.id = nextPinId;
        coords.longitude = location.longitude;
        coords.latitude = location.latitude;
        coords.title = 'New Pin Location';
        dispatch(dropNewPin(coords));
      }
    };
}
