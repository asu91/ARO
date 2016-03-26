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
  let id = userCredentials.userId;
  let token = userCredentials.token;
  let api = "https://graph.facebook.com/v2.3/"+id+"?fields=name,email,friends,picture&access_token="+token;
  // let callfriends = "https://graph.facebook.com/v2.3/"+id+"?fields=name,email,friends,picture&access_token="+token;
  function checkIfUserExists(userId, callback) {
    ref.once('value', function(snapshot) {
    let userExistsBool = snapshot.hasChild(userId);
      callback(userExistsBool);
    });
  }
  return(dispatch) => {
    checkIfUserExists(id, (userExist) => {
      if(!userExist) {
        let userInfo={};
        userInfo.id = id;
        //fetch the other info
        return fetch(api)
        .then((response) => response.json())
        .then((responseData)=> {
          console.log('this is responseData and it should have friends', responseData.friends.data);

          userInfo.name = responseData.name;
          userInfo.email = responseData.email;
          userInfo.picture = responseData.picture.data.url;
        //pushes all gathereed infor to database
        let newUser = ref.child(id).set(userInfo);
        dispatch(updateFriends(responseData.friends.data));
        dispatch(logIn(userInfo));
        });
      } else {
        ref.child(id).on("value", function(snapshot) {
          let found = snapshot.val();
          dispatch(logIn(found));
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
