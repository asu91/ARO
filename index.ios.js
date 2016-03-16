/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './app/reducers/rootReducer.js';
import Map from './app/components/Map.js';
var store = createStore(rootReducer);

const Firebase = require('firebase');

class findAR extends Component {
  render() {
    return (
      <Map/>
    );
  }
}




AppRegistry.registerComponent('findAR', () => findAR);

