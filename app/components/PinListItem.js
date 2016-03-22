import React, {Component, Text, TouchableHighlight, View, StyleSheet, AlertIOS} from 'react-native';

export default class PinListItem extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { pin, deletePin } = this.props;
    return (
      <TouchableHighlight 
        onPress={() => {
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
