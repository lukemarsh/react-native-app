import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getTalkByKey } from '../../talks/actions';

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
      <div>
        {this.getTalk().owner}
      </div>
    );
  }
}

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
