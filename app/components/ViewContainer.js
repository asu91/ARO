import React, { Component, PropTypes, View } from 'react-native';
import AR from './AR.js';
import Map from './Map.js';
import Button from 'react-native-button';
import DropNewPinButton from '../containers/container_dropNewPin'
export default class ViewContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      view: 'map',
      currLoc: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
      isFollowingUser: true,
    };
    this.fireRef = new Firebase("https://interruptedlobster.firebaseio.com/");
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var coords = {};
        coords.longitude = position.coords.longitude;
        coords.latitude = position.coords.latitude;
        this.setState({
          currLoc: coords
        });
      },
      (error) => {
        alert(error.message)
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

    this.watchID = navigator.geolocation.watchPosition(
      (position) => {
        var coords = {};
        coords.longitude = position.coords.longitude;
        coords.latitude = position.coords.latitude;
        this.setState({
          currLoc: coords
        });
        // update firebase with current position
        // this.currentPosition.set(position);
      }
    );
  }



        // <AR locs={ this.state.currLoc }/>
  render() {
    return (
      <View>
        <AR currLoc={ this.state.currLoc } pins={ this.props.pins.pins } />
        <Map 
          dropPin={this.props.actions.getLocationToSave}
          initialLoc={this.state.initialLoc}
          currLoc={this.state.currLoc}
          fullLoc={this.state.fullLoc}
          isFollowingUser={this.state.isFollowingUser}
          toggleFalse={
            () => this.toggleFalse()
          }
        />     

        <DropNewPinButton/>
      </View>
    );
  }
}
