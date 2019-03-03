/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './redux/ReduxStore';
import { Root, StyleProvider } from 'native-base';

import navigationService from './services/NavigationService';
import getTheme from './theme/components';
import theme from './theme/variables/customColor';

export default class App extends Component {
    render() {
        return (
            <StyleProvider style={getTheme(theme)}>
                <Root>
                    <Provider store={store}>
                        {navigationService.getTopNavigator()}
                    </Provider>
                </Root>
            </StyleProvider>
        );
    }
}