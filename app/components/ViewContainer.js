import React, { Component, View } from 'react-native';
import AR from './AR.js';
import Map from './Map.js';
import DropNewPinButton from '../containers/container_dropNewPin';
import Button from 'react-native-button';
import PinList from './PinList.js';

export default class ViewContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      view: 'map',
      currLoc: {
        latitude: 37.7835551,
        longitude: -122.4089013,
      },
    };
  }

  componentWillMount() {
    const { getPins, updateRecent } = this.props;
    getPins();
    updateRecent();
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
        alert(error.message);
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );

    this.watchID = navigator.geolocation.watchPosition(
      (position) => {
        var coords = {};
        coords.longitude = position.coords.longitude;
        coords.latitude = position.coords.latitude;
      }
    );
  }

  toggleView(view) {
    this.setState({ view });
  }

  render() {
    const { getLocationToSave, pins, deletePin, recent } = this.props;
    return (
      <View style={{flex: 1}}>
      { this.state.view === 'ar' ? <AR currLoc={ this.state.currLoc } pins={pins} /> : void 0 }
      { this.state.view === 'map' ? <Map
          getLocationToSave={getLocationToSave}
          currLoc={this.state.currLoc}
          initialLoc={this.state.initialLoc}
          pins = {pins}
          recent = {recent}
        /> : void 0 }
      { this.state.view === 'list' ? <PinList
          deletePin={deletePin}
          pins={pins}
          /> : void 0 }
      { this.state.view != 'list' ? <Button
          onPress={this.toggleView.bind(this, 'list')}
        >
          List
        </Button> : void 0 }
      { this.state.view != 'ar' ? <Button
          onPress={this.toggleView.bind(this, 'ar')}
        >
          AR
        </Button> : void 0 }
      { this.state.view != 'map' ? <Button
          onPress={this.toggleView.bind(this, 'map')}
        >
          Map
        </Button> : void 0 }
        <DropNewPinButton/>
      </View>
    );
  }
}
