import React, {Component, Text, TouchableHighlight, View, StyleSheet, AlertIOS} from 'react-native';

export default class PinListItem extends Component {

  constructor(props) {
    super(props);
  }

  touchOptions() {
    const { pin, deletePin } = this.props;
    AlertIOS.alert(
        'Delete Pin?',
        null,
        [{
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            deletePin(pin)
          }
        }]
      )
  }

  render() {
    const { pin } = this.props;
    return (
      <TouchableHighlight 
        onPress={() => {
          this.touchOptions()
        }}
      >
        <View style={style.container}>
          <Text style={style.text}>
            {pin.title}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 4,
    margin: 4,
    padding: 6
  },
  text: {
    alignSelf: 'center',
    fontSize: 24,
  }
});
