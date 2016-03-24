import React, { Component, AlertIOS , View} from 'react-native';
import Button from 'react-native-button';

export default class PinEditButton extends Component{

  constructor(props) {
    super(props);
  }

  editTitle(value) {
    const { pin, updatePins, updateRecent } = this.props;
    
    updatePins(pin, value);
    updateRecent();
  }

  render() {
    const { pin, deletePin, hideButton } = this.props;
    return(
      <Button
        onPress={ () => AlertIOS.prompt(
            pin.title,
            'Editting Pin',
            [{
              text: 'Cancel',
              style: 'cancel'
            },
            {
              text: 'Edit Title',
              onPress: this.editTitle.bind(this)
            },
            {
              text: 'Delete',
              onPress: () => {
                deletePin(pin);
                hideButton();
              }
            }],
            'plain-text'
          )}>
        Edit</Button>
    )
  }


}