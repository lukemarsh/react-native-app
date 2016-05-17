import React, { Component } from 'react';
import {
  View,
  Text,
  DeviceEventEmitter,
  ListView,
  Image,
  RecyclerViewBackedScrollView,
  Dimensions,
  TextInput
} from 'react-native';
import { styles } from './styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchMessage, startSequence, showProductCarousel } from '../../chat/actions';
import Carousel from './carousel/Carousel';

class ChatView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      text: '',
      visibleHeight: 0
    };
  }
  
  componentWillMount() {
    DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
    DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
  }

  keyboardWillShow(e) {
    let newSize = Dimensions.get('window').height - e.endCoordinates.height;
    this.setState({visibleHeight: newSize});
  }

  keyboardWillHide() {
    this.setState({visibleHeight: Dimensions.get('window').height});
  }

  componentDidMount() {
    this.props.startSequence();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.messages)
    });
  }

  selectCategory(text) {
    this.props.showProductCarousel({text: 'select as ' + text, show: false});
  }

  renderArray(data) {
    return data.map((item, index) => {
      const categoryName = item['prd:DescriptionList']['prd:Description']['#text'];
      return (
        <View style={styles.category} key={index}><Text style={styles.categoryText} onPress={() => this.selectCategory(categoryName)}>{categoryName}</Text></View>
      );
    });
  }

  renderItem(item) {
    const array = item.list || [];

    return (
      <View>
        { item.searchType === 'search' ?
          <Carousel items={array} />
        :
          <View style={[item.type === 'mine' ? styles.liMe : styles.liYou]}>
            { item.text ?
              <View style={item.type === 'mine' ? styles.liMeText : styles.liYouText}><Text style={styles.text}>{item.text}</Text></View>
            :
              <View>
                <View style={styles.categoryListTitle}><Text style={styles.text}>Nice. So what kind of gift are you after?</Text></View>
                <View style={styles.border}>
                  {this.renderArray(array)}
                </View>
              </View>
            }
          </View>
        }
      </View>
    );
  }

  sendMessage() {
    this.props.fetchMessage({
      text: this.state.text
    });
    this.refs.input.clear();
  }

  render() {
    console.log(this.state.visibleHeight);
    
    return (
      <View style={{justifyContent: 'flex-end', height: this.state.visibleHeight - 90}}>
          <ListView
            ref="list"
            automaticallyAdjustContentInsets={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flex: 1}}
            dataSource={this.state.dataSource}
            renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
            enableEmptySections
            renderRow={this.renderItem.bind(this)} />
        <View style={{bottom: 0, flex: 0, padding: 8, backgroundColor: '#f7f7f7'}}>
          <TextInput style={styles.input}
            autoFocus
            ref="input"
            autoCorrect={false}
            enablesReturnKeyAutomatically
            returnKeyType='done'
            onChangeText={(text) => this.setState({text})}
            onSubmitEditing={() => this.sendMessage()} />
        </View>
        <Image style={{position: 'absolute', bottom: 66, left: 16}} height={48} width={48} source={require('./../../images/ACE.png')} />
      </View>
    );
  }
}

const stateToProps = (state) => {
  return {
    messages: state.chat.messages
  };
};

const dispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchMessage,
    startSequence,
    showProductCarousel
  }, dispatch);
};

export default connect(stateToProps, dispatchToProps)(ChatView);
