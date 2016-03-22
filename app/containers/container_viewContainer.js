import React, { Component, PropTypes, StyleSheet, Text, View  } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getLocationToSave from '../actions/action_dropNewPin.js';
import getPins from '../actions/action_updatePins.js';
import deletePin from '../actions/action_deletePin.js';
import ViewContainer from '../components/ViewContainer.js';


function mapStateToProps(state) {
  console.log('new state', state)
  return {
    pins: state.pins,
  };
}

export default connect(mapStateToProps, { getLocationToSave, getPins, deletePin })(ViewContainer);
