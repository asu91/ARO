import React, {Component, Image, Text, TouchableHighlight, View, StyleSheet} from 'react-native';

export default class FriendListItem extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { friend } = this.props;
    const pic = friend.picture;
    return (
      <TouchableHighlight 
        onPress={() => {
          this.props.onPress( friend );
          // TODO: And then make the friend list go away.
        }}
      >
        <View style={style.container}>
          <Image
            style={styles.icon}
            source={require(pic)}
          />
          <Text style={style.text}>
            {friend.name}
          </Text>
          <Text style={style.text}>
            {friend.email}
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
    padding: 6,
  },
  text: {
    alignSelf: 'center',
    fontSize: 24,
  },
  icon: {
    alignSelf: 'flex-start',
    margin: 4,
    borderWidth: 1,
    borderColor: '#000000',
  }
});
