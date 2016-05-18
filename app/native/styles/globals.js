import {
  StyleSheet
} from 'react-native';

export const globalStyles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 62
  },
  darkGreen: {
    color: '#00aa50'
  },
  bold: {
    fontWeight: 'bold'
  },
  navBar: {
    backgroundColor: '#f7192e',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 0
    }
  },
  navBarLeftButton: {
    paddingLeft: 10
  }
});
