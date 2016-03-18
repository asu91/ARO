import React, { Component, PropTypes, StyleSheet, Text, View  } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getLocationToSave from '../actions/action_pins.js';
import updatePins from '../actions/action_updatePins.js';
import ViewContainer from '../components/ViewContainer.js';


function mapStateToProps(state) {
  return {
    pins: state.pins,
  };
}

export default connect(mapStateToProps, { getLocationToSave, updatePins })(ViewContainer);
