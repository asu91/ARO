import React, { Component, Text, Image, View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import _ from 'underscore';
import { myCurrLoc, currLoc } from '../lib/db/db';
import { PinCallout } from './PinCallout';
import redPin from '../assets/redPin.png';


export default class FriendLocations extends Component {

  constructor(props) {
    super(props);
    this.state = {
      friendLocs: {},
      loaded: false,
    };
  }

  componentDidMount() {
    const { friends } = this.props;
    let self = this;
   
    console.log('friends length', friends)
    for(var i = 0; i < friends.length; i++) {
      self.setListener(friends[i]);
      console.log(i, friends.length-1)
      if(i === friends.length - 1) {
        console.log('set to true')
        this.setState({loaded: true});
      }
    }
  }

  setListener(friend) {
    let self = this;
    console.log('friend', friend)
    currLoc.child(friend.id).on("value", function(snap) {
      self.state.friendLocs[friend.id] = snap.val();
      console.log('snapval', snap.val());
      console.log('state',self.state.friendLocs);
    });
  }

  renderFriends() {
    let copy = this.state.friendLocs;
    return _.map(copy, (coords, id) => {
        // console.log(coords,'coords?')
        return (
        <MapView.Marker
          coordinate={{latitude: 37.33233141, longitude: -122.0312186}}
          key={id}
          image={{uri: "https://scontent.xx.fbcdn.net/hprofile-prn2/v/t1.0-1/c0.7.50.50/p50x50/993777_10151526626173598_615258953_n.jpg?oh=a23e645024f54a13baa412d052bd5a7c&oe=578DD21D"}}
          // image={redPin}
          style={styles.icon}
        />

        )
      });
  }

  render() {
    return (
      <View>
      { this.state.loaded === true ? this.renderFriends.call(this) : void 0 }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    borderRadius: 13,
    backgroundColor: 'transparent',
  }
})

