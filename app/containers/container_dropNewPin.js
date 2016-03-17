//this should add ownprops from parent map
import React, { Component } from 'react-native';
import getLocationToSave from '../actions/action_pins.js';
import Button from 'react-native-button';

// import DropNewPinButton from '../components/DropNewPinButton.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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

   // this.props.dropNewPin()
   this.props.actions.getLocationToSave();
  }
  render() {
    // alert(JSON.stringify(this.props))
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
function mapDispatchToProps(dispatch) {
    // return bindActionCreators( (a,b)=>{} , dispatch);
  let something = {
    actions: bindActionCreators({getLocationToSave: getLocationToSave}, dispatch)
  }
  console.log(something) 
  return something;
}
// alert(store.getState())

export default connect(mapStateToProps, mapDispatchToProps)(DropNewPinButton);


