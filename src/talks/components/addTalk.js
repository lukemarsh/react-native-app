import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Component
} from 'react-native';

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
    this.props.navigator.pop();
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

AddTalk.propTypes = {
  addTalk: React.PropTypes.func.isRequired
};

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

module.exports = AddTalk;
