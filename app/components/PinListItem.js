import React, {
  Component,
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
  AlertIOS,
  Image
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import FriendList from './FriendList';
import { ref } from '../lib/db/db';
import Location from '../lib/orientation/locationMath';


export default class PinListItem extends Component {

  constructor(props) {
    super(props);
  }

  touchOptions() {
    const { pin, friends, deletePin, setTarget, redraw } = this.props;
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
          text: 'Share',
          onPress: () => { Actions.friends({ onPress: this.shareWithFriend.bind( this, pin ), friends: friends }) },
        },
        {
          text: 'Set Target',
          onPress: () => {
            setTarget(pin);
            redraw();
          },
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

    var pinCopy = Object.assign({}, {alertedYet: false} ,pin);
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
    const { pin, targetPin, currLoc } = this.props;
    let name = 'Your Pin';
    let isTarget = pin.id === targetPin.id;
    let relative = Location.relativeLocsInFeet( currLoc, pin );
    let distance = Math.sqrt( Math.pow( relative.x, 2 ) + Math.pow( relative.z, 2 ) ).toFixed(0);
    if ( distance > 5280 ) {
      distance /= 5280;
      distance = Math.floor( distance );
      distance += ' mi.'
    } else {
      distance += ' ft.';
    }
    if( pin.friend ) {
     name = pin.friend.name;
    }
    return (
      <TouchableHighlight
        onPress={() => {
          this.touchOptions()
        }}
      >
        <View style={[style.container, pin.friend && style.friend, isTarget && style.target]}>
          <Image
            source={require('../assets/listviewPin.png')}
            style={style.pin}
          />
          <View style={style.left}>
            <Text style={[style.text, pin.friend && style.friendText, isTarget && style.targetText]}>
              {pin.title}
            </Text>
            <Text style={[style.friendName, isTarget && style.targetText]}>
              {name}
            </Text>
          </View>
          <View style={style.right}>
            <Text style={[style.distance,isTarget && style.targetText]}>
              {distance}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}


const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 4,
    margin: 4,
    padding: 6
  },
  left: {
    flex: 5,
    marginLeft: 10,
    alignSelf: 'flex-start',
  },
  right: {
    flex: 2,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    fontSize: 20,
  },
  text: {
    alignSelf: 'flex-start',
    fontSize: 24,
  },
  friend: {
    backgroundColor: 'lightblue',
  },
  friendName: {
    justifyContent: 'flex-start',
  },
  target: {
    backgroundColor: 'pink',
  },
  targetText: {
    color: 'black',
  },
  distance: {
    fontSize: 22,
  },
  pin: {
    flex: 1,
    alignSelf: 'center',
    height: 45,
  }
});
