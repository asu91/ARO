import { LOG_IN, LOG_OUT, UPDATE_FRIENDS} from '../constants/constants.js';
import { ref } from '../lib/db/db.js';
import { Actions } from 'react-native-router-flux';

export const logIn = (payload) => {
  return {
    type: LOG_IN,
    payload
  };
};
export const updateFriends = (payload) => {
  return{
    type: UPDATE_FRIENDS,
    payload
  };
};
export const firebase_check = (userCredentials) => {
  let {userId, token} = userCredentials;
  let api = "https://graph.facebook.com/v2.3/"+userId+"?fields=name,email,friends,picture&access_token="+token;
  let friendcall = "https://graph.facebook.com/v2.3/"+userId+"?fields=name,friends&access_token="+token;
  function checkIfUserExists(userId, callback) {
    ref.once('value', function(snapshot) {
    let userExistsBool = snapshot.hasChild(userId);
      callback(userExistsBool);
    });
  }
  return(dispatch) => {
    checkIfUserExists(userId, (userExist) => {
      if(!userExist) {
        let userInfo={};
        userInfo.id = userId;
        //fetch the other info
        return fetch(api)
        .then((response) => response.json())
        .then((responseData)=> {
          userInfo.name = responseData.name;
          userInfo.email = responseData.email;
          userInfo.picture = responseData.picture.data.url;
        //pushes all gathereed infor to database
        let newUser = ref.child(userId).set(userInfo);
        dispatch(updateFriends(responseData.friends.data));
        dispatch(logIn(userInfo));
        });
      } else {
        //this api call to fb updates friends list
        return fetch(friendcall)
        .then((response) => response.json())
        .then((responseData) => {
          ref.child(userId).on("value", function(snapshot) {
            let found = snapshot.val();
            const { id, name, email, picture } = found;
            let obj = {name, email, id, picture};
            dispatch(logIn(obj));
          });
          dispatch(updateFriends(responseData.friends.data));
        });
      }
    });
  };
};

export const logOut = function () {
  return {
    type: LOG_OUT
  };
};
