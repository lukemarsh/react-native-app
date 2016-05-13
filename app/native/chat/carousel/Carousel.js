import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView
} from 'react-native';
import { styles } from './styles';
import { globalStyles } from '../../styles/globals';
import { connect } from 'react-redux';

class Carousel extends Component {
  
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
  
  renderArray(items) {
    return items.map((item, index) => {
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
            <View style={[styles.borderBottom, styles.centerAlign, styles.padding]}>
              <Text style={[globalStyles.bold, globalStyles.darkGreen]}>Buy This</Text>
            </View>
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

export default connect(null, null)(Carousel);
