import React, {Component, Text, TouchableHighlight, View, StyleSheet} from 'react-native';


export default class PinListItem extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { pin } = this.props
    return (
      <TouchableHighlight 
        onPress={() => alert('why you touch')}
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
