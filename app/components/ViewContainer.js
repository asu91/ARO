import React, { Component, PropTypes, View } from 'react-native';
import AR from './AR.js';
import Map from './Map.js';
import DropNewPinButton from './DropNewPinButton.js'

export default class ViewContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'map'
    };
  }
  getLocation() {

  }
  render() {
    return (
      <View>
        <AR/>
        <Map/>
        <DropNewPinButton />
      </View>
    );
  }
}
