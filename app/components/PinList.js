import React, {Component, View, ListView, Text} from 'react-native';
import PinListItem from './PinListItem.js';


export default class PinList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    };
  }

  componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(['one', 'two'])
    });
  }

  item(pin) {
    return (
        <PinListItem pin={pin}  />
      );
  }

  render() {
    return (

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.item.bind(this)}
        />

      );
  }
}
