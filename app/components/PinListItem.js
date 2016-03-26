import React, {Component, Text, TouchableHighlight, View, StyleSheet, AlertIOS} from 'react-native';
import FriendList from './FriendList';
import { ref } from '../lib/db/db';

export default class PinListItem extends Component {

  constructor(props) {
    super(props);
  }

  touchOptions() {
    const { pin, deletePin } = this.props;
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
          onPress: () => { this.renderFriends() },
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

  renderFriends() {
    const { friends, pin } = this.props;
    return (
      <FriendList onPress={this.shareWithFriend.bind( this, pin )} friends={friends} />
    );
  }

  shareWithFriend( pin, friend ) {
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
    const { user } = this.props;
    // Make a copy of the pin
    var pinCopy = Object.assign({}, pin);
    // Set pin.friend to the userID of the person sending the pin
    pinCopy.friend = user.id;
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
        <View style={style.container}>
          <Text style={style.text}>
            {pin.title}
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
  }
});
