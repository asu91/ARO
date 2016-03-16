
//this should be a child of ViewContainer
import React, { Component, PropTypes} from 'react-native';
import Button from 'react-native-button'

export default class DropNewPinButton extends Component {
  constructor(props) {
    super(props);
    this.state= {
     long: null,
     lat: null,
     title: ''
    };
  }

  handleClick(event) {
    console.log('Pressed!');
  }
  render() {
    return (
      <Button
        style={{borderWidth: 1, borderColor: 'blue'}}
        onPress={this.handleClick}>
        Press Me!
      </Button>
    );
  }
}
