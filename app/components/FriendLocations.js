import React, { Component, Text } from 'react-native';
import MapView from 'react-native-maps';
import { myCurrLoc } from '../lib/db/db';
import { PinCallout } from './PinCallout';


export default class FriendLocations extends Component {

  constructor(props) {
    super(props);
    this.state = {
      myLoc: {
        latitude: 0,
        longitude: 0
      }
    };
  }

  componentDidMount() {
    var self = this
    myCurrLoc.on('value', function(newLocation) {

      self.setState({ myLoc: newLocation.val() });
    });
  }

  render() {
    return (
      <MapView.Marker
        coordinate={this.state.myLoc}
      >
        <MapView.Callout tooltip>
          <PinCallout>
            <Text style={{ color: 'black', alignSelf:'center', fontSize:16 }}>ME</Text>
          </PinCallout>
        </MapView.Callout>
      </MapView.Marker>

    );
  }

}