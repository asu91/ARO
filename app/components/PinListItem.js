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
        <View style={style.listItem}>
          <Text style={style.text}>
            {this.props.pin}
          </Text>
        </View>
      </TouchableHighlight>
    );``
  }
}

const style = StyleSheet.create({
  listItem: {
    backgroundColor: 'white',
  },
  text: {
    justifyContent: 'center'
  }
});
