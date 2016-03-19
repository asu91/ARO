import React, {Component, Text, TouchableHighlight, View, StyleSheet} from 'react-native';


export default class PinListItem extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableHighlight 
        onPress={() => alert('why you touch')}
        underlayColor={'silver'}
      >
        <View style={style.container}>
          <Text style={style.text}>
            {this.props.pin}
          </Text>
        </View>
      </TouchableHighlight>
    );``
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    borderRadius: 4,
    margin: 5,
    padding: 10
  },
  text: {
    alignSelf: 'center',
    fontSize: 24,
  }
});
