import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicatorIOS,
  ListView,
  TextInput,
  ScrollView,
  Dimensions
} from 'react-native';
import { styles } from './styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchMessage, startSequence, showProductCarousel } from '../../chat/actions';
import Carousel from './carousel/Carousel';
import Icon from 'react-native-vector-icons/FontAwesome';

class Talks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      text: ''
    };
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
    this.props.showProductCarousel({text: text, show: false});
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
        { item.carousel ?
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
  
  test(newSize) {
    if (this.props.messages.length && this.refs.list.getMetrics().contentLength > newSize) {
      this.refs.scroll.scrollTo({y: this.refs.list.getMetrics().contentLength - 1});
    }
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'stretch', paddingBottom: 48}}>
        <View style={{flex: 11, justifyContent: 'center', alignItems: 'stretch'}}>
          <ScrollView keyboardDismissMode='interactive' ref="scroll" onContentSizeChange={(newSize) => this.test(newSize)}>
          {!this.props.messages.length ?
            <ActivityIndicatorIOS
              color="#111"
              size="large"/>
          : <ListView
            ref="list"
            dataSource={this.state.dataSource}
            enableEmptySections
            renderRow={this.renderItem.bind(this)} /> }
          </ScrollView>
        </View>
        <View style={{flex: 1, justifyContent: 'space-around', alignItems: 'stretch', backgroundColor: '#f7f7f7', flexDirection: 'row'}}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <TextInput style={styles.input}
              autoFocus
              ref="input"
              autoCorrect={false}
              enablesReturnKeyAutomatically
              returnKeyType='done'
              onChangeText={(text) => this.setState({text})}
              onSubmitEditing={() => this.sendMessage()} />
          </View>
          <View style={{justifyContent: 'flex-end', paddingRight: 10, alignSelf: 'center'}}>
            <Icon name="microphone" size={25}></Icon>
          </View>
        </View>
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

export default connect(stateToProps, dispatchToProps)(Talks);
