import React from 'react';
import {
  Component,
  TabBarIOS,
  NavigatorIOS
} from 'react-native';
import { globalStyles } from '../styles/globals';
import Icon from 'react-native-vector-icons/FontAwesome';
import ChatView from '../chat/ChatView';

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
      </TabBarIOS>
    );
  }
  
  renderChatView() {
    return (
      <NavigatorIOS
        ref="navigator"
        style={globalStyles.wrapper}
        initialRoute={{
          title: 'Assistant',
          component: ChatView
        }} />
    );
  }
}

module.exports = App;
