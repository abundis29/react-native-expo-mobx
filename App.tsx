import React from 'react';
import { Platform, StatusBar, StyleSheet, View, YellowBox } from 'react-native';
import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import * as Icon from '@expo/vector-icons';
import Sentry from 'sentry-expo';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';

import { Provider as MobXProvider, observer } from 'mobx-react';
import { InAppNotificationProvider } from 'react-native-in-app-notification';
import { Colors } from './themes';

// import store from './store';
import Store from './mobx/observableStore';

import NavigationService from './services/NavigationService';
import AppNavigator from './navigation/AppNavigator';
import NetworkInterceptor from './screens/NetworkInterceptor';

if (!__DEV__) {
  // TODO replace key, and project with variables from ENV file
  Sentry.config('https://<key>@sentry.io/<project>').install();
}

YellowBox.ignoreWarnings(['react-native-i18n module is not correctly linked']);

@observer
export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  static propTypes = {
    skipLoadingScreen: PropTypes.bool
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <ThemeProvider theme={Colors}>
          <MobXProvider store={Store}>
            <InAppNotificationProvider height={150}>
              {/* <NetworkInterceptor> */}
              <View style={styles.container}>
                {Platform.OS === 'ios' && <StatusBar barStyle="default" />}

                {/* <StatusBar
                  barStyle="light-content"
                  backgroundColor="transparent"
                  translucent
                /> */}
                {Platform.OS === 'android' && Platform.Version >= 20 ? <StatusBarAndroid /> : null}
                {/* <Navigator /> */}
              </View>
              {/* </NetworkInterceptor> */}
            </InAppNotificationProvider>
          </MobXProvider>
        </ThemeProvider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png')
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        'montserrat-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
        'montserrat-italic': require('./assets/fonts/Montserrat-Italic.ttf'),
        'montserrat-regular': require('./assets/fonts/Montserrat-Regular.ttf')
      })
    ]);
  };

  _handleLoadingError = error => {
    Sentry.captureException(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  }
});
