
//this should be a child of ViewContainer
import React, { Component, PropTypes} from 'react-native';
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



  handleClick(event) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        alert(position.coords.latitude)
        // this.setState({
        //   long: position.coords.longitude,
        //   lat: position.coords.latitude
        // });
      },
      (error) => {
        alert(error.message)
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
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
