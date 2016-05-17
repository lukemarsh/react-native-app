import React, { Component } from 'react';
import {
  View,
  WebView
} from 'react-native';

class Product extends Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <WebView source={{uri: 'http://www.argos.co.uk/static/Product/partNumber/' + this.props.partNumber + '.htm'}}>
        </WebView>
      </View>
    );
  }
}

export default Product;
