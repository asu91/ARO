import React, { Component, Text, Image, View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { myCurrLoc } from '../lib/db/db';
import { PinCallout } from './PinCallout';


export default class FriendLocations extends Component {

  constructor(props) {
    super(props);
    this.state = {
      coordinate: {
        latitude: 0,
        longitude: 0
      }
    };
  }

  componentDidMount() {
    var self = this
    myCurrLoc.on('value', function(newLocation) {

      self.setState({ coordinate: newLocation.val() });
    });
  }

  animate() {

  }

  render() {
    return (
      // <View style={{borderRadius:13}}>
      <MapView.Marker
        coordinate={this.state.coordinate}
        image={{uri: "https://scontent.xx.fbcdn.net/hprofile-prn2/v/t1.0-1/c0.7.50.50/p50x50/993777_10151526626173598_615258953_n.jpg?oh=a23e645024f54a13baa412d052bd5a7c&oe=578DD21D"}}
        // centerOffset={{ x: -42, y: -60 }}
        style={styles.icon}
      >
        <MapView.Callout tooltip>
          <PinCallout>
            <Text style={{ color: 'black', alignSelf:'center', fontSize:16 }}>ME</Text>
          </PinCallout>
        </MapView.Callout>
      </MapView.Marker>
      // </View>

    );
  }
}

const styles = StyleSheet.create({
  icon: {
    borderRadius: 13,
    backgroundColor: 'transparent',
  }
})

