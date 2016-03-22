import React, {Component, View, ListView} from 'react-native';
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
      dataSource: this.state.dataSource.cloneWithRows(pins)
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.pins)
    });
  }

  item(pin) {
    const {getPins} = this.props;
    return (
        // pass down info to PinListItem
        <PinListItem
          pin={pin}
          getPins={getPins}
        />
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
