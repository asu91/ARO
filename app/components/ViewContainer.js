import React, { Component, PropTypes, View } from 'react-native';
import AR from './AR.js';
import Map from './Map.js';
import Button from 'react-native-button';
import DropNewPinButton from '../containers/container_dropNewPin';
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
    this.firebaseRef = this.props.firebase.child('endpoint_Alex');

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

  push(e) {
    this.firebaseRef.push(e)
  }

        // <AR currLoc={ this.state.currLoc } pins={ this.props.pins.pins } />
  render() {
    const {actions, pins} = this.props
    return (
      <View>
        <Map
          dropPin={actions.getLocationToSave}
          currLoc={this.state.currLoc}
          pins = {pins}
          initialLoc={this.state.initialLoc}
          isFollowingUser={this.state.isFollowingUser}

        />     

        <DropNewPinButton/>
        <Button
          onPress={this.push.bind(this,'holymoly')}
        >
          press me
        </Button>
      </View>
    );
  }
}
