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
    const { pins } = this.props;
    // populate the data source

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(pins.pins)
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.pins.pins)
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
