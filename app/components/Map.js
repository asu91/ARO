
import React, { Component, StyleSheet, View, Dimensions, AlertIOS  } from 'react-native';
import MapView from 'react-native-maps';
import Button from 'react-native-button';


export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: null,
    };
    this.testRef = new Firebase("https://interruptedlobster.firebaseio.com/pins");
  }

  onRegionChange(region) {
    this.setState({ position: region });
  }

  moveMapToUser(location) {
    this.setState({position: {
      longitude: this.props.currLoc.longitude,
      latitude: this.props.currLoc.latitude,
      longitudeDelta: 0.005,
      latitudeDelta: 0.005
    }});
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          showsUserLocation={true}
          region={this.state.position}
          onRegionChange={this.onRegionChange.bind(this)}
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
        <Button
          onPress={this.moveMapToUser.bind(this, this.props.fullLoc)}>
          CENTER ON ME
        </Button>

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
    height: Dimensions.get('window').height/1.5,
    margin: 10,
    borderWidth: 1,
    borderColor: '#000000',
  },
});
