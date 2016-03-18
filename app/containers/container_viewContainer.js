import React, { Component, PropTypes, StyleSheet, Text, View  } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getLocationToSave from '../actions/action_pins.js';

import ViewContainer from '../components/ViewContainer.js';


function mapStateToProps(state) {
  return {
    pins: state.pins,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({getLocationToSave: getLocationToSave}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewContainer);
