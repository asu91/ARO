import React, {Component, View, ListView} from 'react-native';
import FriendListItem from './FriendListItem.js';

export default class FriendList extends Component {

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
      dataSource: this.state.dataSource.cloneWithRows(nextProps.friends)
    });
  }

  componentWillMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.props.friends)
    });
  }

  renderItem(friend) {
    const { onPress } = this.props;
    return (
      // pass down pin info to FriendListItem
      <FriendListItem
        onPress={onPress}
        friend={friend}
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
