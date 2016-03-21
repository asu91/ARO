import React, {Component, View, ListView, Animated} from 'react-native';
import PinListItem from './PinListItem.js';


export default class PinList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      // create the data source
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    };
  }

  componentDidMount() {
    // populate the data source
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(['one', 'two', 'three', 'four'])
    });
  }

  item(pin) {
    return (
        // pass down info to PinListItem
        <PinListItem pin={pin}  />
      );
  }

  render() {
    return (
      <Animated.View
        
      >
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.item.bind(this)}
        />
      </Animated.View>

      );
  }
}
