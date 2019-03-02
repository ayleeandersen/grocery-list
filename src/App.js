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

import navigationService from './services/NavigationService';


export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                {navigationService.getTopNavigator()}
            </Provider>
        );
    }
}