
import React, { Component, StyleSheet, View, Dimensions, AlertIOS  } from 'react-native';

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
    };
    this.testRef = new Firebase("https://interruptedlobster.firebaseio.com/pins");
  }

  onRegionChange(region) {
    this.setState({ position: region });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          showsUserLocation={true}
          // followUserLocation={true}
          region={{
            latitude: this.props.currLoc.latitude,
            longitude: this.props.currLoc.longitude,
            latitudeDelta: 0.00922,
            longitudeDelta: 0.00421
          }}
          // onRegionChange={this.onRegionChange.bind(this)}
          style={styles.map}
          showsCompass={true}
          onLongPress={
            (e) => {
              let coords = e.nativeEvent.coordinate

              AlertIOS.alert(
                  'Drop a Pin?',
                  null,
                  [{
                    text: 'Cancel',
                    style: 'cancel'
                  },
                  {
                    text: 'OK',
                    onPress: () => {
                      this.props.dropPin(coords)
                      this.testRef.push(coords)
                    }
                  }]
                )
            }
          }
        />



      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
  },
  map: {
    height: Dimensions.get('window').height/2,
    margin: 10,
    borderWidth: 1,
    borderColor: '#000000',
  },
});
