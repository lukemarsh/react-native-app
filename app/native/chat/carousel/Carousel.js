import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableHighlight
} from 'react-native';
import { styles } from './styles';
import { globalStyles } from '../../styles/globals';
import { connect } from 'react-redux';
import Product from '../Product';

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.goToWebView = this.goToWebView.bind(this);
  }
  
  getPrice(item) {
    const priceArray = item['prd:PricingInformation']['prc:Price'];
    let priceText = '';
    const amount = priceArray['prc:Amount'];
    if (amount) {
      priceText = amount;
    } else {
      priceText = priceArray[0]['prc:Amount'];
    }
    return priceText['#text'];
  };
  
  goToWebView(description, partNumber) {
    this.props.navigator.push({
      title: description,
      component: Product,
      passProps: {
        partNumber: partNumber
      }
    });
  }
  
  renderArray(items) {
    return items.filter((item) => {
      console.log(this.props);
      
      // return this.getPrice(item) <= Number(this.props.price.replace(/[^0-9\.]+/g,''));
      
      return this.getPrice(item) <= Number(this.props.maxPrice.replace(/[^0-9\.]+/g,'')) && this.getPrice(item) >= Number(this.props.minPrice.replace(/[^0-9\.]+/g,''));
      
    }).map((item, index) => {
      const description = item['prd:DescriptionList']['prd:Description']['#text'];
      const price = this.getPrice(item);
      return (
        <View key={index} style={styles.carouselItem}>
          <View style={styles.product}>
            <View style={[styles.borderBottom, styles.centerAlign, styles.padding]}>
              <Image key={index} style={styles.images} source={{uri: item['prd:AssociatedMedia']['prd:Content']['@href'] + '&wid=600&hei=600'}} />
            </View>
            <View style={[styles.borderBottom]}>
              <View style={styles.padding}>
                <Text>{description}</Text>
              </View>
              <View style={styles.padding}>
                <Text style={globalStyles.bold}>£{price}</Text>
              </View>
            </View>
              <TouchableHighlight style={[styles.borderBottom, styles.centerAlign, styles.padding]} underlayColor='#fff' activeOpacity={0.4} onPress={() => this.goToWebView(description, item['@id'])}>
                <Text style={[globalStyles.bold, globalStyles.darkGreen]}>Buy This</Text>
              </TouchableHighlight>
            <View style={[styles.centerAlign, styles.padding]}>
              <Text style={globalStyles.darkGreen}>See More Like This</Text>
            </View>
           </View>
        </View>
       );
    });
  }
  
  render() {
    return (
      <ScrollView contentContainerStyle={styles.carousel} style={styles.carouselInner} horizontal={true} snapToAlignment="start" automaticallyAdjustContentInsets={false}>
        {this.renderArray(this.props.items)}
      </ScrollView>
    );
  }
}

export default Carousel;
