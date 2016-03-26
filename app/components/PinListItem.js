import React, {Component, Text, TouchableHighlight, View, StyleSheet, AlertIOS} from 'react-native';
import { Actions } from 'react-native-router-flux';
import FriendList from './FriendList';
import { ref } from '../lib/db/db';

export default class PinListItem extends Component {

  constructor(props) {
    super(props);
  }

  touchOptions() {
    const { pin, deletePin, friends } = this.props;
    AlertIOS.prompt(
        pin.title,
        '('+pin.longitude + ', ' + pin.latitude + ')',
        [{
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Edit Title',
          onPress: this.editTitle.bind(this)
        },
        {
          text: 'Share Pin',
          onPress: () => { Actions.friends({ onPress: this.shareWithFriend.bind( this, pin ), friends: friends }) },
        },
        {
          text: 'Delete',
          onPress: () => {
            deletePin(pin);
          }
        }],
        'plain-text'
      );
  }

  shareWithFriend( pin, friend ) {
    const { user } = this.props;
    if( typeof user.id !== 'string' ) {
      console.log( 'shareWithFriend: user id must be a string' );
      return null;
    }
    if( typeof friend.id !== 'string' ) {
      console.log( 'shareWithFriend: friend id must be a string' );
      return null;
    }
    if( typeof pin !== 'object' ) {
      console.log( 'shareWithFriend: pin must be an object' );
      return null;
    }
    if( typeof pin.id !== 'string' ) {
      console.log( 'shareWithFriend: pin id must be a string' );
      return null;
    }
    // Make a copy of the pin
    var pinCopy = Object.assign({}, pin);
    // Set pin.friend to the userID of the person sending the pin
    pinCopy.friend = user;
    // Post the pin to the friend's firebase.
    var friendPin = ref.child( friend.id ).child( 'pins' ).child( pin.id );
    friendPin.set( pinCopy );
    return true;
  }

  editTitle(value) {
    const { pin, updatePins, updateRecent } = this.props;
    
    updatePins(pin, value);
    updateRecent();
  }

  render() {
    const { pin } = this.props;
    return (
      <TouchableHighlight 
        onPress={() => {
          this.touchOptions()
        }}
      >
        <View style={[style.container, pin.friend && style.friend]}>
          <Text style={style.text}>
            {pin.title}
          </Text>
          <Text style={style.friendName}>
            {pin.friend}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}


const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 4,
    margin: 4,
    padding: 6
  },
  text: {
    alignSelf: 'center',
    fontSize: 24,
  },
  friend: {
    backgroundColor: 'blue',
  }
});
