import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class App extends Component {

  render() {
    return (
      <div>
        <header>
          <Link to="/add-talk">Add Talk</Link>
        </header>
        {this.props.children}
      </div>
    );
  }
}

export default connect(null, null)(App);
