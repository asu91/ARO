import { DROP_NEW_PIN, UPDATE_RECENT } from '../constants/constants.js';
import { userData, userRecent } from '../lib/db/db.js';
function dropNewPin(payload, id) {
  return {
    type: DROP_NEW_PIN,
    id,
    payload
  };
}
function updateRecent(recentArray) {
  return {
    type: UPDATE_RECENT,
    recentArray
  };
}
function checkRecent(current, id) {
  var updated;
  if(current.length >= 10) {
    updated = current.slice(1);
    updated.push(id);
    return updated;
  } else {
    current = current.concat(id);
    return current;
  }
}

export default function getLocationToSave(location, current) {
  function getLocationHelper(loc, title, dispatch){
    let coords = {};
     coords.longitude = loc.longitude;
     coords.latitude = loc.latitude;
     coords.title = title;
     //this assigns pushedObj to added pin object while adding to db
     let pushedObj = userData.push(coords);
     coords.id = pushedObj.key();
     pushedObj.update({"id": pushedObj.key()});
     dispatch(dropNewPin(coords, pushedObj.key()));
     dispatch(updateRecent(checkRecent(current, coords.id)));
  }
  return (dispatch) => {
      if(!location) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
             getLocationHelper(position.coords, "My Current Location", dispatch);
          },
          (error) => {
            console.error(error);
          },
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
      } else {
        getLocationHelper(location, "My New Location", dispatch );
      }
    };
}
