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

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.pins)
    });
  }

  renderItem(pin) {
    const { updatePins, updateRecent, deletePin } = this.props;
    return (
        // pass down pin info to PinListItem
        <PinListItem
          updatePins={updatePins}
          updateRecent={updateRecent}
          deletePin={deletePin}
          pin={pin}
        />
      );
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderItem.bind(this)}
      />
    );
  }
}
