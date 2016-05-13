import {
  StyleSheet,
  Dimensions
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  carousel: {
    paddingLeft: 90
  },
  images: {
    width: 150,
    height: 150
  },
  carouselItem: {
    paddingRight: 15,
    width: 250
  },
  product: {
    borderWidth: 1,
    borderColor: '#bfd541',
    borderRadius: 20
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderColor: '#bfd541'
  },
  centerAlign: {
    alignItems: 'center'
  },
  padding: {
    padding: 15
  }
});
