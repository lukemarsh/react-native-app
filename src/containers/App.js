import React from 'react';
import {
  View,
  Text,
  Navigator,
  StyleSheet,
  TouchableOpacity,
  Component
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { initTalks, addTalk } from '../talks/actions';
import Talks from '../talks/components/index';
import AddTalk from '../talks/components/addTalk';

const NavigationBarRouteMapper = {
  LeftButton(route, navigator, index) {
    if (index === 0) {
      return null;
    }

    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}
        style={styles.navBarLeftButton}>
        <Text style={[styles.navBarText, styles.navBarButtonText]}>
          Back
        </Text>
      </TouchableOpacity>
    );
  },

  RightButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity
        onPress={() => navigator.push({
          id: 'addTalk',
          index: 1,
          title: 'Add Talk'
        })}
        style={styles.navBarLeftButton}>
        <Text style={[styles.navBarText, styles.navBarRightButton]}>Add Talk</Text>
      </TouchableOpacity>
    );
  },

  Title(route) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.title}
      </Text>
    );
  }
};

class App extends Component {
  
  renderScene(route, navigator) {
    switch (route.id) {
      case 'talks':
        return (
          <View style={styles.scene}>
            <Talks
            initTalks={this.props.initTalks}
            talks={this.props.talks.talks}
            isLoading={this.props.talks.loading}
            />
          </View>
        );
      case 'addTalk':
        return (
          <View style={styles.scene}>
            <AddTalk
            addTalk={this.props.addTalk}
            navigator={navigator}
            />
          </View>
        );
    }
  }
  
  configureScene() {
    return Navigator.SceneConfigs.HorizontalSwipeJump;
  }

  render() {
    return (
      <View style={styles.container}>
        <Navigator
        ref="navigator"
        configureScene={this.configureScene.bind(this)}
        initialRoute={{
          id: 'talks',
          index: 0,
          title: 'Talks'
        }}
        renderScene={this.renderScene.bind(this)}
        navigationBar={
          <Navigator.NavigationBar
          style={styles.navBar}
          routeMapper={NavigationBarRouteMapper} />
        } />
      </View>
    );
  }
}

const stateToProps = (state) => {
  return {
    talks: state.talks
  };
};

const dispatchToProps = (dispatch) => {
  return bindActionCreators({
    initTalks,
    addTalk
  }, dispatch);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F1'
  },
  navBar: {
    backgroundColor: '#fafafa',
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee'
  },
  navBarText: {
    fontSize: 16,
    marginVertical: 10
  },
  navBarTitleText: {
    fontWeight: '500',
    marginVertical: 9
  },
  navBarLeftButton: {
    paddingLeft: 10
  },
  navBarRightButton: {
    paddingRight: 10
  },
  scene: {
    flex: 1,
    paddingTop: 63
  }
});

export default connect(stateToProps, dispatchToProps)(App)
