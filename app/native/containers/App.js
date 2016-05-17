import React from 'react';
import {
  Component,
  TabBarIOS,
  Navigator,
  Text,
  View,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import { globalStyles } from '../styles/globals';
import Icon from 'react-native-vector-icons/FontAwesome';
import ChatView from '../chat/ChatView';

var NavigationBarRouteMapper = isTyping => ({

  LeftButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }

    var previousRoute = navState.routeStack[index - 1];
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={globalStyles.navBarLeftButton}>
        <Icon name='arrow-left' color='#fff' size={20} />
      </TouchableOpacity>
    );
  },

  RightButton: function(route, navigator, index, navState) {
    return null;
  },

  Title: function(route, navigator, index, navState) {
    
    return (
      <View style={{paddingLeft: 40, paddingRight: 40, overflow: 'hidden'}}>
        <Text style={{fontSize: 18, color: '#fff', fontWeight: 'bold', textAlign: 'center'}}>{route.title}</Text>
        <Text style={{fontSize: 12, color: '#fff'}}>{isTyping}</Text>
      </View>
    );
  }

});

class App extends Component {

  render() {
    return (
      <TabBarIOS>
        <Icon.TabBarItem
          selected={true}
          iconName={'comment'}
          iconSize={20}>
          {this.renderChatView()}
        </Icon.TabBarItem>
        <Icon.TabBarItem
          selected={false}
          iconName={'comment'}
          iconSize={20}>
          {null}
        </Icon.TabBarItem>
        <Icon.TabBarItem
          selected={false}
          iconName={'comment'}
          iconSize={20}>
          {null}
        </Icon.TabBarItem>
      </TabBarIOS>
    );
  }
  
  renderChatView() {
    let isTyping = '';

    if (this.props.loading) {
      isTyping = '...is typing';
    }
    
    return (
      <View style={{flex: 1}}>
        <StatusBar
          backgroundColor="#b11220"
          barStyle="light-content"
        />
        <Navigator
          style={globalStyles.wrapper}
          renderScene={(route, navigator) => {
            return <route.component navigator={navigator} {...route.passProps} />
          }}
          navigationBar={
            <Navigator.NavigationBar
            routeMapper={NavigationBarRouteMapper(isTyping)}
            style={globalStyles.navBar}
            />
          }
          initialRoute={{
            title: 'ACE',
            component: ChatView
          }} />
      </View>
    );
  }
}

const stateToProps = (state) => {
  return {
    loading: state.chat.loading
  };
};

export default connect(stateToProps, null)(App);
