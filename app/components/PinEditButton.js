import React, { Component, AlertIOS , View, StyleSheet} from 'react-native';
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
        style={[styles.bubble, styles.button]}

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

const styles = StyleSheet.create({
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },

  button: {
    width: 100,
    alignItems: 'center',
  },
})
