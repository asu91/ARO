import React, {Component, View, ListView} from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';
import FriendListItem from './FriendListItem';

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
      <View style={{ marginTop: 15 }}>
        <Button onPress={ () => { Actions.pop() }}>Back</Button>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderItem.bind(this)}
        />
      </View>
    );
  }
}
