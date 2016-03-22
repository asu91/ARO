import React, {Component, Text, TouchableHighlight, View, StyleSheet, AlertIOS} from 'react-native';
import { userData } from '../lib/db/db.js'

export default class PinListItem extends Component {

  constructor(props) {
    super(props);
    this.firebaseRef = userData;
  }

  render() {
    const { pin, getPins } = this.props;
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
                  console.log(pin._key)
                  // this.firebaseRef.child(pin.id).remove()
                  getPins()
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
    backgroundColor: 'silver',
    borderRadius: 4,
    margin: 4,
    padding: 10
  },
  text: {
    alignSelf: 'center',
    fontSize: 24,
  }
});
