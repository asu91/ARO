import React, { Component, PropTypes, StyleSheet, Text, View  } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getLocationToSave from '../actions/action_dropNewPin.js';
import updatePins from '../actions/action_updatePins.js';
import deletePin from '../actions/action_deletePin.js';
import updateRecent from '../actions/action_updateRecent.js';
import ViewContainer from '../components/ViewContainer.js';


function mapStateToProps(state) {
  return {
    pins: state.pins,
    recent: state.recent,
    friends: state.friends,
    user: state.user,
  };
}

export default connect(mapStateToProps, { getLocationToSave, updatePins, deletePin, updateRecent })(ViewContainer);
