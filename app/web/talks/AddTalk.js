import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTalk } from '../../talks/actions';

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
    // this.props.navigator.push({
    //   id: 'talk',
    //   index: 2,
    //   title: this.state.text
    // });
  }
  
  render() {
    return (
      <div>
        <input type="text" />
      </div>
    );
  }
}

const dispatchToProps = (dispatch) => {
  return bindActionCreators({
    addTalk
  }, dispatch);
};

export default connect(null, dispatchToProps)(AddTalk);
