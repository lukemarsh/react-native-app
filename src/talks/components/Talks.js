import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicatorIOS,
  TouchableHighlight,
  Component,
  ListView
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTalks} from '../actions';

class Talks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      })
    };
  }
  
  componentDidMount() {
    this.props.getTalks();
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.talks.talks)
    });
  }
  
  goToTalk(item) {
    this.props.navigator.push({
      id: 'talk',
      index: 2,
      title: item.title,
      key: item._key
    });
  }
  
  renderItem(item) {
    return (
      <TouchableHighlight onPress={() => this.goToTalk(item)}>
        <View style={styles.li} >
          <Text style={styles.liText}>{item.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.talks.loading ?
          <ActivityIndicatorIOS
            color="#111"
            size="large"/>
        : <ListView
          dataSource={this.state.dataSource}
          style={styles.listview}
          enableEmptySections
          renderRow={this.renderItem.bind(this)} /> }
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  listview: {
    flex: 1
  },
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16
  },
  liText: {
    color: '#333',
    fontSize: 16
  }
});

const stateToProps = (state) => {
  return {
    talks: state.talks
  };
};

const dispatchToProps = (dispatch) => {
  return bindActionCreators({
    getTalks
  }, dispatch);
};

export default connect(stateToProps, dispatchToProps)(Talks);
