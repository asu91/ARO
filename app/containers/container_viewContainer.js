import React, { Component, PropTypes, StyleSheet, Text, View  } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getLocationToSave from '../actions/action_dropNewPin.js';
import getPins from '../actions/action_updatePins.js';
import updateRecent from '../actions/action_updateRecent.js';
import ViewContainer from '../components/ViewContainer.js';


function mapStateToProps(state) {
  return {
    pins: state.pins,
    recent: state.recent
  };
}

export default connect(mapStateToProps, { getLocationToSave, getPins, updateRecent })(ViewContainer);
