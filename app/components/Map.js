import React, { Component, StyleSheet, View, Dimensions, AlertIOS, Text  } from 'react-native';
import Button from 'react-native-button';
import MapView from 'react-native-maps';
import _ from 'underscore';
import redPin from '../assets/redPin.png';
import { PinCallout } from './PinCallout';
import PinEditButton from './PinEditButton';
import { myCurrLoc, currLoc } from '../lib/db/db';
import FriendLocations from './FriendLocations';

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: null,
      selectedPin: undefined,
      dropPinLocation: undefined,
      loaded: false,
      friendLocs: {},
    };
  }
// Friend
  componentWillMount() {
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
    console.log('rendienrafgaf')
    let copy = this.state.friendLocs;
    return _.map(copy, (coords, id) => {
        // console.log(coords,'coords?')
        return (
        <MapView.Marker
          coordinate={coords}
          key={id}
          image={{uri: "https://scontent.xx.fbcdn.net/hprofile-prn2/v/t1.0-1/c0.7.50.50/p50x50/993777_10151526626173598_615258953_n.jpg?oh=a23e645024f54a13baa412d052bd5a7c&oe=578DD21D"}}
          // image={redPin}
          style={styles.icon}
        />

        )
      });
  }

  onRegionChange(region) {
    this.setState({ position: region });
  }

  setPinTitle(title) {
    const { getLocationToSave, recent } = this.props;
    getLocationToSave(this.state.dropPinLocation, recent, title);
    this.setState({dropPinLocation: undefined});
  }

  dropPin(coordinate) {
    this.setState({dropPinLocation: coordinate});
    AlertIOS.prompt(
        'Drop a Pin?',
        'Enter title:',
        [{
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: this.setPinTitle.bind(this)
        }],
        'plain-text'
      );
  }
  
  renderMarkers() {
    const { pins } = this.props;
    return _.map(pins, (pinObject, key) => {
      return (
        <MapView.Marker
          image={redPin}
          key={key}
          coordinate={{latitude: pinObject.latitude, longitude: pinObject.longitude}}
          onSelect={() => this.setState({ selectedPin: pinObject })}
          onDeselect={() => this.setState({ selectedPin: undefined })}
        >
          <MapView.Callout tooltip>
            <PinCallout>
              <Text style={{ color: 'black', alignSelf:'center', fontSize:16 }}>{pinObject.title}</Text>
            </PinCallout>
          </MapView.Callout>

        </MapView.Marker>
      );
    });
  }

  // componentDidMount () {
  //   myCurrLoc.on('value', function() {
  //     console.log('walking')
  //   })
  // }

  renderEditButton() {
    const { updatePins, updateRecent, deletePin } = this.props;
    return (
      <View style={styles.editButton}>
        <PinEditButton 
          pin={this.state.selectedPin}
          updatePins={updatePins}
          updateRecent={updateRecent}
          deletePin={deletePin}
          hideButton={() => this.setState({selectedPin: undefined})}
        />
      </View>
    )
  }

  moveMapToUser(location) {
    const {currLoc} = this.props;
    let currRegion = {
      latitude: currLoc.latitude,
      longitude: currLoc.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005
    };
    this.refs.map.animateToRegion(currRegion, 250)
  }



  render() {
    const { pins, getLocationToSave, currLoc, recent, friends, fullLoc } = this.props;
    // console.log('render Map')
    return (
      <View style={styles.container}>
        <MapView
          ref="map"
          showsUserLocation={true}
          //TODO: find a better way to show map initially, added below line so it would stop zooming in from world view
          initialRegion={{ longitudeDelta: 0.005, latitude: currLoc.latitude,longitude: currLoc.longitude, latitudeDelta: 0.005 }}
          region={this.state.position}
          onRegionChange={this.onRegionChange.bind(this)}
          style={styles.map}
          showsCompass={true}
          onLongPress={ (e) => {
              let coords = e.nativeEvent.coordinate
              this.dropPin(coords);
            }
          }
        >
        { Object.keys(pins).length !== 0 ? this.renderMarkers.call(this) : void 0 }

        { this.state.loaded === true ? this.renderFriends.call(this) : void 0 }

        </MapView>
        { this.state.selectedPin ? this.renderEditButton.call(this) : void 0 }
        <View style={styles.centerButton}>
          <Button
            style={[styles.bubble, styles.button]}
            onPress={this.moveMapToUser.bind(this, fullLoc)}>
            CENTER ON ME
          </Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    height: Dimensions.get('window').height,
  },

  map: {
    height: Dimensions.get('window').height/1.15,
    margin: 10,
    borderWidth: 1,
    borderColor: '#000000',
  },

  editButton: {
    position: 'absolute',
    backgroundColor: 'transparent',
    left: Dimensions.get('window').width/2 - 75,
    bottom: 90,
  },

  centerButton: {
    position: 'absolute',
    backgroundColor: 'transparent',
    left: Dimensions.get('window').width/2 - 100,
    bottom: 40,
    borderRadius: 10,
  },

  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },

  button: {
    width: 200,
    alignItems: 'center',
  },

  icon: {
    borderRadius: 13,
    backgroundColor: 'transparent',
  },
});

