// Note: this is not finished, only shows menu for now
//menu options not functional
import React, {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  Component,
  PropTypes
} from 'react-native';
const window = Dimensions.get('window');
const uri = 'http://pickaface.net/includes/themes/clean/img/slide2.png';

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: 'gray',
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
  },
});

export default class Menu extends Component {

  render() {
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={{ uri, }}/>
          <Text style={styles.name}>Hi, InterruptedLobster!</Text>
        </View>

        <Text
          onPress={() => this.props.onItemSelected('Map')}
          style={styles.item}>
          Map
        </Text>

        <Text
          onPress={() => this.props.onItemSelected('Settings')}
          style={styles.item}>
          Settings
        </Text>
      </ScrollView>
    );
  }
};

Menu.propTypes = {
    onItemSelected: PropTypes.func.isRequired,
  };
