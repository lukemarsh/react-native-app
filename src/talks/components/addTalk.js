import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Component
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTalk} from '../actions';

class AddTalk extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }
  
  addTalk() {
    this.props.addTalk({
      owner: this.state.text
    });
    this.props.navigator.push({
      id: 'talk',
      index: 2,
      title: this.state.text
    });
  }
  
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          autoFocus
          enablesReturnKeyAutomatically
          returnKeyType='done'
          clearButtonMode='while-editing'
          style={styles.textInput}
          onChangeText={(text) => this.setState({text})}
          onSubmitEditing={() => this.addTalk()}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    padding: 20
  },
  textInput: {
    height: 40,
    paddingLeft: 10,
    borderColor: '#ccc',
    borderWidth: 1
  }
});

const dispatchToProps = (dispatch) => {
  return bindActionCreators({
    addTalk
  }, dispatch);
};

export default connect(null, dispatchToProps)(AddTalk);
