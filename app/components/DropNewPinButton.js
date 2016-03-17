
//this should be a child of ViewContainer

import React, { Component, PropTypes, Text} from 'react-native';
import Button from 'react-native-button';

export default class DropNewPinButton extends Component {
  constructor(props) {
    super(props);
    this.state= {
     long: null,
     lat: null,
     title: ''
    };
  }


  handleClick() {
   alert(JSON.stringify(this.props));
   // this.props.dropNewPin()
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

DropNewPinButton.PropTypes = {

}