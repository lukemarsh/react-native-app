import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTalks} from '../../talks/actions';

class Talks extends Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    this.props.getTalks();
  }

  render() {
    const talks = this.props.talks.talks.map((talk, index) => {
      return (
        <div key={index}>{talk.title}</div>
      );
    });
    
    return (
      <div>
        {this.props.talks.loading ?
          <div>loading...</div>
        : <div>{talks}</div> }
      </div>
    );
  }
}

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
