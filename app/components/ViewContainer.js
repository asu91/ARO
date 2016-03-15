import React, { Component, PropTypes  } from 'react-native';
import Map from './Map.js';

export default class ViewContainer extends Component {
  constructor() {
    super();
    this.state = {
      view: 'map'
    };
  }
  render() {
    return (
      <Map/>
    );
  }
}
