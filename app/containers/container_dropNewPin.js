//this should add ownprops from parent map
import React, { Component } from 'react-native';
import getLocationToSave from '../actions/action_pins.js';

import Button from 'react-native-button';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { userData } from '../constants/constants';

class DropNewPinButton extends Component {
  constructor(props) {
    super(props);
    this.state= {
     long: null,
     lat: null,
     title: ''
    };
  }
  handleClick() {
    console.log(this.props, 'this is props in DropNewPinButton');
  const { getLocationToSave } = this.props;
  getLocationToSave();
  }

  render() {
    return (
      <Button
        style={{borderWidth: 1, borderColor: 'blue'}}
        onPress={this.handleClick.bind(this)}>
        Press Me!
      </Button>
    );
  }
}

function mapStateToProps(state) {
  return {
    pins: state.pins
  };
}

export default connect(mapStateToProps, { getLocationToSave })(DropNewPinButton);
