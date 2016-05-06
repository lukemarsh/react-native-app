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

class Talk extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>test</Text>
      </View>
    );
  }
}

Talk.propTypes = {
  getTalkByKey: React.PropTypes.func.isRequired
};

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

module.exports = Talk;
