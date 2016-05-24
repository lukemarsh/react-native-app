import React, { Component } from 'react';
import {
  View,
  Text,
  ListView,
  Image,
  Platform,
  Dimensions,
  TextInput,
  PixelRatio,
  TouchableHighlight,
  Animated
} from 'react-native';
import { styles } from './styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchMessage, startSequence, showProductCarousel } from '../../chat/actions';
import Carousel from './carousel/Carousel';
import deepEqual from 'deep-equal';
import Spinner from 'react-native-spinkit';

class ChatView extends Component {
  constructor(props) {
    super(props);
    
    this.onFooterLayout = this.onFooterLayout.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.onLayout = this.onLayout.bind(this);
    this.renderFooter = this.renderFooter.bind(this); // MIGHT NOT NEED THIS
    this.onChangeVisibleRows = this.onChangeVisibleRows.bind(this);
    this.onKeyboardWillShow = this.onKeyboardWillShow.bind(this);
    this.onKeyboardDidShow = this.onKeyboardDidShow.bind(this);
    this.onKeyboardWillHide = this.onKeyboardWillHide.bind(this);
    this.onKeyboardDidHide = this.onKeyboardDidHide.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSend = this.onSend.bind(this);
    this.onClickOption = this.onClickOption.bind(this);
    
    this._firstDisplay = true;
    this._listHeight = 0;
    this._footerY = 0;
    this._scrollToBottomOnNextRender = false;
    this._scrollToPreviousPosition = false;
    this._visibleRows = { s1: { } };
    
    let textInputHeight = 44;
    if (!this.props.hideTextInput) {
      if (this.props.styles.hasOwnProperty('textInputContainer')) {
        textInputHeight = this.props.styles.textInputContainer.height || textInputHeight;
      }
    }
    
    this.listViewMaxHeight = this.props.maxHeight - 112 - textInputHeight;
    
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => {
        if (r1.status !== r2.status) {
          return true;
        }
        return false;
      }
    });
    
    this.state = {
      dataSource: ds.cloneWithRows([]),
      text: props.text,
      height: new Animated.Value(this.listViewMaxHeight),
      appearAnim: new Animated.Value(0)
    };
    
  }
  
  componentWillMount() {
    this.styles = {
      container: {
        flex: 1
      },
      listView: {
        flex: 1
      },
      textInputContainer: {
        height: 44,
        borderTopWidth: 1 / PixelRatio.get(),
        borderColor: '#b2b2b2',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10
      },
      textInput: {
        alignSelf: 'center',
        height: 30,
        width: 100,
        backgroundColor: '#FFF',
        flex: 1,
        padding: 0,
        margin: 0,
        fontSize: 15
      }
    };
    
    Object.assign(this.styles, this.props.styles);
  }
  
  componentDidMount() {
    this.scrollResponder = this.refs.list.getScrollResponder();
    this.props.startSequence();
    
    if (this.props.messages.length > 0) {
      this.setMessages(this.props.messages);
    }
  }
  
  componentWillReceiveProps(nextProps) {
    
    
    if (nextProps.isTyping !== this.props.isTyping) {
      if (this.isLastMessageVisible()) {
        this._scrollToBottomOnNextRender = true;
      }
    }
    
    if (deepEqual(nextProps.messages, this.props.messages) === false) {
      let isAppended = null;
      if (nextProps.messages.length === this.props.messages.length) {
        // we assume that only a status has been changed
        if (this.isLastMessageVisible()) {
          isAppended = true; // will scroll to bottom
        } else {
          isAppended = null;
        }
      } else if (deepEqual(nextProps.messages[nextProps.messages.length - 1], this.props.messages[this.props.messages.length - 1]) === false) {
        // we assume the messages were appended
        isAppended = true;
      } else {
        // we assume the messages were prepended
        isAppended = false;
      }
      this.setMessages(nextProps.messages, isAppended);
    }
    
    let textInputHeight = 44;
    
    if (nextProps.hideKeyboard) {
      this.hideKeyboard();
    }
    
    
    if (nextProps.styles.hasOwnProperty('textInputContainer')) {
      textInputHeight = nextProps.styles.textInputContainer.height || textInputHeight;
    }
    
    if (nextProps.maxHeight !== this.props.maxHeight) {
      this.listViewMaxHeight = nextProps.maxHeight;
      Animated.timing(this.state.height, {
        toValue: this.listViewMaxHeight,
        duration: 150
      }).start();
    }

    if (nextProps.hideTextInput && !this.props.hideTextInput) {
      this.listViewMaxHeight += textInputHeight;

      this.setState({
        height: new Animated.Value(this.listViewMaxHeight)
      });
    } else if (!nextProps.hideTextInput && this.props.hideTextInput) {
      this.listViewMaxHeight -= textInputHeight;

      this.setState({
        height: new Animated.Value(this.listViewMaxHeight)
      });
    }
    
  }
  
  onClickOption(text) {
    console.log(text);
    
    this.props.fetchMessage({
      text: text
    });
  }
  
  onSend() {
    this.props.fetchMessage({
      text: this.state.text.trim()
    });
    this.onChangeText('');
  }
  
  onKeyboardWillHide() {
    Animated.timing(this.state.height, {
      toValue: this.listViewMaxHeight,
      duration: 0
    }).start();
  }

  onKeyboardDidHide(e) {
    if (Platform.OS === 'android') {
      this.onKeyboardWillHide(e);
    }

    // TODO test in android
    if (this.props.keyboardShouldPersistTaps === false) {
      if (this.isLastMessageVisible()) {
        this.scrollToBottom();
      }
    }
  }

  onKeyboardWillShow(e) {
    Animated.timing(this.state.height, {
      toValue: this.listViewMaxHeight - e.endCoordinates.height - (e.endCoordinates.height > 0 ? -50 : 0),
      duration: 0
    }).start();
  }

  onKeyboardDidShow(e) {
    if (Platform.OS === 'android') {
      this.onKeyboardWillShow(e);
    }

    this.scrollToBottom();
  }
  
  onLayout(event) {
    const layout = event.nativeEvent.layout;
    this._listHeight = layout.height;

    requestAnimationFrame(() => {
      this._firstDisplay = false;
      this.scrollToBottom(true);
    });
  }
  
  onFooterLayout(event) {
    const layout = event.nativeEvent.layout;
    const oldFooterY = this._footerY;
    this._footerY = layout.y;

    if (this._scrollToBottomOnNextRender === true) {
      this._scrollToBottomOnNextRender = false;
      this.scrollToBottom();
    }

    if (this._scrollToPreviousPosition === true) {
      this._scrollToPreviousPosition = false;
      this.scrollResponder.scrollTo({
        y: this._footerY - oldFooterY,
        x: 0,
        animated: false
      });
    }
  }
  
  onChangeVisibleRows(visibleRows) {
    this._visibleRows = visibleRows;
  }
  
  onChangeText(text) {
    this.setState({
      text
    });
  }
  
  getLastMessageid() {
    if (this.props.messages.length > 0) {
      return this.props.messages[this.props.messages.length - 1].id;
    }
    return null;
  }
  
  setMessages(messages, isAppended = null) {
    const rows = {};
    const identities = [];
    for (let i = 0; i < messages.length; i++) {
      if (typeof messages[i].id === 'undefined') {
        console.warn('messages[' + i + '].id is missing');
      }
      rows[messages[i].id] = Object.assign({}, messages[i]);
      identities.push(messages[i].id);
    }

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(rows, identities)
    });
    

    if (isAppended === true) {
      this._scrollToBottomOnNextRender = true;
    } else if (isAppended === false) {
      this._scrollToPreviousPosition = true;
    }
  }
  
  isLastMessageVisible() {
    return !!this._visibleRows.s1[this.getLastMessageid()];
  }
  
  scrollToBottom(animated = null) {
    if (this._listHeight && this._footerY && this._footerY > this._listHeight) {
      
      let scrollDistance = this._listHeight - this._footerY;
      if (this.props.isTyping) {
        scrollDistance -= 44;
      }

      this.scrollResponder.scrollTo({
        y: -scrollDistance,
        x: 0,
        animated: typeof animated === 'boolean' ? animated : this.props.scrollAnimated
      });
    }
  }

  selectCategory(text) {
    this.props.showProductCarousel({text: 'show me ' + text, show: false});
  }

  renderArray(data) {
    return data.map((item, index) => {
      if (index < 5) {
        const categoryName = item['prd:DescriptionList']['prd:Description']['#text'];
        return (
          <TouchableHighlight key={index} style={styles.category} underlayColor='#fff' activeOpacity={0.4} onPress={() => this.selectCategory(categoryName)}>
            <Text style={styles.categoryText}>{categoryName}</Text>
          </TouchableHighlight>
        );
      }
    });
  }
  
  renderisTyping() {
    if (this.props.isTyping) {
      return (
        <View style={[styles.liYou, { flexDirection: 'row' }]}>
          <Image style={{position: 'absolute', left: 6, bottom: 6, height: 20, width: 20}} height={20} width={20} source={require('./../../images/ACE.png')} />
          <View style={[styles.liYouText, { marginLeft: 25 }]}>
            <Spinner isVisible={true} size={18} type='ThreeBounce' color='#FFFFFF' />
          </View>
        </View>
      );
    }
    return null;
  }
  
  renderOptions(data) {
    
    let options = data.map((item, index) => {
      return (
        <View key={index} style={{padding: 6}}>
          <View style={[styles.liMeText]}>
            <Text style={styles.text} onPress={() => this.onClickOption(item)}>{item}</Text>
          </View>
        </View>
      );
    });
    return (
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {options}
      </View>
    );
  };
  
  renderFooter() {
    return (
      <View
        onLayout={this.onFooterLayout}
      >
        {this.renderisTyping()}
      </View>
    );
  }
  
  hideKeyboard() {
    this.refs.input.blur();
    // this.setState({
    //   height: new Animated.Value(this.listViewMaxHeight + 45)
    // });
  }

  renderRow(rowData = {}) {
    const array = rowData.list || [];

    return (
      <View>
        { rowData.type === 'theirs' ?
          <Image style={{position: 'absolute', left: 6, bottom: 6, height: 20, width: 20}} height={20} width={20} source={require('./../../images/ACE.png')} />
        : null }
        
        { rowData.searchType === 'search' ?
          <Carousel navigator={this.props.navigator} items={array} />
        :
          <View style={[rowData.type === 'mine' ? styles.liMe : styles.liYou, {marginLeft: 25}]}>
            { rowData.text ?
              <View style={rowData.type === 'mine' ? styles.liMeText : styles.liYouText}><Text style={styles.text}>{rowData.text}</Text></View>
            :
              <View>
                <View style={styles.categoryListTitle}><Text style={styles.text}>Nice. So what kind of gift are you after?</Text></View>
                <View style={styles.border}>
                  {this.renderArray(array)}
                </View>
                <TouchableHighlight style={styles.categoryListMore} underlayColor='#fff' activeOpacity={0.4}>
                  <Text style={styles.categoryListMoreText}>See more</Text>
                </TouchableHighlight>
              </View>
            }
          </View>
        }
      </View>
    );
  }

  render() {
    let options;
    
    if (this.props.options && this.props.options.length) {
      options = this.renderOptions(this.props.options);
    }
    
    return (
      <View style={this.styles.container}>
        <Animated.View
          style={{height: this.state.height, justifyContent: 'flex-end'}}>
          <ListView
            ref="list"
            style={this.styles.listView}
            initialListSize={this.props.messages.length}
            pageSize={this.props.messages.length}
            dataSource={this.state.dataSource}
            onLayout={this.onLayout}
            automaticallyAdjustContentInsets={true}
            onChangeVisibleRows={this.onChangeVisibleRows}
            enableEmptySections={true}
            renderFooter={this.renderFooter}
            // not supported in Android - to fix this issue in Android, onKeyboardWillShow is called inside onKeyboardDidShow
            onKeyboardWillShow={this.onKeyboardWillShow}
            onKeyboardDidShow={this.onKeyboardDidShow}
            
            // not supported in Android - to fix this issue in Android, onKeyboardWillHide is called inside onKeyboardDidHide
            onKeyboardWillHide={this.onKeyboardWillHide}
            onKeyboardDidHide={this.onKeyboardDidHide}
            // @issue keyboardShouldPersistTaps={false} + textInput focused = 2 taps are needed to trigger the ParsedText links
            keyboardShouldPersistTaps={this.props.keyboardShouldPersistTaps}
            keyboardDismissMode={this.props.keyboardDismissMode}
            renderRow={this.renderRow}
            {...this.props} />
            { options }
        </Animated.View>
        { this.props.hideTextInput === false && this.props.hideKeyboard !== true ?
          <View style={ this.styles.textInputContainer }>
            <TextInput
              ref='input'
              style={this.styles.textInput}
              placeholder={this.props.placeholder}
              placeHolderTextcolor={this.props.placeHolderTextcolor}
              onChangeText={this.onChangeText}
              value={this.state.text}
              autoFocus={this.props.autoFocus}
              returnKeyType={this.props.submitOnReturn && !this.props.isTyping ? 'send' : 'default'}
              onSubmitEditing={this.props.submitOnReturn && !this.props.isTyping ? this.onSend : () => {}}
              autoCorrect={this.props.autoCorrect}
              enablesReturnKeyAutomatically={true}
              blurOnSubmit={this.props.blurOnSubmit}
            />
          </View>
        : null }
      </View>
    );
  }
}

const stateToProps = (state) => {
  return {
    messages: state.chat.messages,
    options: state.chat.options,
    isTyping: state.chat.isTyping,
    hideKeyboard: state.chat.hideKeyboard
  };
};

const dispatchToProps = (dispatch) => {
  return bindActionCreators({
    fetchMessage,
    startSequence,
    showProductCarousel
  }, dispatch);
};

ChatView.defaultProps = {
  maxHeight: Dimensions.get('window').height,
  keyboardDismissMode: 'interactive',
  keyboardShouldPersistTaps: false,
  scrollAnimated: true,
  hideTextInput: false,
  styles: {},
  text: '',
  submitOnReturn: true,
  placeholder: 'Type a message...',
  placeHolderTextcolor: '#ccc',
  autoFocus: false,
  autoCorrect: true,
  blurOnSubmit: false
};

export default connect(stateToProps, dispatchToProps)(ChatView);
