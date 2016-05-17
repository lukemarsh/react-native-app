import {
  StyleSheet,
  Dimensions
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  allStylesRadius: {
    borderRadius: 15
  },
  allStylesBorder: {
    borderWidth: 1,
    borderColor: '#00aa50'
  },
  liMe: {
    padding: 6,
    paddingRight: 16,
    alignItems: 'flex-end'
  },
  liYou: {
    padding: 6,
    paddingRight: 50,
    paddingLeft: 80,
    alignItems: 'flex-start'
  },
  categoryText: {
    color: '#00aa50',
    fontSize: 18
  },
  categoryTextClicked: {
    color: 'white',
    fontSize: 18
  },
  border: {
    borderWidth: 1,
    borderColor: '#00aa50',
    alignItems: 'center',
    borderBottomWidth: 0
  },
  category: {
    padding: 15,
    borderBottomWidth: 1,
    alignSelf: 'stretch',
    borderColor: '#00aa50',
    alignItems: 'center'
  },
  liYouText: {
    backgroundColor: '#00aa50',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 16,
    paddingRight: 16,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 0
  },
  categoryListTitle: {
    backgroundColor: '#00aa50',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 16,
    paddingRight: 16,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  text: {
    color: '#fff',
    fontSize: 15
  },
  liMeText: {
    backgroundColor: '#00ade7',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 16,
    paddingRight: 16,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 30
  },
  input: {
    height: 32,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 5,
    fontSize: 14,
    alignSelf: 'center',
    width: windowWidth - 40
  }
});
