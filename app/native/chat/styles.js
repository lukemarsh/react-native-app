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
    borderColor: '#bfd541'
  },
  liMe: {
    padding: 5,
    alignItems: 'flex-end'
  },
  liYou: {
    padding: 5,
    paddingRight: 60,
    paddingLeft: 90,
    alignItems: 'flex-start'
  },
  categoryText: {
    color: '#96be2d',
    fontSize: 16
  },
  border: {
    borderWidth: 1,
    borderColor: '#bfd541',
    alignItems: 'center',
    borderBottomWidth: 0
  },
  category: {
    padding: 15,
    borderBottomWidth: 1,
    alignSelf: 'stretch',
    borderColor: '#bfd541',
    alignItems: 'center'
  },
  liYouText: {
    backgroundColor: '#bfd541',
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 15,
    paddingRight: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 0
  },
  categoryListTitle: {
    backgroundColor: '#bfd541',
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 15,
    paddingRight: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  text: {
    color: '#fff',
    fontSize: 14
  },
  liMeText: {
    backgroundColor: '#3ec4ed',
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 15,
    paddingRight: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 15
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
