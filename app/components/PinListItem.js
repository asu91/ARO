import React, {Component, Text, TouchableHighlight, View, StyleSheet, AlertIOS} from 'react-native';
import FriendList from './FriendList';

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
          onPress: () => { this.renderFriends },
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
    // Make a copy of the pin
    // Set pin.friend to the userID of the person sending the pin
    // Post the pin to the friend's firebase.
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
