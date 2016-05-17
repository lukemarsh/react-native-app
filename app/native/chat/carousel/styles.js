import {
  StyleSheet,
  Dimensions
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  carousel: {
    paddingLeft: 80
  },
  images: {
    width: 130,
    height: 130
  },
  carouselItem: {
    paddingRight: 16,
    width: 260
  },
  product: {
    borderWidth: 1,
    borderColor: '#00aa50',
    borderRadius: 30
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: '#00aa50'
  },
  centerAlign: {
    alignItems: 'center'
  },
  padding: {
    padding: 15
  }
});
