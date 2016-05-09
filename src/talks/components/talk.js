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
  constructor(props) {
    super(props);
    this.state = {
      talk: {}
    };
  }
  
  componentDidMount() {
    if (this.props.id) {
      this.props.getTalkByKey(this.props.id);
    }
  }
  
  getTalk() {
    return this.props.talk ? this.props.talk : this.state.talk;
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      talk: nextProps.talk
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.getTalk().owner}</Text>
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
    talk: state.talks.talk
  };
};

const dispatchToProps = (dispatch) => {
  return bindActionCreators({
    getTalkByKey
  }, dispatch);
};

export default connect(stateToProps, dispatchToProps)(Talk);
