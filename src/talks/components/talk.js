import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Component
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTalkByKey } from '../actions';

class Talk extends Component {
  
  componentDidMount() {
    this.props.getTalkByKey(this.props.id);
  }
  
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.talk}</Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

const stateToProps = (state) => {
  return {
    talk: state.talk
  };
};

const dispatchToProps = (dispatch) => {
  return bindActionCreators({
    getTalkByKey
  }, dispatch);
};

export default connect(stateToProps, dispatchToProps)(Talk);
