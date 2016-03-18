import React, { Component, PropTypes, View } from 'react-native';
import AR from './AR.js';
import Map from './Map.js';
import DropNewPinButton from '../containers/container_dropNewPin'

const testArray = [
  { name: 'AWS', latitude: 37.783278, longitude: -122.4084808 },           // AWS
  { name: 'Punjab', latitude: 37.7840612, longitude: -122.4093445 },       // Punjab
  { name: 'Hack Reactor', latitude: 37.7835551, longitude: -122.4089013 }, // Hack Reactor
  ];

export default class ViewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'map',
      currLoc: {
        latitude: 37.78825,
        longitude: -122.4324,
      },
    };
    this.fireRef = new Firebase("https://interruptedlobster.firebaseio.com/");
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var coords = {};
        coords.longitude = position.coords.longitude;
        coords.latitude = position.coords.latitude;
        this.setState({currLoc: coords});
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

  render() {
    return (
      <View>
        <AR currLoc={ this.state.currLoc } locs={ testArray }/>
        <Map 
          dropPin={this.props.actions.getLocationToSave}
          currLoc={this.state.currLoc}
        />
        <DropNewPinButton/>
      </View>
    );
  }
}
