import React, { Component, PropTypes, StyleSheet, Text, View, Dimensions, AlertIOS  } from 'react-native';

import MapView from 'react-native-maps';


export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      lastPosition: undefined,
      pins: [],
      walker: undefined
    };

    this.currentPosition = new Firebase("https://interruptedlobster.firebaseio.com/testPosition");
  }

  // listenForItems(itemsRef) {
  //     itemsRef.on('value', (snap) => {
  //       // get children as an array
        
  //       this.setState({
  //         firebasePosition: snap
  //       });
  //     });
  //   }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({walker: initialPosition});
      },
      (error) => {
        alert(error.message)
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

    this.watchID = navigator.geolocation.watchPosition(
      (position) => {
        var lastPosition = JSON.stringify(position);
        // update firebase with current position
        // this.currentPosition.set(position);
        this.setState({lastPosition: position});
      }
    );

  }

  onRegionChange(region) {
    this.setState({ position: region });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          showsUserLocation={true}
          followUserLocation={true}
          region={this.state.position}
          onRegionChange={this.onRegionChange.bind(this)}
          style={styles.map}
          showsCompass={true}
          onLongPress={
            () =>
            // this.currentPosition.push('hello');
            // var event = JSON.stringify(e).split('\"').join('');
            AlertIOS.alert(
                'Drop a Pin?',
                null,
                [{
                  text: 'Cancel',
                  style: 'cancel'
                },
                {
                  text: 'OK'
                  // onPress: () => this.currentPosition.push(e)
                }]
              )
          }
        />

        <Text>
          {JSON.stringify(this.state.lastPosition)}
        </Text>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  map: {
    height: Dimensions.get('window').height/2,
    margin: 10,
    borderWidth: 1,
    borderColor: '#000000',
  },
});
