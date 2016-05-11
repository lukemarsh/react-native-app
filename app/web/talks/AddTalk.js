import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTalk } from '../../talks/actions';
import { browserHistory } from 'react-router';

class AddTalk extends Component {
  constructor(props) {
    super(props);
    this.addTalk = this.addTalk.bind(this);
  }
  
  addTalk(event) {
    event.preventDefault();
    var input = React.findDOMNode(this.refs.text);
    
    this.props.addTalk({
      owner: input.value
    });
    
    browserHistory.push('/talk/' + this.props.newTalkId);
  }
  
  render() {
    return (
      <div>
        <form onSubmit={this.addTalk}>
          <input type="text" ref="text" autoFocus />
        </form>
      </div>
    );
  }
}

const stateToProps = (state) => {
  return {
    newTalkId: state.talks.talk.id
  };
};

const dispatchToProps = (dispatch) => {
  return bindActionCreators({
    addTalk
  }, dispatch);
};

export default connect(stateToProps, dispatchToProps)(AddTalk);
